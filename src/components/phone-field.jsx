import { PHONE_COUNTRIES, flagEmoji } from '../lib/phone-countries'

/**
 * Téléphone + sélecteur de pays (drapeau). Défaut France côté parent.
 * @param {{ hint?: string }} props — ligne sous le champ (ex. optionnel / SMS).
 */
export default function PhoneField({ iso, phone, onIsoChange, onPhoneChange, hint }) {
  const selected = PHONE_COUNTRIES.find((c) => c.iso === iso) || PHONE_COUNTRIES[0]

  return (
    <div className="text-left">
      <label className="block text-[11px] font-semibold uppercase tracking-wider text-gris mb-1.5">
        Ton téléphone{' '}
        <span className="normal-case tracking-normal font-medium text-gris/45">(optionnel)</span>
      </label>
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="waitlist-country">Pays</label>
        <select
          id="waitlist-country"
          value={selected.iso}
          onChange={(e) => onIsoChange(e.target.value)}
          className="shrink-0 max-w-[42%] sm:max-w-[11.5rem] px-2.5 py-3 md:py-3.5 rounded-xl border border-noir/8 text-sm bg-white/80 focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 transition-all duration-300"
        >
          {PHONE_COUNTRIES.map((c) => (
            <option key={c.iso} value={c.iso}>
              {flagEmoji(c.iso)} {c.name} +{c.dial}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          className="min-w-0 flex-1 px-4 py-3 md:py-3.5 rounded-xl border border-noir/8 text-sm focus:outline-none focus:border-corail focus:ring-2 focus:ring-corail/10 transition-all duration-300 bg-white/80"
          placeholder="06 12 34 56 78"
          aria-label="Numéro de téléphone"
        />
      </div>
      {hint && (
        <p className="text-[12px] text-gris/50 leading-relaxed mt-1.5">{hint}</p>
      )}
    </div>
  )
}
