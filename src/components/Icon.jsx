/**
 * Icônes SVG custom pour la DA YoGyFace
 * Stroke-based, 24x24 viewBox, style linéaire épuré
 */

const icons = {
  /* ── Science & Diagnostic ── */
  microscope: (
    <>
      <circle cx="10" cy="7" r="3" />
      <line x1="10" y1="10" x2="10" y2="16" />
      <line x1="6" y1="16" x2="14" y2="16" />
      <line x1="10" y1="13" x2="14" y2="10" />
      <line x1="6" y1="20" x2="18" y2="20" />
      <line x1="10" y1="16" x2="10" y2="20" />
    </>
  ),
  dna: (
    <>
      <path d="M6 3c0 4.5 12 4.5 12 9s-12 4.5-12 9" />
      <path d="M18 3c0 4.5-12 4.5-12 9s12 4.5 12 9" />
      <line x1="7" y1="7.5" x2="17" y2="7.5" />
      <line x1="7" y1="16.5" x2="17" y2="16.5" />
      <line x1="9" y1="12" x2="15" y2="12" />
    </>
  ),

  /* ── Actions & Process ── */
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
      <path d="M18 14l.75 2.25L21 17l-2.25.75L18 20l-.75-2.25L15 17l2.25-.75L18 14z" />
    </>
  ),

  /* ── Wellness & Body ── */
  massage: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <path d="M8 10c0 0 1.5 2 4 2s4-2 4-2" />
      <path d="M7 14l-3 4" />
      <path d="M17 14l3 4" />
      <path d="M9 12v6c0 1 .5 2 1.5 2h3c1 0 1.5-1 1.5-2v-6" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 21c-3-3-7-7-7-11a7 7 0 0 1 7-7 7 7 0 0 1 7 7c0 4-4 8-7 11z" />
      <path d="M12 7v8" />
      <path d="M9 12c1.5 0 3 1 3 3" />
      <path d="M15 12c-1.5 0-3 1-3 3" />
    </>
  ),

  /* ── Communication ── */
  chat: (
    <>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </>
  ),

  /* ── Nature & Quality ── */
  leaf: (
    <>
      <path d="M17 3c-3 0-8 1-10 6-2 5 0 10 3 12" />
      <path d="M7 21c4-4 7-8 10-15" />
      <path d="M17 3c1 4 1 9-2 13" />
    </>
  ),
  flower: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a4 4 0 0 1 0 7" />
      <path d="M12 2a4 4 0 0 0 0 7" />
      <path d="M19.07 4.93a4 4 0 0 1-3.54 5.54" />
      <path d="M22 12a4 4 0 0 1-7 0" />
      <path d="M22 12a4 4 0 0 0-7 0" />
      <path d="M19.07 19.07a4 4 0 0 1-5.54-3.54" />
      <path d="M12 22a4 4 0 0 1 0-7" />
      <path d="M12 22a4 4 0 0 0 0-7" />
      <path d="M4.93 19.07a4 4 0 0 1 3.54-5.54" />
      <path d="M2 12a4 4 0 0 1 7 0" />
      <path d="M2 12a4 4 0 0 0 7 0" />
      <path d="M4.93 4.93a4 4 0 0 1 5.54 3.54" />
    </>
  ),

  /* ── Program & App ── */
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18.01" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="5" width="14" height="14" rx="2" />
      <path d="M16 10l6-3v10l-6-3" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M21 21v-1.5a3 3 0 0 0-2-2.83" />
    </>
  ),
  graduation: (
    <>
      <path d="M22 10L12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      <line x1="22" y1="10" x2="22" y2="17" />
    </>
  ),
  infinity: (
    <>
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4z" />
    </>
  ),

  /* ── Expertise ── */
  brain: (
    <>
      <path d="M9.5 2a3 3 0 0 0-2.83 4A3.5 3.5 0 0 0 4 9.5a3.5 3.5 0 0 0 1.33 2.74A3 3 0 0 0 7 18h1" />
      <path d="M14.5 2a3 3 0 0 1 2.83 4A3.5 3.5 0 0 1 20 9.5a3.5 3.5 0 0 1-1.33 2.74A3 3 0 0 1 17 18h-1" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </>
  ),
  pill: (
    <>
      <path d="M10.5 1.5l-8 8a5.66 5.66 0 0 0 8 8l8-8a5.66 5.66 0 0 0-8-8z" />
      <line x1="6" y1="14" x2="14" y2="6" />
    </>
  ),

  /* ── Edit & Craft ── */
  pen: (
    <>
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </>
  ),

  /* ── Decorative mission ── */
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
}

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name] || icons.sparkles}
    </svg>
  )
}
