import { studioCalendarLinks } from '../lib/studio-calendar'

const BTN =
  'flex h-[54px] items-center justify-center gap-2 rounded-full border border-noir/10 bg-white px-4 text-center text-[13px] font-semibold text-noir shadow-sm transition hover:-translate-y-0.5 hover:border-corail/40'

/**
 * Boutons agenda (Google / Outlook / Office / Apple .ics).
 * @param {{ links?: ReturnType<typeof studioCalendarLinks> }} props
 */
export default function CalendarButtons({ links }) {
  const L = links || studioCalendarLinks()
  const web = [
    { href: L.google, label: 'Google', emoji: '📅' },
    { href: L.outlook, label: 'Outlook', emoji: '📧' },
    { href: L.office365, label: 'Office 365', emoji: '💼' },
  ]
  return (
    <ul className="grid grid-cols-2 gap-3">
      {web.map((b) => (
        <li key={b.label}>
          <a href={b.href} target="_blank" rel="noopener noreferrer" className={BTN}>
            <span aria-hidden="true">{b.emoji}</span>
            {b.label}
          </a>
        </li>
      ))}
      <li>
        <a href={L.apple} download="atelier-yogyface.ics" className={BTN}>
          <span aria-hidden="true">🍎</span>
          Apple
        </a>
      </li>
    </ul>
  )
}
