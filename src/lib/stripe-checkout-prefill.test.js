import { test } from 'node:test'
import assert from 'node:assert/strict'
import { normalizeFirstName, normalizePhone } from './stripe-checkout.js'

test('normalizeFirstName', () => {
  assert.equal(normalizeFirstName('  Marin '), 'Marin')
  assert.equal(normalizeFirstName('x'), '')
  assert.equal(normalizeFirstName('test'), '')
})

test('normalizePhone E.164', () => {
  assert.equal(normalizePhone('+33633947899'), '+33633947899')
  // URLSearchParams : + → espace
  assert.equal(normalizePhone(' 33633947899'), '+33633947899')
  assert.equal(normalizePhone('0633947899'), '0633947899')
  assert.equal(normalizePhone('12'), '')
})
