import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkoutReturnSearch, normalizeFirstName, normalizePhone, withReturnSearch } from './stripe-checkout.js'

test('normalizeFirstName', () => {
  assert.equal(normalizeFirstName('  Marin '), 'Marin')
  assert.equal(normalizeFirstName('x'), '')
  assert.equal(normalizeFirstName('test'), '')
  assert.equal(normalizeFirstName('%FIRSTNAME%'), '')
  assert.equal(normalizeFirstName('%firstname%'), '')
})

test('checkout return query', () => {
  const raw = '?email=a@b.co&cs=cs_old&day=mardi&age=45_54'
  assert.equal(checkoutReturnSearch(raw), 'email=a%40b.co&day=mardi&age=45_54')
  const success = withReturnSearch(
    'https://yogyface.fr/vente-upsell?cs={CHECKOUT_SESSION_ID}',
    raw,
  )
  assert.equal(
    success,
    'https://yogyface.fr/vente-upsell?cs={CHECKOUT_SESSION_ID}&email=a%40b.co&day=mardi&age=45_54',
  )
  assert.equal(withReturnSearch('https://yogyface.fr/vente', ''), 'https://yogyface.fr/vente')
})

test('normalizePhone E.164', () => {
  assert.equal(normalizePhone('+33633947899'), '+33633947899')
  // URLSearchParams : + → espace
  assert.equal(normalizePhone(' 33633947899'), '+33633947899')
  assert.equal(normalizePhone('0633947899'), '0633947899')
  assert.equal(normalizePhone('12'), '')
})
