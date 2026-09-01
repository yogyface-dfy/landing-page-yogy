/**
 * Checkout Session + upsell 1 clic. Les Payment Links restent en fallback
 * si STRIPE_SECRET_KEY n'est pas encore posée (Railway).
 */
import Stripe from 'stripe'
import { isValidEmail } from '../src/lib/stripe-checkout.js'
import { PLANS, UPSELL } from '../src/lib/stripe-offers.js'

const ALLOWED_CANCEL = new Set(['/vente-vip', '/vente'])

const cleanEnv = (value) => (value ?? '').trim().replace(/^["']|["']$/g, '')

function getStripe() {
  const key = cleanEnv(process.env.STRIPE_SECRET_KEY)
  if (!key) return null
  return new Stripe(key)
}

function resolveUpsell() {
  const cents = Number(cleanEnv(process.env.STRIPE_UPSELL_AMOUNT_CENTS))
  const name = cleanEnv(process.env.STRIPE_UPSELL_NAME)
  return {
    ...UPSELL,
    amountCents: cents > 0 ? cents : UPSELL.amountCents,
    name: name || UPSELL.name,
  }
}

const ALLOWED_ORIGINS = new Set([
  'http://localhost:5173',
  'http://localhost:3001',
  'https://yogyface.fr',
  'https://www.yogyface.fr',
])

export function publicOrigin(req) {
  // Origin = l'onglet (Vite 5173 en local). Host du proxy = 3001, à éviter.
  const fromBrowser = String(req.headers.origin || '').replace(/\/$/, '')
  if (ALLOWED_ORIGINS.has(fromBrowser)) return fromBrowser

  const proto = String(req.headers['x-forwarded-proto'] || req.protocol || 'https')
    .split(',')[0]
    .trim()
  const host = String(req.headers['x-forwarded-host'] || req.headers.host || '')
    .split(',')[0]
    .trim()
  const built = `${proto}://${host}`
  return ALLOWED_ORIGINS.has(built) ? built : 'https://yogyface.fr'
}

async function findCustomerId(stripe, email) {
  const list = await stripe.customers.list({ email, limit: 1 })
  return list.data[0]?.id || null
}

// DataFast : cookies de la requête, sinon body (mode cookieless).
function cookieValue(req, name) {
  const match = String(req.headers.cookie || '').match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : ''
}

function datafastMeta(req, fallback = {}) {
  const body = req.body || {}
  const vid = String(body.datafast_visitor_id || cookieValue(req, 'datafast_visitor_id') || fallback.datafast_visitor_id || '').slice(0, 80)
  const sid = String(body.datafast_session_id || cookieValue(req, 'datafast_session_id') || fallback.datafast_session_id || '').slice(0, 80)
  return {
    ...(vid ? { datafast_visitor_id: vid } : {}),
    ...(sid ? { datafast_session_id: sid } : {}),
  }
}

function customerIdOf(session) {
  if (!session.customer) return null
  return typeof session.customer === 'string' ? session.customer : session.customer.id
}

function phasePriceId(item) {
  if (!item?.price) return null
  return typeof item.price === 'string' ? item.price : item.price.id
}

/**
 * 3 × 99,99 € : transforme l'abo Checkout en schedule de 3 mois, puis stop.
 * Webi fait la même chose (gift/reset) — si le schedule existe déjà, on ne touche pas
 * (un cancel_at direct sur un abo schedulé fait planter /vente-upsell).
 */
async function ensureVip3xSchedule(stripe, subscriptionId) {
  const sub = await stripe.subscriptions.retrieve(subscriptionId)
  if (sub.metadata?.plan !== 'vip-3x' && sub.metadata?.max_invoices !== '3') return
  if (sub.status === 'canceled' || sub.schedule) return

  let schedule
  try {
    schedule = await stripe.subscriptionSchedules.create({ from_subscription: sub.id })
  } catch (err) {
    // Course avec le webhook webi : le schedule vient d'être posé.
    if (/already|schedule/i.test(err?.message || '')) return
    throw err
  }

  const phase = schedule.phases?.[0]
  const items = (phase?.items || [])
    .map((item) => ({ price: phasePriceId(item), quantity: item.quantity || 1 }))
    .filter((item) => item.price)
  if (!phase || !items.length) return

  const base = { items, start_date: phase.start_date }
  try {
    await stripe.subscriptionSchedules.update(schedule.id, {
      end_behavior: 'cancel',
      phases: [{ ...base, duration: { interval: 'month', interval_count: 3 } }],
    })
  } catch {
    // Comptes encore sur l'ancienne API (iterations).
    await stripe.subscriptionSchedules.update(schedule.id, {
      end_behavior: 'cancel',
      phases: [{ ...base, iterations: 3 }],
    })
  }
}

async function hasUpsell(stripe, session) {
  const customerId = customerIdOf(session)
  if (!customerId) return false
  const pis = await stripe.paymentIntents.list({ customer: customerId, limit: 20 })
  return pis.data.some(
    (pi) =>
      pi.metadata?.kind === 'upsell' &&
      pi.metadata?.parent_session === session.id &&
      ['succeeded', 'processing'].includes(pi.status)
  )
}

async function upsellCheckoutUrl(stripe, customerId, parentSessionId, origin, df = {}) {
  const offer = resolveUpsell()
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'fr',
    customer: customerId || undefined,
    success_url: `${origin}/merci-achat?session_id={CHECKOUT_SESSION_ID}&upsell=1`,
    cancel_url: `${origin}/vente-upsell?session_id=${parentSessionId}`,
    metadata: { kind: 'upsell', parent_session: parentSessionId, ...df },
    line_items: [
      {
        price_data: {
          currency: 'eur',
          unit_amount: offer.amountCents,
          product_data: { name: offer.name },
        },
        quantity: 1,
      },
    ],
  })
  return session.url
}

export async function createCheckoutSession(req, res) {
  try {
    const { plan, email, cancelPath } = req.body || {}
    const spec = PLANS[plan]
    if (!spec) return res.status(400).json({ error: 'Offre inconnue' })

    const stripe = getStripe()
    if (!stripe) {
      return res.status(503).json({ error: 'Paiement non configuré', fallbackUrl: spec.fallbackUrl })
    }

    const trimmed = isValidEmail(email) ? String(email).trim().slice(0, 200) : ''
    const origin = publicOrigin(req)
    const cancel = ALLOWED_CANCEL.has(cancelPath) ? cancelPath : '/vente-vip'
    const existing = trimmed ? await findCustomerId(stripe, trimmed) : null
    const df = datafastMeta(req)
    const vipMeta = { kind: 'vip', offer: spec.offer, plan, orig_email: trimmed, ...df }

    const params = {
      mode: spec.mode,
      locale: 'fr',
      success_url: `${origin}/vente-upsell?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${cancel}`,
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      // Pas de client_reference_id : webi le lit comme code marraine.
      metadata: vipMeta,
      line_items: [{ price_data: spec.priceData, quantity: 1 }],
    }

    if (existing) {
      params.customer = existing
    } else if (trimmed) {
      params.customer_email = trimmed
      if (spec.mode === 'payment') params.customer_creation = 'always'
    } else if (spec.mode === 'payment') {
      params.customer_creation = 'always'
    }

    if (spec.mode === 'payment') {
      params.payment_intent_data = {
        setup_future_usage: 'off_session',
        metadata: vipMeta,
      }
    } else {
      params.subscription_data = {
        metadata: { ...vipMeta, max_invoices: '3' },
      }
    }

    const session = await stripe.checkout.sessions.create(params)
    return res.json({ url: session.url })
  } catch (e) {
    console.error('createCheckoutSession:', e)
    return res.status(500).json({ error: 'Impossible de créer le paiement' })
  }
}

export async function getCheckoutSession(req, res) {
  try {
    const sessionId = String(req.query.session_id || '')
    if (!sessionId.startsWith('cs_')) return res.status(400).json({ error: 'Session invalide' })

    const stripe = getStripe()
    if (!stripe) return res.status(503).json({ error: 'Paiement non configuré' })

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    })

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return res.status(402).json({ error: 'Paiement non confirmé' })
    }

    const subId = typeof session.subscription === 'string'
      ? session.subscription
      : session.subscription?.id
    // Filet 3× : webi pose aussi le schedule ; un échec ici ne doit pas bloquer l'upsell.
    if (subId) {
      try {
        await ensureVip3xSchedule(stripe, subId)
      } catch (e) {
        console.error('ensureVip3xSchedule:', e)
      }
    }

    const offer = resolveUpsell()
    let alreadyTaken = false
    try {
      alreadyTaken = await hasUpsell(stripe, session)
    } catch (e) {
      console.error('hasUpsell:', e)
    }
    return res.json({
      paid: true,
      plan: session.metadata?.plan || '',
      email: session.customer_details?.email || session.customer_email || '',
      upsell: {
        name: offer.name,
        amountCents: offer.amountCents,
        headline: offer.headline,
        sub: offer.sub,
        bullets: offer.bullets,
        alreadyTaken,
      },
    })
  } catch (e) {
    console.error('getCheckoutSession:', e)
    return res.status(500).json({ error: 'Session introuvable' })
  }
}

export async function chargeUpsell(req, res) {
  try {
    const sessionId = String(req.body?.session_id || '')
    if (!sessionId.startsWith('cs_')) return res.status(400).json({ error: 'Session invalide' })

    const stripe = getStripe()
    if (!stripe) return res.status(503).json({ error: 'Paiement non configuré' })

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent.payment_method', 'subscription.default_payment_method', 'customer'],
    })

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      return res.status(402).json({ error: 'Paiement principal non confirmé' })
    }
    if (await hasUpsell(stripe, session)) {
      return res.json({ ok: true, already: true })
    }

    const customerId = customerIdOf(session)
    const pi = session.payment_intent
    const sub = session.subscription
    let pm = null
    if (pi && typeof pi !== 'string') {
      pm = typeof pi.payment_method === 'string' ? pi.payment_method : pi.payment_method?.id
    }
    if (!pm && sub && typeof sub !== 'string') {
      pm = typeof sub.default_payment_method === 'string'
        ? sub.default_payment_method
        : sub.default_payment_method?.id
    }

    const origin = publicOrigin(req)
    const offer = resolveUpsell()
    const df = datafastMeta(req, session.metadata || {})

    if (!customerId || !pm) {
      const url = await upsellCheckoutUrl(stripe, customerId, session.id, origin, df)
      return res.json({ url, requiresAction: true })
    }

    try {
      const intent = await stripe.paymentIntents.create(
        {
          amount: offer.amountCents,
          currency: 'eur',
          customer: customerId,
          payment_method: pm,
          off_session: true,
          confirm: true,
          description: offer.name,
          metadata: {
            kind: 'upsell',
            parent_session: session.id,
            orig_email: session.metadata?.orig_email || '',
            ...df,
          },
        },
        { idempotencyKey: `upsell-${session.id}` }
      )
      return res.json({ ok: true, id: intent.id })
    } catch (err) {
      if (err.code === 'authentication_required') {
        const url = await upsellCheckoutUrl(stripe, customerId, session.id, origin, df)
        return res.json({ url, requiresAction: true })
      }
      console.error('chargeUpsell:', err)
      return res.status(402).json({ error: 'Paiement refusé. Tu peux passer cette offre.' })
    }
  } catch (e) {
    console.error('chargeUpsell:', e)
    return res.status(500).json({ error: 'Upsell impossible' })
  }
}

export async function handleStripeWebhook(req, res) {
  const stripe = getStripe()
  const secret = cleanEnv(process.env.STRIPE_WEBHOOK_SECRET)
  if (!stripe || !secret) return res.status(400).send('webhook non configuré')

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], secret)
  } catch {
    return res.status(400).send('signature invalide')
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      if (session.mode === 'subscription' && session.subscription) {
        await ensureVip3xSchedule(stripe, session.subscription)
      }
    }
    if (event.type === 'invoice.paid') {
      const invoice = event.data.object
      const raw = invoice.subscription || invoice.parent?.subscription_details?.subscription
      const subId = typeof raw === 'string' ? raw : raw?.id
      if (subId) await ensureVip3xSchedule(stripe, subId)
    }
  } catch (e) {
    console.error('handleStripeWebhook:', e)
    return res.status(500).send('handler error')
  }

  return res.json({ received: true })
}
