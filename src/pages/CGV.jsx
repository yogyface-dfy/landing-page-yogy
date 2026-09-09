import { Link } from 'react-router-dom'
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
        <p className="text-gris text-sm mb-12">YoGyFace RESET — Programme de Yoga du Visage · Mise à jour : septembre 2026</p>

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
            <p className="mt-3"><strong>Important :</strong> Le programme étant personnalisé, l'accès à la plateforme sera fourni sous <strong>10 jours ouvrés</strong> après réception du diagnostic. Le diagnostic doit être complété dans les <strong>60 jours suivant la date de début du programme</strong> (date d'achat, ou date reportée conformément à l'article 7).</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 3 — Prix</h2>
            <p>Les prix sont en euros (€), TTC. Le Vendeur se réserve le droit de modifier ses prix. Les services sont facturés au tarif affiché au moment de la validation. Des facilités de paiement peuvent être proposées.</p>
          </div>

          <div id="offres-vip">
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 3 bis — Bonus des ventes privées V2</h2>
            <p>Dans le cadre des <strong>ventes privées de la V2</strong> du programme YoGyFace, les bonus suivants peuvent être proposés à titre commercial : 6 heures de coaching offertes, 6 mois d'accompagnement offerts, et un diagnostic complet offert.</p>
            <p className="mt-2">Ces bonus sont accordés <strong>uniquement à l'issue d'un achat effectué pendant les ventes privées de la V2</strong>. L'inscription à la liste d'attente ne les rend ni dus, ni exigibles. Ils ne sont ni transférables, ni accordés en cas d'inscription au programme en dehors de cette période (lancement public ou toute offre ultérieure). Le Vendeur se réserve le droit d'en préciser les modalités dans l'offre de vente privée.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 4 — Commande et validation</h2>
            <p>Commande via le site : sélection du programme, renseignement des informations, choix du paiement, acceptation des CGV, paiement sécurisé (Stripe, Klarna ou PayPal). Toute commande validée et payée est ferme, sous réserve du droit de rétractation prévu à l'article 6.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 5 — Modalités de paiement</h2>
            <p>Paiement sécurisé via Stripe ou PayPal. Carte bancaire (Visa, Mastercard, Amex), PayPal, paiement en plusieurs fois (si disponible). Une offre complémentaire peut être proposée immédiatement après le paiement (prélèvement sur le moyen déjà enregistré, sans nouvelle saisie). Le Vendeur ne conserve aucune donnée bancaire. Toutes les transactions sont conformes aux normes PCI-DSS.</p>
          </div>

          {/* 14 jours post-achat, dans tous les cas — pas de renonciation L. 221-28. */}
          <div id="retractation">
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 6 — Droit de rétractation</h2>
            <p>La Cliente dispose d'un délai de <strong>quatorze (14) jours</strong> calendaires à compter de la date de paiement pour exercer son droit de rétractation, sans avoir à motiver sa décision, conformément à l'article L. 221-18 du Code de la consommation.</p>
            <p className="mt-2">Ce droit s'applique <strong>dans tous les cas</strong> : diagnostic complété ou non, accès à la plateforme fourni ou non, programme commencé ou non. Aucune case de renonciation n'est demandée.</p>
            <p className="mt-2">Un report du début du programme (article 7) <strong>ne prolonge pas</strong> ce délai : les 14 jours courent à compter de l'achat, pas de la date de début reportée.</p>
            <p className="mt-2">Pour l'exercer, la Cliente envoie un e-mail à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a> avant l'expiration du délai, en indiquant ses nom, prénom, e-mail et la date de commande. L'accès au programme est alors coupé. Le Vendeur rembourse l'intégralité des sommes versées (y compris les échéances déjà prélevées en cas de paiement en plusieurs fois) dans un délai de quatorze (14) jours à compter de la réception de la demande, par le même moyen de paiement. Les échéances restantes sont annulées.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 7 — Accès et durée</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Durée totale d'accès :</strong> illimitée</li>
              <li><strong>Période active :</strong> 6 mois à compter du diagnostic, ou de la date de début reportée le cas échéant</li>
              <li><strong>12 séances live :</strong> réparties sur la période active</li>
              <li><strong>Groupe WhatsApp :</strong> pendant toute la durée active</li>
            </ul>
            <p className="mt-3">La Cliente peut demander par e-mail à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a> le <strong>report du début du programme</strong> (par exemple en cas d'accouchement). La date de début, le délai de 60 jours pour compléter le diagnostic, la période active de 6 mois et le calendrier des coachings sont alors décalés d'autant. Le Vendeur confirme la nouvelle date par e-mail. Ce report n'a aucun effet sur le délai de rétractation de l'article 6.</p>
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

          <div id="garantie">
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 10 — Garantie de résultats ou remboursé</h2>
            <p>Il ne s'agit pas d'une garantie « satisfait ou remboursé ». Si, à l'issue de la période active, la Cliente n'observe aucun résultat malgré le respect de <strong>toutes</strong> les conditions cumulatives, le Vendeur rembourse le programme :</p>
            <ul className="mt-2 space-y-1.5 ml-4 list-disc">
              <li>Présence à 100% des coachings (12 séances)</li>
              <li>Pratique minimum 5 fois/semaine pendant 5 mois consécutifs</li>
              <li>Envoi de 4 séries de photos d'évolution (1, 2, 4, 6 mois)</li>
              <li>Minimum 5 interactions dans la communauté</li>
              <li>Formalisation écrite des objectifs</li>
              <li>Respect des recommandations et contre-indications</li>
              <li>Pas d'interventions esthétiques lourdes pendant le programme</li>
            </ul>
            <p className="mt-2">Demande entre le 180e et le 190e jour à compter du début de la période active, par email à contact@yogyface.fr. Examen sous 14 jours ouvrés, remboursement sous 30 jours si toutes les conditions sont remplies.</p>
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
              <li><strong>Données personnelles :</strong> Conformément au RGPD. Contact : contact@yogyface.fr. Représentant UE (art. 27) : DataRep — <a href="mailto:datarequest@datarep.com?subject=YGF%20LLC" className="text-corail hover:underline">datarequest@datarep.com</a> (objet : « YGF LLC »). Détails : <Link to="/confidentialite" className="text-corail hover:underline">Politique de Confidentialité</Link></li>
              <li><strong>Droit applicable :</strong> Droit de l'État du Wyoming (États-Unis). Tribunaux compétents de Sheridan, Wyoming. Les consommatrices résidant dans l'Union européenne conservent le bénéfice des dispositions impératives de protection des consommateurs de leur pays de résidence.</li>
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
