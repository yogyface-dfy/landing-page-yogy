import SEO from '../components/SEO'

export default function Confidentialite() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-[5%]">
      <SEO
        title="Politique de Confidentialité"
        description="Politique de confidentialité YoGyFace : collecte, utilisation et protection de vos données personnelles, droits RGPD et cookies."
        path="/confidentialite"
      />
      <div className="max-w-[800px] mx-auto">
        <div className="animate-on-scroll section-badge" data-anim="fade">Légal</div>
        <h1 className="animate-on-scroll font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-4">
          POLITIQUE DE CONFIDENTIALITÉ
        </h1>
        <p className="text-gris text-sm mb-12">Mise à jour : juin 2026</p>

        <div className="space-y-10 text-[15px] text-gris leading-relaxed break-words">
          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 1 — Responsable du traitement</h2>
            <ul className="space-y-1 ml-4 list-disc">
              <li><strong>Nom :</strong> Laury Anater</li>
              <li><strong>Société :</strong> TRACKS CONSULTANCY - F.Z.C (Trade Licence 44373)</li>
              <li><strong>Siège :</strong> Dubaï, Émirats Arabes Unis</li>
              <li><strong>Email :</strong> contact@yogyface.fr</li>
              <li><strong>Site :</strong> <a href="https://www.yogyface.fr" className="text-corail hover:underline">www.yogyface.fr</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 2 — Données collectées</h2>
            <h3 className="font-semibold text-noir text-sm mt-3 mb-2">Automatiquement :</h3>
            <p>Adresse IP, navigateur, pages consultées, durée de visite, provenance, géolocalisation approximative.</p>
            <h3 className="font-semibold text-noir text-sm mt-3 mb-2">Lors de l'inscription/commande :</h3>
            <p>Nom, prénom, email, téléphone, données de paiement (traitées par Stripe, Klarna ou PayPal — nous ne conservons jamais vos données bancaires).</p>
            <h3 className="font-semibold text-noir text-sm mt-3 mb-2">Dans le cadre du programme (avec consentement) :</h3>
            <p>Diagnostic personnalisé, photos d'évolution, journal de pratique, données de participation, échanges avec le coach.</p>
            <div className="mt-3 p-4 bg-rose/10 rounded-xl border border-corail/10">
              <p className="text-sm"><strong>Important :</strong> Aucune donnée sensible n'est collectée sans votre consentement explicite. Ces données ne sont jamais partagées avec des tiers.</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 3 — Finalités du traitement</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Exécution du contrat :</strong> commandes, compte client, plateforme, coaching, WhatsApp, paiements</li>
              <li><strong>Personnalisation :</strong> programme sur-mesure, suivi de progression, conseils adaptés</li>
              <li><strong>Amélioration :</strong> analyse d'utilisation, satisfaction client, statistiques anonymisées</li>
              <li><strong>Communications commerciales :</strong> newsletters, offres (avec votre consentement — désinscription possible à tout moment)</li>
              <li><strong>Obligations légales :</strong> facturation 10 ans, demandes d'autorités</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 4 — Base légale</h2>
            <p>Exécution du contrat, consentement (photos, diagnostic, communications), intérêt légitime (amélioration, sécurité), obligation légale (facturation).</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 5 — Destinataires</h2>
            <p><strong>Nous ne vendons, ne louons et ne partageons jamais vos données avec des tiers à des fins commerciales.</strong></p>
            <p className="mt-2">Prestataires techniques uniquement : hébergeur (Railway), outil de mesure d'audience (PostHog, serveurs dans l'Union européenne), outil d'emailing, Zoom, WhatsApp. Tous contractuellement engagés au RGPD.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 6 — Transferts hors UE</h2>
            <p>Certains prestataires (Stripe, PayPal, Zoom, WhatsApp) peuvent transférer des données hors UE. Garanties : clauses contractuelles types, certification Privacy Shield ou décision d'adéquation.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 7 — Durée de conservation</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Données programme :</strong> durée du programme + 3 ans max après dernier contact</li>
              <li><strong>Facturation :</strong> 10 ans (obligations fiscales)</li>
              <li><strong>Photos d'évolution :</strong> durée du programme + 3 ans (sauf demande de suppression)</li>
              <li><strong>Navigation :</strong> 13 mois maximum</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 8 — Sécurité</h2>
            <p>HTTPS, chiffrement, sauvegardes régulières, pare-feu, accès restreint, traçabilité, mises à jour de sécurité.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 9 — Cookies & mesure d'audience</h2>
            <p>Ce site n'utilise <strong>aucun cookie publicitaire ni de marketing</strong>. Seuls des cookies strictement nécessaires au fonctionnement technique du site peuvent être utilisés (session, sécurité).</p>
            <p className="mt-2">Nous utilisons un outil de <strong>mesure d'audience (PostHog)</strong>, hébergé dans l'Union européenne, pour comprendre l'usage du site et l'améliorer (pages vues, parcours de navigation). Ces cookies ne sont déposés <strong>qu'après votre consentement</strong>, recueilli via la bannière affichée à votre première visite. Vous pouvez refuser sans conséquence sur votre navigation, et aucune donnée n'est utilisée à des fins publicitaires.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 10 — Vos droits RGPD</h2>
            <p>Vous disposez des droits suivants :</p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li><strong>Accès</strong> — obtenir confirmation du traitement</li>
              <li><strong>Rectification</strong> — corriger des données inexactes</li>
              <li><strong>Effacement</strong> — « droit à l'oubli »</li>
              <li><strong>Limitation</strong> — limiter le traitement</li>
              <li><strong>Opposition</strong> — vous opposer pour motifs légitimes</li>
              <li><strong>Portabilité</strong> — recevoir vos données en format structuré</li>
              <li><strong>Retrait du consentement</strong> — à tout moment</li>
            </ul>
            <p className="mt-3">Pour exercer vos droits : <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a> (réponse sous 1 mois max).</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 11 — Réclamation CNIL</h2>
            <p>Commission Nationale de l'Informatique et des Libertés — 3 Place de Fontenoy, 75334 Paris CEDEX 07 — <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-corail hover:underline">www.cnil.fr</a></p>
          </div>

          <div className="pt-6 border-t border-noir/8">
            <p className="text-gris/50 text-xs">© 2026 — Laury Anater — YoGyFace · TRACKS CONSULTANCY - F.Z.C · Trade Licence 44373 · Tous droits réservés</p>
          </div>
        </div>
      </div>
    </section>
  )
}
