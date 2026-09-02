/**
 * Inscription liste d'attente — formulaire OU lien email
 * (`/merci-liste-attente?email=%EMAIL%` ou `/liste-attente?email=` → merci).
 *
 * Le POST part du navigateur (pas d'enroll au GET) : les scanners Outlook /
 * Gmail qui préchargent le lien ne créent pas de fiche Airtable.
 */
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { createRecord } from './airtable'
import { captureEvent } from './analytics'
import {
  consumeWaitlistConversion,
  fireWaitlistConversion,
  stashWaitlistConversion,
} from './meta-pixel'
import { isValidEmail, rememberPrefillEmail } from './stripe-checkout'

const DONE_KEY = 'yf_waitlist_done'
const AC_EMAIL_TAG = '%EMAIL%'
const AC_PRENOM_TAG = '%FIRSTNAME%'

function doneKey(email) {
  return `${DONE_KEY}:${String(email).trim().toLowerCase()}`
}

/** Évite un 2ᵉ POST si elle recharge la page merci avec le même ?email=. */
export function wasWaitlistEnrolled(email) {
  try {
    return sessionStorage.getItem(doneKey(email)) === '1'
  } catch {
    return false
  }
}

function markWaitlistEnrolled(email) {
  try {
    sessionStorage.setItem(doneKey(email), '1')
  } catch {
    /* private mode */
  }
}

/** Email depuis l'URL AC. Tag non remplacé ou valeur invalide → vide. */
export function waitlistEmailFromSearch(searchParams) {
  const raw = (searchParams?.get('email') || '').replace(/ /g, '+').trim()
  if (!raw || raw === AC_EMAIL_TAG) return ''
  return isValidEmail(raw) ? raw : ''
}

/** Prénom optionnel (`&prenom=%FIRSTNAME%`). Tag AC brut → vide. */
export function waitlistPrenomFromSearch(searchParams) {
  const raw = (searchParams?.get('prenom') || '').trim()
  if (!raw || raw === AC_PRENOM_TAG) return ''
  return raw.slice(0, 80)
}

/**
 * Crée (ou retrouve) la fiche Airtable + tracking.
 * @returns {Promise<{id: string, existing?: boolean}>}
 */
export async function enrollWaitlist({ email, prenom, phone } = {}) {
  if (!isValidEmail(email)) throw new Error('Email invalide')
  const fields = {
    Email: email.trim(),
    // Airtable exige souvent Prénom — tiret si le lien n'a que l'email.
    'Prénom': (prenom && String(prenom).trim()) || '—',
  }
  if (phone) fields.Phone = phone

  const result = await createRecord("Liste d'attente", fields)
  rememberPrefillEmail(email)
  captureEvent('waitlist_signup')
  stashWaitlistConversion({
    email,
    phone: phone || '',
    firstName: prenom || '',
  })
  markWaitlistEnrolled(email)
  return result
}

/**
 * Merci : si ?email= valide → inscrit ; sinon consomme le stash du formulaire.
 * Statut : ready | pending | error
 */
export function useWaitlistConfirm() {
  const [searchParams] = useSearchParams()
  const rawEmail = (searchParams.get('email') || '').replace(/ /g, '+').trim()
  const email = waitlistEmailFromSearch(searchParams)
  const prenom = waitlistPrenomFromSearch(searchParams)
  // 'ready' au 1er paint = même HTML que le prerender SSG (pas de mismatch hydrate).
  const [status, setStatus] = useState('ready')

  useEffect(() => {
    // Lien testé avec le tag AC brut, ou email mal formé.
    if (rawEmail && !email) {
      setStatus('error')
      return
    }

    let cancelled = false

    ;(async () => {
      if (email && !wasWaitlistEnrolled(email)) {
        setStatus('pending')
        try {
          await enrollWaitlist({ email, prenom })
        } catch (err) {
          console.error('Waitlist enroll error:', err)
          if (!cancelled) setStatus('error')
          return
        }
      }
      const payload = consumeWaitlistConversion()
      if (payload) fireWaitlistConversion(payload)
      if (!cancelled) setStatus('ready')
    })()

    return () => {
      cancelled = true
    }
  }, [email, prenom, rawEmail, searchParams])

  return status
}
