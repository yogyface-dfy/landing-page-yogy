import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  FUNNEL_TRACK_PAGES,
  isValidRecordId,
  trackFieldsForPage,
} from '../../lib/funnel-track.js'
import { withLeadQuery } from './lead-query.js'

describe('funnel-track mapping', () => {
  it('accepte les pages v1', () => {
    assert.equal(FUNNEL_TRACK_PAGES.has('confirmation-optin'), true)
    assert.equal(FUNNEL_TRACK_PAGES.has('video-01'), true)
    assert.equal(FUNNEL_TRACK_PAGES.has('replay-gratuit'), true)
  })

  it('valide recordId Airtable', () => {
    assert.equal(isValidRecordId('recXXXXXXXXXXXXXX'), true)
    assert.equal(isValidRecordId('recShort'), false)
    assert.equal(isValidRecordId(''), false)
  })

  it('open 1× seulement', () => {
    const first = trackFieldsForPage('video-01', 'open')
    assert.ok(first['video-01_ouverture'])
    const again = trackFieldsForPage('video-01', 'open', {
      existing: { 'video-01_ouverture': '2026-01-01T00:00:00.000Z' },
    })
    assert.deepEqual(again, {})
  })

  it('watch garde le max', () => {
    const up = trackFieldsForPage('cadeau1', 'watch', {
      watchPct: 50,
      watchSec: 40,
      existing: { 'cadeau1_watch%': 25, 'cadeau1_watch_seconds': 10 },
    })
    assert.equal(up['cadeau1_watch%'], 50)
    assert.equal(up['cadeau1_watch_seconds'], 40)

    const down = trackFieldsForPage('cadeau1', 'watch', {
      watchPct: 10,
      watchSec: 5,
      existing: { 'cadeau1_watch%': 50, 'cadeau1_watch_seconds': 40 },
    })
    assert.deepEqual(down, {})
  })

  it('cta + whatsapp timestamps', () => {
    const cta = trackFieldsForPage('replay-gratuit', 'cta')
    assert.ok(cta['replay-gratuit_clic_cta'])
    const wa = trackFieldsForPage('video-01', 'whatsapp')
    assert.ok(wa['video-01_clic_whatsapp'])
  })
})

describe('withLeadQuery', () => {
  it('propage les query + lead vers un path', () => {
    const out = withLeadQuery(
      '/vente',
      { recordId: 'recXXXXXXXXXXXXXX', email: 'a@b.co', firstName: 'Marie' },
      'utm_source=meta&h=tok',
    )
    assert.match(out, /^\/vente\?/)
    const q = new URLSearchParams(out.split('?')[1])
    assert.equal(q.get('utm_source'), 'meta')
    assert.equal(q.get('h'), 'tok')
    assert.equal(q.get('recordId'), 'recXXXXXXXXXXXXXX')
    assert.equal(q.get('email'), 'a@b.co')
    assert.equal(q.get('firstname'), 'Marie')
  })

  it('les params de la destination gagnent', () => {
    const out = withLeadQuery('/confirmation-achat-bienvenue?upsell=1', {}, 'upsell=0&email=a@b.co')
    const q = new URLSearchParams(out.split('?')[1])
    assert.equal(q.get('upsell'), '1')
    assert.equal(q.get('email'), 'a@b.co')
  })
})
