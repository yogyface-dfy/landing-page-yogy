/**
 * Checkout Session + upsell 1 clic. Les Payment Links restent en fallback
 * si STRIPE_SECRET_KEY n'est pas encore posée (Railway).
 */
import Stripe from 'stripe'
import { isValidEmail } from '../src/lib/stripe-checkout.js'
import { PLANS, UPSELL, UPSELL_ENABLED, purchaseContentName, purchaseValue } from '../src/lib/stripe-offers.js'
import { sendCapiEvent } from './meta-capi.js'

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

/** Cookies Meta + event_id client — dédup pixel / CAPI. */
function facebookMeta(req) {
  const body = req.body || {}
  const eventId = String(body.meta_event_id || '').slice(0, 80)
  const fbp = String(body.fbp || cookieValue(req, '_fbp') || '').slice(0, 150)
  const fbc = String(body.fbc || cookieValue(req, '_fbc') || '').slice(0, 500)
  return {
    ...(eventId ? { meta_event_id: eventId } : {}),
    ...(fbp ? { fbp } : {}),
    ...(fbc ? { fbc } : {}),
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

function scheduleIdOf(sub) {
  if (!sub?.schedule) return null
  return typeof sub.schedule === 'string' ? sub.schedule : sub.schedule.id
}

function phaseItems(phase) {
  return (phase?.items || [])
    .map((item) => ({ price: phasePriceId(item), quantity: item.quantity || 1 }))
    .filter((item) => item.price)
}

/**
 * Mensualités limitées (VIP 3×/6×, Studio 4×/6×) : schedule puis cancel.
 * from_subscription crée une phase = période en cours + end_behavior release (abo sans fin).
 * start_date + duration sur cette phase → 400 (API clover). On garde la phase courante
 * (start/end), puis une phase duration pour les échéances restantes.
 */
async function configureInstallmentSchedule(stripe, schedule, remainingAfterCurrent) {
  if (schedule.end_behavior === 'cancel') return

  const phase = schedule.phases?.find((p) => !p.end_date || p.end_date * 1000 > Date.now()) || schedule.phases?.[0]
  const items = phaseItems(phase)
  if (!phase || !items.length) {
    console.error('configureInstallmentSchedule: items manquants', schedule.id)
    return
  }

  const current = {
    items,
    start_date: phase.start_date,
    end_date: phase.end_date,
    proration_behavior: 'none',
  }
  const phases =
    remainingAfterCurrent > 0
      ? [
          current,
          {
            items,
            duration: { interval: 'month', interval_count: remainingAfterCurrent },
            proration_behavior: 'none',
          },
        ]
      : [current]

  await stripe.subscriptionSchedules.update(schedule.id, { end_behavior: 'cancel', phases })
}

async function ensureInstallmentSchedule(stripe, subscriptionId) {
  const sub = await stripe.subscriptions.retrieve(subscriptionId)
  const n = Number(sub.metadata?.max_invoices)
  const months = n >= 2 ? n : sub.metadata?.plan === 'vip-3x' ? 3 : 0
  if (!months || sub.status === 'canceled') return

  let schedule
  const existingId = scheduleIdOf(sub)
  if (existingId) {
    schedule = await stripe.subscriptionSchedules.retrieve(existingId)
  } else {
    try {
      schedule = await stripe.subscriptionSchedules.create({ from_subscription: sub.id })
    } catch (err) {
      const retry = await stripe.subscriptions.retrieve(subscriptionId)
      const id = scheduleIdOf(retry)
      if (!id) throw err
      schedule = await stripe.subscriptionSchedules.retrieve(id)
    }
  }

  const paid = await stripe.invoices.list({ subscription: subscriptionId, status: 'paid', limit: 20 })
  const remainingAfterCurrent = Math.max(months - paid.data.length, 0)

  try {
    await configureInstallmentSchedule(stripe, schedule, remainingAfterCurrent)
  } catch (err) {
    console.error('configureInstallmentSchedule:', err?.message || err)
    throw err
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
    success_url: `${origin}/merci-achat?upsell=1`,
    cancel_url: `${origin}/vente-upsell?cs=${parentSessionId}`,
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
    const fb = facebookMeta(req)
    // V2 par défaut : webi ne doit jamais ouvrir les exos RESET V1 (achats ≥ 10/09/2026).
    // max_invoices aussi sur la session (webi lit checkout.session.completed, pas que l'abo).
    const offerMeta = {
      kind: spec.offer,
      offer: spec.offer,
      plan,
      orig_email: trimmed,
      version: 'v2',
      ...(spec.months ? { max_invoices: String(spec.months) } : {}),
      ...df,
      ...fb,
    }

    const params = {
      mode: spec.mode,
      locale: 'fr',
      // Upsell coupé : Stripe envoie direct sur /merci-achat. Remettre UPSELL_ENABLED.
      // Pas de ?session_id= : DataFast le prend pour un 2e paiement (metadata Stripe suffit).
      success_url: UPSELL_ENABLED
        ? `${origin}/vente-upsell?cs={CHECKOUT_SESSION_ID}`
        : `${origin}/merci-achat`,
      cancel_url: `${origin}${cancel}`,
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      // Pas de client_reference_id : webi le lit comme code marraine.
      metadata: offerMeta,
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
      // setup_future_usage → Stripe affiche « ce paiement et ceux à venir ».
      // Utile seulement pour l'upsell 1 clic (carte off-session). Upsell coupé = one-shot.
      params.payment_intent_data = {
        ...(UPSELL_ENABLED ? { setup_future_usage: 'off_session' } : {}),
        metadata: offerMeta,
      }
    } else {
      params.subscription_data = {
        metadata: offerMeta,
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
        await ensureInstallmentSchedule(stripe, subId)
      } catch (e) {
        console.error('ensureInstallmentSchedule:', e)
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

function purchaseCustomData(session) {
  const plan = session.metadata?.plan || ''
  const kind = session.metadata?.kind || ''
  if (kind === 'upsell') {
    return {
      value: (session.amount_total || 0) / 100,
      currency: 'EUR',
      content_type: 'product',
      content_ids: ['upsell'],
      content_name: 'Séance 1:1',
      num_items: 1,
      order_id: session.id,
    }
  }
  const spec = PLANS[plan]
  return {
    value: spec ? purchaseValue(plan) : (session.amount_total || 0) / 100,
    currency: 'EUR',
    content_type: 'product',
    content_ids: [plan || kind || 'yogyface'],
    content_name: purchaseContentName(plan),
    num_items: 1,
    order_id: session.id,
  }
}

/** Purchase CAPI au paiement réel. invoice.paid (mensualités 2..N) ne re-fire pas. */
function sendPurchaseCapi(session) {
  if (session.payment_status !== 'paid') return Promise.resolve()
  const details = session.customer_details || {}
  const firstName = String(details.name || '').trim().split(/\s+/)[0] || ''
  return sendCapiEvent({
    eventName: 'Purchase',
    eventId: session.metadata?.meta_event_id || session.id,
    pageUrl: 'https://yogyface.fr/merci-achat',
    email: details.email || session.customer_email || session.metadata?.orig_email,
    phone: details.phone,
    firstName,
    fbp: session.metadata?.fbp,
    fbc: session.metadata?.fbc,
    customData: purchaseCustomData(session),
  })
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
        await ensureInstallmentSchedule(stripe, session.subscription)
      }
      // CAPI Purchase (VIP / Studio / upsell). Ne bloque pas le webhook si Meta rate.
      sendPurchaseCapi(session).catch((err) => console.error('Meta Purchase CAPI:', err))
    }
    if (event.type === 'invoice.paid') {
      const invoice = event.data.object
      const raw = invoice.subscription || invoice.parent?.subscription_details?.subscription
      const subId = typeof raw === 'string' ? raw : raw?.id
      if (subId) await ensureInstallmentSchedule(stripe, subId)
    }
  } catch (e) {
    console.error('handleStripeWebhook:', e)
    return res.status(500).send('handler error')
  }

  return res.json({ received: true })
}
