import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkoutCustomerFields } from './stripe-offers.js'

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
