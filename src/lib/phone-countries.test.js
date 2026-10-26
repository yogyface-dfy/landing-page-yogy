import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { toE164, isValidE164Phone, isLikelyFakePhoneDigits } from './phone-countries.js'

describe('toE164 FR', () => {
  it('accepte un 06 classique', () => {
    assert.equal(toE164('33', '06 33 94 78 99', { iso: 'FR', mobileOnly: true }), '+33633947899')
  })

  it('refuse un numéro trop long (0340766093195)', () => {
    assert.equal(toE164('33', '0340766093195', { iso: 'FR', mobileOnly: true }), '')
  })

  it('refuse un fixe 01 en mobileOnly', () => {
    assert.equal(toE164('33', '0142567890', { iso: 'FR', mobileOnly: true }), '')
  })
})

describe('toE164 autres pays', () => {
  it('BE mobile 04… (9 chiffres nationaux)', () => {
    assert.equal(toE164('32', '0470123456', { iso: 'BE', mobileOnly: true }), '+32470123456')
  })

  it('CH mobile 07… (9 chiffres)', () => {
    assert.equal(toE164('41', '0791234567', { iso: 'CH', mobileOnly: true }), '+41791234567')
  })

  it('US 10 chiffres', () => {
    assert.equal(toE164('1', '4155552671', { iso: 'US', mobileOnly: true }), '+14155552671')
  })

  it('refuse US trop court', () => {
    assert.equal(toE164('1', '415555', { iso: 'US', mobileOnly: true }), '')
  })

  it('MA mobile 9 chiffres', () => {
    assert.equal(toE164('212', '0612345678', { iso: 'MA', mobileOnly: true }), '+212612345678')
  })
})

describe('isValidE164Phone', () => {
  it('FR mobile ok', () => {
    assert.equal(isValidE164Phone('+33633947899', { iso: 'FR', mobileOnly: true }), true)
  })

  it('FR trop long ko', () => {
    assert.equal(isValidE164Phone('+33340766093195', { iso: 'FR', mobileOnly: true }), false)
  })

  it('BE ok via dial seul', () => {
    assert.equal(isValidE164Phone('+32470123456', { mobileOnly: true }), true)
  })

  it('refuse un bidon 06 00 00 00 00', () => {
    assert.equal(isValidE164Phone('+33600000000', { iso: 'FR', mobileOnly: true }), false)
  })
})

describe('isLikelyFakePhoneDigits', () => {
  it('détecte répétitions / zéros / 060606', () => {
    assert.equal(isLikelyFakePhoneDigits('333333333'), true)
    assert.equal(isLikelyFakePhoneDigits('600000000'), true)
    assert.equal(isLikelyFakePhoneDigits('606060606'), true)
  })

  it('laisse passer un vrai mobile', () => {
    assert.equal(isLikelyFakePhoneDigits('633947899'), false)
  })

  it('toE164 refuse 06 33 33 33 33', () => {
    assert.equal(toE164('33', '06 33 33 33 33', { iso: 'FR', mobileOnly: true }), '')
  })
})
