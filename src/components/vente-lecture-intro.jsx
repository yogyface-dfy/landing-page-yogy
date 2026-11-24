/**
 * Intro de /vente-lecture, sous le titre, dans le fond rose du hero.
 * Faits en gras, essais en liste, envie et temps sur une ligne.
 */
export default function VenteLectureIntro({ profile, className = '' }) {
  if (!profile) return null
  const { name, age, depuis, items, empty, envie, temps } = profile
  const hasLead = Boolean(age || depuis)
  return (
    <div className={className}>
      {hasLead && (
        <p className="text-noir text-[16px] md:text-[17px] leading-relaxed">
          {name ? (
            <>
              <span className="font-display font-black tracking-tight">{name}</span>,{' '}
            </>
          ) : null}
          {age && depuis ? (
            <>
              {name ? 'tu as' : 'Tu as'} <strong>{age}</strong>, et tu vois des changements sur ton visage depuis <strong>{depuis}</strong>.
            </>
          ) : null}
          {age && !depuis ? (
            <>
              {name ? 'tu as' : 'Tu as'} <strong>{age}</strong>.
            </>
          ) : null}
          {!age && depuis ? (
            <>
              {name ? 'tu vois' : 'Tu vois'} des changements sur ton visage depuis <strong>{depuis}</strong>.
            </>
          ) : null}
        </p>
      )}
      {hasLead && (
        <p className="font-semibold text-noir text-[16px] md:text-[17px] leading-snug mt-2">
          Après avoir coaché des centaines de femmes, je peux te dire que c’est pile le bon moment pour venir contrer la tendance.
        </p>
      )}
      {items?.length > 0 && (
        <ul className="mt-4 space-y-2.5 text-left">
          {items.map((item) => (
            <li key={item.label} className="flex items-start gap-2.5 text-[15px] leading-snug">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-corail" aria-hidden />
              <span>
                <strong className="font-semibold text-noir">{item.label}</strong>
                <span className="text-noir/70">. {item.note}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
      {empty ? <p className="text-noir text-[15px] leading-relaxed mt-4">{empty}</p> : null}
      {(envie || temps) && (
        <p className="text-noir text-[16px] leading-relaxed mt-4">
          {envie ? (
            <>
              {envie.lead} <strong>{envie.bold}</strong>.{' '}
            </>
          ) : null}
          {temps ? (
            <>
              {temps.line} <strong>{temps.bold}</strong> par jour pour reprendre ton visage en main.
            </>
          ) : envie ? (
            'On reprend ton visage en main, un geste court chaque jour.'
          ) : null}
        </p>
      )}
      <p className="font-serif italic text-corail text-[17px] mt-4">Découvre mon programme ci-dessous.</p>
    </div>
  )
}
