import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { placesFromWebinarDate, placesLabel, saleLeadLine } from './workshop-places.js'

const NOW = new Date('2026-11-24T12:00:00Z')

describe('placesFromWebinarDate', () => {
  it('gives 5 on the day and before', () => {
    assert.equal(placesFromWebinarDate('2026-11-24', NOW), 5)
    assert.equal(placesFromWebinarDate('2026-11-25', NOW), 5)
  })

  it('steps down after the workshop', () => {
    assert.equal(placesFromWebinarDate('2026-11-23', NOW), 4)
    assert.equal(placesFromWebinarDate('2026-11-22', NOW), 3)
    assert.equal(placesFromWebinarDate('2026-11-21', NOW), 2)
    assert.equal(placesFromWebinarDate('2026-11-20', NOW), 1)
    assert.equal(placesFromWebinarDate('2026-11-01', NOW), 1)
  })

  it('reads french and slash dates', () => {
    assert.equal(placesFromWebinarDate('24/11/2026', NOW), 5)
    assert.equal(placesFromWebinarDate('24 novembre 2026', NOW), 5)
  })

  it('returns null when the date is missing or junk', () => {
    assert.equal(placesFromWebinarDate('', NOW), null)
    assert.equal(placesFromWebinarDate('mardi', NOW), null)
    assert.equal(placesFromWebinarDate('2026-02-31', NOW), null)
    assert.equal(placesLabel(null), '')
    assert.equal(placesLabel(5), 'Plus que 5 places')
    assert.equal(placesLabel(1), 'Plus que 1 place')
  })
})

describe('saleLeadLine', () => {
  it('uses only the url', () => {
    const q = new URLSearchParams('firstname=Marin&day=mardi')
    assert.equal(saleLeadLine(q), 'Marin, atelier du mardi')
    assert.equal(saleLeadLine(new URLSearchParams('day=mardi 24')), 'Atelier du mardi 24')
    assert.equal(saleLeadLine(new URLSearchParams('')), '')
  })
})
