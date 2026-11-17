/**
 * Lien perso WebinarJam (wj_live_link) pour les inscrites d'un webi.
 *
 *   node scripts/send-wj-live-link.mjs
 *     dry run : lit Airtable, n'envoie rien
 *   node scripts/send-wj-live-link.mjs --test marinfoussier@gmail.com
 *     un seul mail test, via Resend
 *   node scripts/send-wj-live-link.mjs --send --yes
 *     envoie pour de vrai, par lots de 100 (Resend)
 */
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })
dotenv.config()

const WEBINAR = 'YOGYFACE - STUDIO - 03/11/2026'
const TABLE_ID = process.env.AIRTABLE_ATELIER_TABLE_ID || 'tblgeGEVgkZnDxwfR'
const SUBJECT = 'Problème technique : ton lien pour te connecter'
const BATCH = 100
const RETRIES = 5

const args = process.argv.slice(2)
const testTo = readFlag('--test')
const doSend = args.includes('--send')
const confirmed = args.includes('--yes')

function readFlag(name) {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : ''
}

function mustEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Variable manquante : ${name}`)
  return value
}

/** Nom d'expéditeur + adresse. RESEND_FROM peut être « contact@… » ou « Nom <contact@…> ». */
function fromAddress() {
  const raw = mustEnv('RESEND_FROM').trim()
  if (raw.includes('<')) return raw
  return `Laury de YoGyFace <${raw}>`
}

/** Objet + corps. Le lien est celui de la ligne Airtable. */
function buildMail(link) {
  const href = link
  const text = [
    'Bonjour,',
    '',
    'On a un problème technique avec la plateforme.',
    '',
    'Connecte-toi avec ce lien, s\'il te plaît :',
    href,
    '',
    'À tout de suite,',
    'Laury',
    '',
    'Tu reçois ce message parce que tu es inscrite à l\'atelier YoGyFace du 3 novembre.',
    'Laury Anater, 12 rue Beaubourg, 75003 Paris',
  ].join('\n')

  const html = `<!doctype html>
<html lang="fr">
<body style="margin:0;padding:0;background:#f6f1ee;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">On a un problème technique avec la plateforme. Connecte-toi avec ce lien, s'il te plaît.</div>
<table role="presentation" width="100%" style="width:100%;background:#f6f1ee;">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" style="width:100%;max-width:600px;background:#ffffff;">
<tr><td style="padding:28px 28px 8px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.5;color:#1a1a1a;">
<p style="margin:0 0 16px;">Bonjour,</p>
<p style="margin:0 0 16px;">On a un problème technique avec la plateforme.</p>
<p style="margin:0 0 20px;">Connecte-toi avec ce lien, s'il te plaît.</p>
<p style="margin:0 0 20px;"><a href="${href}" style="display:inline-block;background:#E6726A;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:999px;">Je me connecte</a></p>
<p style="margin:0 0 16px;font-size:14px;word-break:break-all;"><a href="${href}" style="color:#E6726A;">${href}</a></p>
<p style="margin:0;">À tout de suite,<br>Laury</p>
</td></tr>
<tr><td style="padding:8px 28px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;color:#888888;">
Tu reçois ce message parce que tu es inscrite à l'atelier YoGyFace du 3 novembre.<br>
Laury Anater, 12 rue Beaubourg, 75003 Paris
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`

  return { subject: SUBJECT, text, html }
}

async function airtableGet(url, pat) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${pat}` } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.error?.message || `Airtable ${res.status}`)
  return data
}

/** Inscrites du webi. Une ligne par email : on garde le lien s'il y en a un. */
async function loadRecipients() {
  const pat = mustEnv('AIRTABLE_PAT')
  const baseId = mustEnv('AIRTABLE_ATELIER_BASE_ID')
  const formula = `{Webinar Name}="${WEBINAR}"`
  const fields = ['Email', 'Prénom', 'wj_live_link', 'Webinar Name']
  const byEmail = new Map()
  let offset = ''
  let rows = 0

  do {
    const params = new URLSearchParams({ filterByFormula: formula, pageSize: '100' })
    if (offset) params.set('offset', offset)
    for (const field of fields) params.append('fields[]', field)
    const url = `https://api.airtable.com/v0/${baseId}/${TABLE_ID}?${params}`
    const page = await airtableGet(url, pat)
    for (const record of page.records || []) {
      rows += 1
      const email = String(record.fields.Email || '').trim().toLowerCase()
      if (!email) continue
      const link = String(record.fields.wj_live_link || '').trim()
      const prenom = String(record.fields['Prénom'] || '').trim()
      const prev = byEmail.get(email)
      if (!prev || (!prev.link && link)) byEmail.set(email, { email, prenom, link })
    }
    offset = page.offset || ''
  } while (offset)

  const all = [...byEmail.values()]
  return {
    rows,
    ready: all.filter((row) => row.link.startsWith('http')),
    missing: all.filter((row) => !row.link.startsWith('http')),
  }
}

function printDryRun(report) {
  console.log(`Webinar : ${WEBINAR}`)
  console.log(`Lignes Airtable : ${report.rows}`)
  console.log(`Emails uniques avec lien : ${report.ready.length}`)
  console.log(`Emails uniques sans lien : ${report.missing.length}`)
  if (report.missing.length) {
    console.log('Sans wj_live_link :')
    for (const row of report.missing) console.log(`- ${row.prenom || '(sans prénom)'} <${row.email}>`)
  }
}

function payload(to, mail) {
  return {
    from: fromAddress(),
    to: [to],
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** 429, coupure réseau et 5xx : on reprend. La clé idempotente évite un double envoi. */
async function resend(path, body, idempotencyKey) {
  let last
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const res = await fetch(`https://api.resend.com${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mustEnv('RESEND_API_KEY')}`,
          'Content-Type': 'application/json',
          ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
        },
        body: JSON.stringify(body),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) return data
      last = new Error(`Resend ${res.status} : ${data.message || data.name || res.statusText}`)
      last.status = res.status
      last.retryAfter = Number(res.headers.get('retry-after')) || 0
    } catch (error) {
      last = error
      last.status = 0
    }
    const retryable = last.status === 0 || last.status === 429 || last.status >= 500
    if (!retryable || attempt === RETRIES) throw last
    const wait = last.retryAfter
      ? last.retryAfter * 1000
      : Math.min(8000, 400 * 2 ** (attempt - 1))
    console.log(`reprise ${attempt}/${RETRIES - 1} dans ${wait} ms (${last.message})`)
    await sleep(wait)
  }
  throw last
}

/** Test : un seul destinataire, avec le lien d'une inscrite pour voir le rendu. */
async function sendTest(to, sample) {
  const mail = buildMail(sample.link)
  mail.subject = `[TEST] ${mail.subject}`
  const data = await resend('/emails', payload(to, mail), `wj-0311-test-${to}`)
  console.log(`Test envoyé à ${to} (id ${data.id})`)
  console.log(`Lien utilisé : ${sample.prenom} <${sample.email}>`)
}

/**
 * Un lot refusé (adresse invalide) est coupé en deux jusqu'à isoler la ligne.
 * Les autres partent. Une 429 ou un 5xx est déjà rejoué par resend().
 */
async function sendChunk(chunk, key, failed) {
  const body = chunk.map((row) => payload(row.email, buildMail(row.link)))
  try {
    await resend('/emails/batch', body, key)
  } catch (error) {
    const rejected = error.status === 400 || error.status === 422
    if (!rejected) throw error
    if (chunk.length === 1) {
      failed.push(chunk[0].email)
      console.log(`ignoré ${chunk[0].email} : ${error.message}`)
      return
    }
    const mid = Math.ceil(chunk.length / 2)
    console.log(`lot refusé (${chunk.length}), découpe`)
    await sendChunk(chunk.slice(0, mid), `${key}-a`, failed)
    await sendChunk(chunk.slice(mid), `${key}-b`, failed)
  }
}

/** Lots de 100. Une requête Resend = un lot, sous la limite de 10 req/s. */
async function sendAll(ready) {
  const sorted = [...ready].sort((a, b) => a.email.localeCompare(b.email))
  const failed = []
  let sent = 0
  for (let i = 0; i < sorted.length; i += BATCH) {
    const chunk = sorted.slice(i, i + BATCH)
    const before = failed.length
    await sendChunk(chunk, `wj-0311-batch-${i}`, failed)
    sent += chunk.length - (failed.length - before)
    console.log(`traité ${Math.min(i + BATCH, sorted.length)}/${sorted.length}`)
    if (i + BATCH < sorted.length) await sleep(150)
  }
  console.log(`Terminé : ${sent} mails envoyés, ${failed.length} ignorés.`)
  if (failed.length) {
    console.log(failed.join('\n'))
    process.exitCode = 1
  }
}

const report = await loadRecipients()
printDryRun(report)

if (testTo) {
  const sample = report.ready[0]
  if (!sample) throw new Error('Aucun lien à mettre dans le mail test')
  await sendTest(testTo, sample)
} else if (doSend) {
  if (!confirmed) throw new Error('Ajoute --yes pour envoyer pour de vrai')
  await sendAll(report.ready)
} else {
  console.log('Dry run seulement. Aucun email envoyé.')
}
