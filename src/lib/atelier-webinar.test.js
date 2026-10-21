import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  nextStudioWebinarYmd,
  studioWebinarName,
} from '../../lib/atelier-webinar.js'

/** Instant UTC qui tombe un jour donné à midi Paris (approx). */
function atParisNoon(ymd) {
  return new Date(`${ymd}T12:00:00+02:00`)
}

describe('studioWebinarName', () => {
  it('mercredi 21/10 → mardi suivant 27/10 (mardi courant déjà passé)', () => {
    const now = atParisNoon('2026-10-21')
    assert.equal(nextStudioWebinarYmd(now), '2026-10-27')
    assert.equal(studioWebinarName(now), 'YOGYFACE - STUDIO - 27/10/2026')
  })

  it('mardi 27/10 → ce mardi-là', () => {
    const now = atParisNoon('2026-10-27')
    assert.equal(studioWebinarName(now), 'YOGYFACE - STUDIO - 27/10/2026')
  })

  it('lundi 26/10 → mardi 27/10', () => {
    assert.equal(studioWebinarName(atParisNoon('2026-10-26')), 'YOGYFACE - STUDIO - 27/10/2026')
  })

  it('jeudi 22/10 → mardi 27/10', () => {
    assert.equal(studioWebinarName(atParisNoon('2026-10-22')), 'YOGYFACE - STUDIO - 27/10/2026')
  })
})
