import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readLecture } from './lecture-query.js'

const MARIE =
  'age=45_54&zone=regard&regard=lion&depuis=2_5&essais=cremes,injections&resultat=revenu&habitude=fronce&envie=confiance&temps=10&firstname=Marie'

test('Marie : faits, liste, résultat, envie', () => {
  const p = readLecture(new URLSearchParams(MARIE))
  assert.equal(p.name, 'Marie')
  assert.equal(p.age, 'entre 45 et 54 ans')
  assert.equal(p.depuis, '2 à 5 ans')
  assert.deepEqual(
    p.items.map((item) => item.label),
    ['Crèmes', 'Injections'],
  )
  assert.match(p.items[0].note, /long terme/)
  assert.equal(p.envie.bold, 'retrouver confiance')
  assert.equal(p.temps.bold, '10 minutes')
})

test('yoga : note à part, pas « long terme »', () => {
  const p = readLecture(new URLSearchParams('essais=yoga&resultat=aucune'))
  assert.equal(p.items.length, 1)
  assert.match(p.items[0].note, /personnalisé/)
  assert.doesNotMatch(p.items[0].note, /long terme/)
})

test('yoga + crèmes : le résultat n’est pas répété dans la note yoga', () => {
  const p = readLecture(new URLSearchParams('essais=yoga,cremes&resultat=revenu'))
  assert.deepEqual(
    p.items.map((item) => item.label),
    ['Yoga du visage', 'Crèmes'],
  )
  assert.equal((p.items[0].note.match(/marché un temps/g) || []).length, 0)
})

test('rien commencé', () => {
  const p = readLecture(new URLSearchParams('essais=rien&resultat=pas_commence'))
  assert.equal(p.items.length, 0)
  assert.match(p.empty, /pas encore de méthode/)
})

test('aucune query quiz', () => {
  assert.equal(readLecture(new URLSearchParams('firstname=Marie&email=a@b.co')), null)
  assert.equal(readLecture(new URLSearchParams('zone=regard')), null)
})
