import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { lessonHref, resolveLessonMax } from './lesson-progress.js'

describe('resolveLessonMax', () => {
  it('floors to current page number', () => {
    assert.equal(resolveLessonMax(3, undefined), 3)
    assert.equal(resolveLessonMax(2, '1'), 2)
  })

  it('keeps higher max from URL', () => {
    assert.equal(resolveLessonMax(1, '3'), 3)
    assert.equal(resolveLessonMax(1, ['2']), 2)
  })

  it('ignores invalid max', () => {
    assert.equal(resolveLessonMax(1, '9'), 1)
    assert.equal(resolveLessonMax(1, 'abc'), 1)
  })
})

describe('lessonHref', () => {
  it('omits max when still at 1', () => {
    assert.equal(lessonHref('/video-01', 1), '/video-01')
  })

  it('appends max for back-nav', () => {
    assert.equal(lessonHref('/video-01', 3), '/video-01?max=3')
    assert.equal(lessonHref('/video-02?foo=1', 2), '/video-02?max=2')
  })
})
