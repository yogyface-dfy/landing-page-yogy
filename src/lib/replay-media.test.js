import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { allowedReplayHop, replayMediaFromUrl } from '../../lib/replay-media.js'

const MP4 =
  'https://ugvdrpjctnayuxslomyq.supabase.co/storage/v1/object/public/public-videos/217cf33e-f90a-43a5-8d1c-43a66b5e9185.mp4'

describe('replay media', () => {
  it('garde un id YouTube', () => {
    const media = replayMediaFromUrl('https://youtu.be/abcdefghijk')
    assert.equal(media.id, 'abcdefghijk')
    assert.equal(media.src, '')
    assert.equal(allowedReplayHop('https://www.youtube.com/watch?v=abcdefghijk'), true)
  })

  it('accepte un mp4 Médias et retire la query', () => {
    const media = replayMediaFromUrl(`${MP4}?token=secret`)
    assert.equal(media.id, '')
    assert.equal(media.src, MP4)
    assert.equal(allowedReplayHop(MP4), true)
  })

  it('refuse un autre hôte ou un autre chemin Storage', () => {
    assert.deepEqual(replayMediaFromUrl('https://evil.example/video.mp4'), { id: '', src: '' })
    assert.equal(
      replayMediaFromUrl(
        'https://ugvdrpjctnayuxslomyq.supabase.co/storage/v1/object/public/recordings/217cf33e-f90a-43a5-8d1c-43a66b5e9185.mp4',
      ).src,
      '',
    )
    assert.equal(allowedReplayHop('https://ugvdrpjctnayuxslomyq.supabase.co/rest/v1/public_videos'), false)
    assert.equal(allowedReplayHop('https://go.yogyface.fr/replay-yt'), true)
  })
})
