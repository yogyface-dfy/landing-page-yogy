/**
 * Checkout Session + upsell 1 clic. Les Payment Links restent en fallback
 * si STRIPE_SECRET_KEY n'est pas encore posée (Railway).
 */
import Stripe from 'stripe'
import { isValidEmail } from '../src/lib/stripe-checkout.js'
import { PLANS, STUDIO_SALES_OPEN, VIP_SALES_OPEN, purchaseContentName, purchaseValue, resolveUpsellOffer, shouldShowUpsell, studioExtensionStripeMeta } from '../src/lib/stripe-offers.js'
import { sendCapiEvent } from './meta-capi.js'

const ALLOWED_CANCEL = new Set(['/vente-vip', '/vente', '/vente-10x', '/vente-6x'])

const cleanEnv = (value) => (value ?? '').trim().replace(/^["']|["']$/g, '')

function getStripe() {
  const key = cleanEnv(process.env.STRIPE_SECRET_KEY)
  if (!key) return null
  return new Stripe(key)
}

function resolveUpsell() {
  return resolveUpsellOffer()
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
  return ALLOWED_ORIGINS.has(built) ? built : 'https://www.yogyface.fr'
}

/** Réutilise le cus_ existant (Stripe n’unifie pas les emails). */
async function ensureCustomerId(stripe, email) {
  const em = String(email || '').trim().toLowerCase()
  if (!em.includes('@')) return null
  const list = await stripe.customers.list({ email: em, limit: 100 })
  const alive = list.data.filter((c) => !c.deleted)
  const found =
    alive.find((c) => c.metadata?.source !== 'yogyface_resolve_customer') || alive[0]
  if (found) return found.id
  const created = await stripe.customers.create(
    { email: em, metadata: { source: 'yogyface_checkout' } },
    { idempotencyKey: `yf-landing-cus-${em}`.slice(0, 255) },
  )
  return created.id
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

function stripeId(value) {
  if (!value) return null
  return typeof value === 'string' ? value : value.id || null
}

/** Carte du paiement Studio — PI 1×, abo 4×/6×, ou PM déjà sur le cus_. */
async function paymentMethodOf(stripe, session) {
  const fromPi = session.payment_intent
  if (fromPi && typeof fromPi !== 'string') {
    const pm = stripeId(fromPi.payment_method)
    if (pm) return pm
  }
  const piId = stripeId(fromPi)
  if (piId) {
    const pi = await stripe.paymentIntents.retrieve(piId, { expand: ['payment_method'] })
    const pm = stripeId(pi.payment_method)
    if (pm) return pm
  }

  const fromSub = session.subscription
  if (fromSub && typeof fromSub !== 'string') {
    const pm = stripeId(fromSub.default_payment_method)
    if (pm) return pm
  }
  const subId = stripeId(fromSub)
  if (subId) {
    const sub = await stripe.subscriptions.retrieve(subId, {
      expand: ['default_payment_method', 'latest_invoice.payment_intent.payment_method'],
    })
    const pm =
      stripeId(sub.default_payment_method) ||
      stripeId(sub.latest_invoice?.payment_intent?.payment_method)
    if (pm) return pm
  }

  const customerId = customerIdOf(session)
  if (!customerId) return null
  const fromCustomer = session.customer
  if (fromCustomer && typeof fromCustomer !== 'string') {
    const pm = stripeId(fromCustomer.invoice_settings?.default_payment_method)
    if (pm) return pm
  }
  const listed = await stripe.paymentMethods.list({ customer: customerId, limit: 10 })
  return listed.data[0]?.id || null
}

/** Après /vente : carte = default du customer (et de l’abo 4×/6×). */
async function stampDefaultPaymentMethod(stripe, session) {
  const customerId = customerIdOf(session)
  const pm = await paymentMethodOf(stripe, session)
  if (!customerId || !pm) return
  try {
    await stripe.paymentMethods.attach(pm, { customer: customerId })
  } catch {
    // déjà rattaché
  }
  await stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: pm },
  })
  const subId = stripeId(session.subscription)
  if (subId) {
    await stripe.subscriptions.update(subId, { default_payment_method: pm })
  }
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

export async function createCheckoutSession(req, res) {
  try {
    const { plan, email, cancelPath } = req.body || {}
    const spec = PLANS[plan]
    if (!spec) return res.status(400).json({ error: 'Offre inconnue' })
    if (!VIP_SALES_OPEN && spec.offer === 'vip') {
      return res.status(410).json({ error: 'Ventes VIP fermées' })
    }
    if (!STUDIO_SALES_OPEN && spec.offer === 'studio') {
      return res.status(410).json({ error: 'Ventes fermées' })
    }

    const stripe = getStripe()
    if (!stripe) {
      return res.status(503).json({ error: 'Paiement non configuré', fallbackUrl: spec.fallbackUrl })
    }

    const trimmed = isValidEmail(email) ? String(email).trim().toLowerCase().slice(0, 200) : ''
    const origin = publicOrigin(req)
    const cancel = ALLOWED_CANCEL.has(cancelPath) ? cancelPath : '/vente-vip'
    // Email connu (lien ?email=) → réutilise le cus_. Sinon Stripe le collecte au Checkout.
    const customerId = trimmed ? await ensureCustomerId(stripe, trimmed) : null
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
      // Studio (/vente, /vente-6x, /vente-10x) → /vente-upsell pack. VIP → confirmation.
      // Pas de ?session_id= : DataFast le prend pour un 2e paiement (metadata Stripe suffit).
      success_url: shouldShowUpsell(plan)
        ? `${origin}/vente-upsell?cs={CHECKOUT_SESSION_ID}`
        : `${origin}/confirmation-achat-bienvenue`,
      cancel_url: `${origin}${cancel}`,
      phone_number_collection: { enabled: true },
      allow_promotion_codes: true,
      // Pas de client_reference_id : webi le lit comme code marraine.
      metadata: offerMeta,
      line_items: [{ price_data: spec.priceData, quantity: 1 }],
    }

    // Jamais customer_creation:always (ghost à l’ouverture). cus_ si email connu ;
    // sinon if_required à la fin du paiement Studio → carte réutilisable pour l’upsell.
    if (customerId) params.customer = customerId
    else if (shouldShowUpsell(plan)) params.customer_creation = 'if_required'

    if (spec.mode === 'payment') {
      // setup_future_usage → Stripe affiche « ce paiement et ceux à venir ».
      // Utile seulement pour l'upsell 1 clic (carte off-session).
      params.payment_intent_data = {
        ...(shouldShowUpsell(plan) ? { setup_future_usage: 'off_session' } : {}),
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

    const plan = session.metadata?.plan || ''
    if (shouldShowUpsell(plan)) {
      try {
        await stampDefaultPaymentMethod(stripe, session)
      } catch (e) {
        console.error('stampDefaultPaymentMethod:', e)
      }
    }
    if (!shouldShowUpsell(plan)) {
      return res.json({ paid: true, plan, email: session.customer_details?.email || session.customer_email || '', upsell: null })
    }

    const offer = resolveUpsell(session.id)
    let alreadyTaken = false
    try {
      alreadyTaken = await hasUpsell(stripe, session)
    } catch (e) {
      console.error('hasUpsell:', e)
    }
    return res.json({
      paid: true,
      plan,
      email: session.customer_details?.email || session.customer_email || '',
      upsell: {
        variant: offer.variant,
        name: offer.name,
        image: offer.image,
        amountCents: offer.amountCents,
        compareAtCents: offer.compareAtCents,
        headline: offer.headline,
        sub: offer.sub,
        bullets: offer.bullets,
        withLabel: offer.withLabel,
        withoutLabel: offer.withoutLabel,
        compare: offer.compare,
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
    if (!shouldShowUpsell(session.metadata?.plan)) {
      return res.status(400).json({ error: 'Pas d’offre complémentaire' })
    }
    if (await hasUpsell(stripe, session)) {
      return res.json({ ok: true, already: true })
    }

    const offer = resolveUpsell(session.id)
    const df = datafastMeta(req, session.metadata || {})
    const payerEmail = session.metadata?.orig_email || session.customer_details?.email || session.customer_email || ''

    let customerId = customerIdOf(session) || (await ensureCustomerId(stripe, payerEmail))
    let pm = await paymentMethodOf(stripe, session)
    if (pm && customerId) {
      try {
        await stripe.paymentMethods.attach(pm, { customer: customerId })
      } catch {
        // déjà sur le customer
      }
    }
    if (!pm && customerId) {
      const listed = await stripe.paymentMethods.list({ customer: customerId, limit: 10 })
      pm = listed.data[0]?.id || null
    }

    // 1 clic seulement : pas de 2e Checkout, pas de 2e 3DS.
    if (!customerId || !pm) {
      console.error('chargeUpsell: pas de carte réutilisable', { customerId, hasPm: !!pm })
      return res.status(402).json({ error: 'Paiement refusé. Tu peux passer cette offre.' })
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
            ...studioExtensionStripeMeta({
              parentSessionId: session.id,
              origEmail: payerEmail,
              extra: df,
            }),
            charge_source: 'one_click',
          },
        },
        { idempotencyKey: `upsell-${session.id}` }
      )
      if (intent.status === 'succeeded' || intent.status === 'processing') {
        return res.json({ ok: true, id: intent.id })
      }
    } catch (err) {
      console.error('chargeUpsell:', err)
    }
    return res.status(402).json({ error: 'Paiement refusé. Tu peux passer cette offre.' })
  } catch (e) {
    console.error('chargeUpsell:', e)
    return res.status(500).json({ error: 'Upsell impossible' })
  }
}

function purchaseCustomData(session) {
  const plan = session.metadata?.plan || ''
  const kind = session.metadata?.kind || ''
  if (kind === 'upsell') {
    const variant = session.metadata?.upsell_variant || 'upsell'
    return {
      value: (session.amount_total || 0) / 100,
      currency: 'EUR',
      content_type: 'product',
      content_ids: [variant],
      content_name: 'Extension YoGyFace STUDIO 1 an',
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
    pageUrl: 'https://www.yogyface.fr/confirmation-achat-bienvenue',
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
      if (shouldShowUpsell(session.metadata?.plan)) {
        await stampDefaultPaymentMethod(stripe, session).catch((err) =>
          console.error('stampDefaultPaymentMethod:', err)
        )
      }
      // CAPI Purchase (VIP / Studio / upsell 3DS). Ne bloque pas le webhook si Meta rate.
      sendPurchaseCapi(session).catch((err) => console.error('Meta Purchase CAPI:', err))
    }
    // 1 clic : pas de checkout.session — Purchase CAPI sur le PI.
    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object
      if (pi.metadata?.kind === 'upsell' && pi.metadata?.charge_source === 'one_click') {
        const email = pi.metadata.orig_email || pi.metadata.user_email || ''
        sendPurchaseCapi({
          id: pi.id,
          amount_total: pi.amount,
          metadata: pi.metadata,
          payment_status: 'paid',
          customer_email: email,
          customer_details: { email },
        }).catch((err) => console.error('Meta Purchase CAPI:', err))
      }
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
