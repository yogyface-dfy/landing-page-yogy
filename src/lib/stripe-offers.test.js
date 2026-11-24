import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkoutCustomerFields, checkoutSubmitType, resolveUpsellOffer, upsellStripeMeta } from './stripe-offers.js'

test('4× subscription sans email : pas de customer_creation', () => {
  assert.deepEqual(
    checkoutCustomerFields({ mode: 'subscription', showUpsell: true }),
    {},
  )
})

test('1× payment sans email : if_required pour l’upsell', () => {
  assert.deepEqual(
    checkoutCustomerFields({ mode: 'payment', showUpsell: true }),
    { customer_creation: 'if_required' },
  )
})

test('email connu : rattache le cus_ même en 4×', () => {
  assert.deepEqual(
    checkoutCustomerFields({ customerId: 'cus_x', mode: 'subscription', showUpsell: true }),
    { customer: 'cus_x' },
  )
})

test('subscription : pas de submit_type (Stripe refuse pay en abo)', () => {
  assert.equal(checkoutSubmitType('subscription'), undefined)
  assert.equal(checkoutSubmitType('payment'), undefined)
})

test('upsell = guide 29 €, pas l’extension studio', () => {
  const offer = resolveUpsellOffer()
  assert.equal(offer.variant, 'guide')
  assert.equal(offer.amountCents, 2900)
  assert.equal(offer.compareAtCents, 5900)
  assert.equal(offer.stripePriceId, 'price_1UfIHXAU0KXfGydpFI2wjmGp')
  const meta = upsellStripeMeta({ parentSessionId: 'cs_test', origEmail: 'A@B.CO' })
  assert.equal(meta.product_kind, 'guide_appareils')
  assert.equal(meta.product_id, 'guide_appareils')
  assert.equal(meta.stripe_price_id, offer.stripePriceId)
  assert.equal(meta.coaching_hours, undefined)
  assert.equal(meta.orig_email, 'a@b.co')
})
