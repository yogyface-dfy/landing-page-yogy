/**
 * Créneau atelier Studio : prochain mardi 20h–21h30 Europe/Paris.
 * Liens Google / Outlook / Office + corps .ics (Apple).
 * Module sans deps browser — importable depuis server.js.
 */

const PARIS = 'Europe/Paris'
const WEEKDAY = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function pad(n) {
  return String(n).padStart(2, '0')
}

function parisParts(date) {
  const map = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: PARIS,
      weekday: 'short',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value]),
  )
  return {
    year: +map.year,
    month: +map.month,
    day: +map.day,
    hour: +map.hour,
    weekday: WEEKDAY[map.weekday],
  }
}

/** Même règle que nextTuesdayLiveLabel (après 20h le mardi → +7). */
export function nextTuesdayLiveParts(now = new Date()) {
  const p = parisParts(now)
  let add = (2 - p.weekday + 7) % 7
  if (add === 0 && p.hour >= 20) add = 7
  const target = new Date(Date.UTC(p.year, p.month - 1, p.day + add, 12))
  const y = target.getUTCFullYear()
  const m = target.getUTCMonth() + 1
  const d = target.getUTCDate()
  return { y, m, d, ymd: `${y}-${pad(m)}-${pad(d)}`, target }
}

function escapeIcs(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
}

export function nextStudioCalendarEvent(now = new Date()) {
  const { y, m, d } = nextTuesdayLiveParts(now)
  const day = `${y}${pad(m)}${pad(d)}`
  return {
    // Affichage page : `${title} · ${calNote}` → « Atelier YoGyFace · live · 90 minutes… »
    title: 'Atelier YoGyFace',
    description:
      'Atelier YoGyFace en direct (90 min). Le lien de connexion arrive par email / WhatsApp.',
    location: 'En ligne',
    startLocal: `${day}T200000`,
    endLocal: `${day}T213000`,
    startIso: `${y}-${pad(m)}-${pad(d)}T20:00:00`,
    endIso: `${y}-${pad(m)}-${pad(d)}T21:30:00`,
    icsPath: '/api/calendar/atelier',
    calNote: 'live · 90 minutes · heure de Paris · en ligne',
  }
}

export function studioCalendarLinks(event = nextStudioCalendarEvent()) {
  const text = encodeURIComponent(event.title)
  const details = encodeURIComponent(event.description)
  const location = encodeURIComponent(event.location)
  const google =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${text}` +
    `&dates=${event.startLocal}/${event.endLocal}` +
    `&details=${details}` +
    `&location=${location}` +
    `&ctz=Europe/Paris`
  const outlookBase =
    `subject=${text}` +
    `&body=${details}` +
    `&location=${location}` +
    `&startdt=${encodeURIComponent(event.startIso)}` +
    `&enddt=${encodeURIComponent(event.endIso)}`
  return {
    google,
    apple: event.icsPath,
    outlook:
      `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&${outlookBase}`,
    office365:
      `https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&${outlookBase}`,
    ics: event.icsPath,
    event,
  }
}

export function buildStudioIcs(event = nextStudioCalendarEvent()) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
  const uid = `atelier-${event.startLocal}@yogyface.fr`
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//YoGyFace//Atelier//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Europe/Paris:${event.startLocal}`,
    `DTEND;TZID=Europe/Paris:${event.endLocal}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n')
}

/** URL Google Contacts préremplie (Laury / YoGyFace). */
export function googleContactsNewUrl({
  email = 'contact@yogyface.fr',
  givenName = 'Laury',
  familyName = 'YoGyFace',
} = {}) {
  const q = new URLSearchParams({
    email,
    givenname: givenName,
    familyname: familyName,
  })
  return `https://contacts.google.com/new?${q}`
}
