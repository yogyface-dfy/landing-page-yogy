import SEO from '../components/SEO'

export default function CGV() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-[5%]">
      <SEO
        title="Conditions Générales de Vente"
        description="Conditions générales de vente du programme YoGyFace RESET : commande, paiement, rétractation, accès au programme et garanties."
        path="/cgv"
      />
      <div className="max-w-[800px] mx-auto">
        <div className="animate-on-scroll section-badge" data-anim="fade">Légal</div>
        <h1 className="animate-on-scroll font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-4">
          CONDITIONS GÉNÉRALES DE VENTE
        </h1>
        <p className="text-gris text-sm mb-12">YoGyFace RESET — Programme de Yoga du Visage · Mise à jour : août 2026</p>

        <div className="space-y-10 text-[15px] text-gris leading-relaxed break-words">
          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 1 — Objet</h2>
            <p>Les présentes CGV régissent l'ensemble des relations contractuelles entre <strong>Laury Anater</strong> (« le Vendeur ») et toute personne souhaitant acquérir le programme numérique de yoga du visage YoGyFace proposé sur <strong>www.yogyface.fr</strong>. Le fait de passer commande implique l'acceptation sans réserve des présentes CGV.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 2 — Présentation des services</h2>
            <p>Le programme « YoGyFace Reset » comprend :</p>
            <ul className="mt-2 space-y-1.5 ml-4 list-disc">
              <li>Un accès <strong>illimité</strong> via un lien internet personnel à une plateforme contenant des vidéos personnalisées selon le diagnostic initial</li>
              <li><strong>12 séances de coaching en direct</strong> (live Zoom, 60-90 min), réparties sur 6 mois</li>
              <li>Des routines complètes de yoga du visage adaptées au profil de la Cliente</li>
              <li>Un accès à une communauté privée WhatsApp</li>
              <li>Un suivi personnalisé avec envoi de photos d'évolution</li>
              <li>Des supports pédagogiques complémentaires (guides, fiches techniques)</li>
            </ul>
            <p className="mt-3"><strong>Important :</strong> Le programme étant personnalisé, l'accès à la plateforme sera fourni sous <strong>10 jours ouvrés</strong> après réception du diagnostic. Le diagnostic doit être complété dans les <strong>60 jours suivant l'achat</strong>.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 3 — Prix</h2>
            <p>Les prix sont en euros (€), TTC. Le Vendeur se réserve le droit de modifier ses prix. Les services sont facturés au tarif affiché au moment de la validation. Des facilités de paiement peuvent être proposées.</p>
          </div>

          <div id="offres-vip">
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 3 bis — Bonus de la liste d'attente (ventes privées VIP)</h2>
            <p>Les personnes inscrites sur la liste d'attente du lancement peuvent se voir proposer, à titre commercial, les bonus suivants : 6 heures de coaching offertes, 6 mois d'accompagnement offerts, et un diagnostic complet offert.</p>
            <p className="mt-2">Ces bonus sont accordés <strong>uniquement à condition de rejoindre le programme lors des ventes privées VIP</strong>. Ils ne sont ni dus, ni transférables, ni exigibles en cas d'inscription au programme en dehors de cette période (lancement public ou toute offre ultérieure). Le Vendeur se réserve le droit d'en préciser les modalités dans l'offre de vente privée.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 4 — Commande et validation</h2>
            <p>Commande via le site : sélection du programme, renseignement des informations, choix du paiement, acceptation des CGV, paiement sécurisé (Stripe, Klarna ou PayPal). Toute commande validée et payée est définitive.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 5 — Modalités de paiement</h2>
            <p>Paiement sécurisé via Stripe ou PayPal. Carte bancaire (Visa, Mastercard, Amex), PayPal, paiement en plusieurs fois (si disponible). Une offre complémentaire peut être proposée immédiatement après le paiement (prélèvement sur le moyen déjà enregistré, sans nouvelle saisie). Le Vendeur ne conserve aucune donnée bancaire. Toutes les transactions sont conformes aux normes PCI-DSS.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 6 — Droit de rétractation</h2>
            <p>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques fournis immédiatement. En passant commande, la Cliente accepte que le diagnostic lui soit fourni immédiatement et <strong>renonce à son droit de rétractation de 14 jours</strong>.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 7 — Accès et durée</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Durée totale d'accès :</strong> illimitée</li>
              <li><strong>Période active :</strong> 6 mois à compter du diagnostic</li>
              <li><strong>12 séances live :</strong> réparties sur la période active</li>
              <li><strong>Groupe WhatsApp :</strong> pendant toute la durée active</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 8 — Obligations de la Cliente</h2>
            <p>La Cliente s'engage à : fournir des informations exactes, conserver la confidentialité de ses identifiants, utiliser le programme strictement à titre personnel, ne pas partager, copier ou revendre le contenu, respecter les autres membres de la communauté.</p>
            <div className="mt-3 p-4 bg-rose/10 rounded-xl border border-corail/10">
              <p className="text-sm"><span className="font-semibold text-corail">Attention :</span> Toute violation (partage non autorisé, comportement inapproprié) pourra entraîner la suspension immédiate de l'accès sans remboursement et donner lieu à des poursuites judiciaires.</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 9 — Propriété intellectuelle</h2>
            <p>L'ensemble du contenu est la propriété exclusive de <strong>Laury Anater</strong>. La Cliente acquiert uniquement un droit d'accès personnel, non cessible et non transférable. Sont strictement interdits : reproduction, diffusion, enregistrement des sessions Zoom, partage du lien personnel, utilisation commerciale.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 10 — Garantie de résultats</h2>
            <p>Garantie de 6 mois, sous réserve du respect de <strong>toutes</strong> les conditions cumulatives :</p>
            <ul className="mt-2 space-y-1.5 ml-4 list-disc">
              <li>Présence à 100% des coachings (12 séances)</li>
              <li>Pratique minimum 5 fois/semaine pendant 5 mois consécutifs</li>
              <li>Envoi de 4 séries de photos d'évolution (1, 2, 4, 6 mois)</li>
              <li>Minimum 5 interactions dans la communauté</li>
              <li>Formalisation écrite des objectifs</li>
              <li>Respect des recommandations et contre-indications</li>
              <li>Pas d'interventions esthétiques lourdes pendant le programme</li>
            </ul>
            <p className="mt-2">Demande entre le 180e et le 190e jour par email à contact@yogyface.fr. Examen sous 14 jours ouvrés, remboursement sous 30 jours si toutes les conditions sont remplies.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 11 — Responsabilité & avertissement médical</h2>
            <div className="p-4 bg-rose/10 rounded-xl border border-corail/10">
              <p className="text-noir font-semibold text-sm mb-1">Avertissement important</p>
              <p className="text-sm">Le programme YoGyFace est une méthode de gymnastique faciale et de bien-être. Il ne constitue en aucun cas un acte médical, paramédical ou thérapeutique. Consultation médicale préalable fortement recommandée. Résultats variables selon les individus. La Cliente pratique sous sa propre responsabilité.</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Articles 12-20 — Dispositions générales</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Résiliation :</strong> Le Vendeur peut suspendre l'accès sans préavis en cas de violation des CGV</li>
              <li><strong>Communauté WhatsApp :</strong> Accès soumis à modération, retrait possible sans remboursement en cas de comportement inapproprié</li>
              <li><strong>Données personnelles :</strong> Conformément au RGPD. Contact : contact@yogyface.fr</li>
              <li><strong>Droit applicable :</strong> Droit français. Tribunaux français compétents</li>
              <li><strong>Réclamation :</strong> contact@yogyface.fr</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-noir/8">
            <p className="text-gris/50 text-xs">© 2026 — Laury Anater — YoGyFace · YGF LLC · Tous droits réservés</p>
          </div>
        </div>
      </div>
    </section>
  )
}
