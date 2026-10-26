import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { parseEmail, suggestEmailTypo } from './email-typos.js'

describe('suggestEmailTypo', () => {
  it('corrige gail.com → gmail.com', () => {
    assert.equal(suggestEmailTypo('adfarida1@gail.com'), 'adfarida1@gmail.com')
  })

  it('corrige hitmail.fr → hotmail.fr (pas outlook)', () => {
    assert.equal(suggestEmailTypo('s-kreuz@hitmail.fr'), 's-kreuz@hotmail.fr')
  })

  it('ne touche PAS yahoo.fr', () => {
    assert.equal(suggestEmailTypo('torres_corinne@yahoo.fr'), null)
  })

  it('ne touche PAS hotmail.fr', () => {
    assert.equal(suggestEmailTypo('soclairephie@hotmail.fr'), null)
  })

  it('ne transforme PAS hotmail.fr en outlook.fr', () => {
    assert.equal(suggestEmailTypo('x@hotmail.fr'), null)
  })

  it('corrige gmail.col / gmail.come', () => {
    assert.equal(suggestEmailTypo('a@gmail.col'), 'a@gmail.com')
    assert.equal(suggestEmailTypo('a@gmail.come'), 'a@gmail.com')
  })
})

describe('parseEmail', () => {
  it('normalise en minuscules', () => {
    assert.deepEqual(parseEmail('  Foo@Yahoo.FR '), {
      email: 'foo@yahoo.fr',
      local: 'foo',
      domain: 'yahoo.fr',
    })
  })

  it('rejette un format invalide', () => {
    assert.equal(parseEmail('pas-un-email'), null)
  })
})
