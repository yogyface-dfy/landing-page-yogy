import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

/* Numérotation interne : art. 10 = garantie, art. 11 = éligibilité (le brouillon Laury les fusionnait en « 11 »). */

export default function CGV() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-[5%]">
      <SEO
        title="Conditions Générales de Vente"
        description="Conditions générales de vente du programme YoGyFace Studio : commande, paiement, rétractation, accès au programme et garantie."
        path="/cgv"
      />
      <div className="max-w-[800px] mx-auto">
        <div className="animate-on-scroll section-badge" data-anim="fade">Légal</div>
        <h1 className="animate-on-scroll font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-4">
          CONDITIONS GÉNÉRALES DE VENTE
        </h1>
        <p className="text-gris text-sm mb-12">YoGyFace Studio — Programme de Yoga du Visage · Mise à jour : septembre 2026</p>

        <div className="space-y-10 text-[15px] text-gris leading-relaxed break-words">
          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 1 — Objet</h2>
            <p>Les présentes CGV régissent l'ensemble des relations contractuelles entre <strong>Laury Anater</strong> (« le Vendeur ») et toute personne souhaitant acquérir le programme numérique de yoga du visage YoGyFace proposé sur <strong>www.yogyface.fr</strong>. Le fait de passer commande implique l'acceptation sans réserve des présentes CGV.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 2 — Présentation des services</h2>
            <p>Le Vendeur propose la vente d'un programme numérique dénommé « YoGyFace Studio », conçu pour accompagner la Cliente dans la pratique du yoga du visage pendant une période de six (6) mois.</p>
            <p className="mt-2">Le programme comprend notamment :</p>
            <ul className="mt-2 space-y-1.5 ml-4 list-disc">
              <li>Un diagnostic initial du visage, permettant d'identifier les différentes problématiques de la Cliente et les axes de travail correspondants ;</li>
              <li>La personnalisation du programme à partir du diagnostic : les problématiques identifiées comme prioritaires par la Cliente sont prises en compte dans l'élaboration du programme. Le diagnostic est analysé et validé avec l'experte du programme spécialisée dans l'analyse du visage afin de déterminer les axes de travail et les exercices les plus adaptés ;</li>
              <li>Une ordonnance beauté YoGyFace personnalisée, élaborée spécifiquement pour la Cliente à partir des données et informations recueillies lors de son diagnostic, et comprenant les recommandations et axes de travail correspondant à son profil ;</li>
              <li>Un accès à une plateforme en ligne, comprenant les vidéos de formation, exercices et contenus nécessaires au suivi du programme personnalisé ;</li>
              <li>Des routines de yoga du visage, adaptées aux problématiques identifiées lors du diagnostic et destinées à être pratiquées régulièrement par la Cliente ;</li>
              <li>Douze (12) séances de coaching en direct (lives), d'une durée de 60 à 90 minutes, réparties sur les six (6) mois du programme ;</li>
              <li>Un service de suivi personnalisé, permettant notamment à la Cliente de transmettre les éléments nécessaires au suivi de son évolution, tels que des informations ou des photos d'évolution, et de recevoir les indications nécessaires dans le cadre du programme ;</li>
              <li>Un accès à une communauté privée ;</li>
              <li>Des supports pédagogiques complémentaires mis à disposition au cours du programme.</li>
            </ul>
            <p className="mt-3">Le programme est personnalisé à partir des informations et problématiques identifiées lors du diagnostic, mais ne constitue pas un accompagnement individuel de type « 1-to-1 ». La personnalisation porte sur la définition des axes de travail, des exercices et des contenus proposés à partir du diagnostic validé avec l'experte. Les séances en direct et le suivi sont proposés dans le cadre du fonctionnement général du programme et ne constituent pas des séances individuelles exclusives avec un coach.</p>
            <p className="mt-3">Le diagnostic initial doit être complété dans un délai de <strong>soixante (60) jours</strong> suivant le début du programme (date d'achat, ou date reportée conformément à l'article 7). L'accès à la plateforme et aux contenus personnalisés est ensuite mis à disposition selon les modalités prévues dans le cadre du programme.</p>
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

          <div id="retractation">
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 6 — Droit de rétractation</h2>
            <p>Conformément aux dispositions du Code de la consommation, la Cliente dispose d'un délai légal de <strong>quatorze (14) jours</strong> à compter de l'achat pour exercer son droit de rétractation, sans avoir à justifier de motif ni à supporter de frais.</p>
            <p className="mt-2">Ce droit s'applique <strong>dans tous les cas</strong> : diagnostic complété ou non, accès à la plateforme fourni ou non, programme commencé ou non. Aucune case de renonciation n'est demandée.</p>
            <p className="mt-2">Au-delà du délai légal de rétractation de quatorze (14) jours, aucun remboursement ne pourra être demandé au titre du droit de rétractation. Toute demande éventuelle de remboursement formulée au-delà de ce délai relève exclusivement des conditions de la garantie prévue aux articles 10 et 11 des présentes CGV et doit respecter l'ensemble des conditions qui y sont définies.</p>
            <p className="mt-2">En cas de situation exceptionnelle invoquée par la Cliente (notamment problème de santé, événement personnel grave ou toute autre circonstance exceptionnelle), celle-ci devra être justifiée par tout document probant permettant d'établir la réalité de la situation invoquée. La seule déclaration de la Cliente ne pourra, à elle seule, être considérée comme suffisante.</p>
            <p className="mt-2">Une pause ou un report du programme (article 7) <strong>ne prolonge pas</strong> ce délai : les 14 jours courent à compter de l'achat, pas de la date de début reportée.</p>
            <p className="mt-2">Pour exercer le droit de rétractation dans le délai légal, la Cliente envoie un e-mail à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a> avant l'expiration du délai, en indiquant ses nom, prénom, e-mail et la date de commande. L'accès au programme est alors coupé. Le Vendeur rembourse l'intégralité des sommes versées (y compris les échéances déjà prélevées en cas de paiement en plusieurs fois) dans un délai de quatorze (14) jours à compter de la réception de la demande, par le même moyen de paiement. Les échéances restantes sont annulées.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 7 — Accès, durée et pause</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Durée totale d'accès :</strong> illimitée</li>
              <li><strong>Période active :</strong> 6 mois à compter du diagnostic, ou de la date de début reportée le cas échéant</li>
              <li><strong>12 séances live :</strong> réparties sur la période active</li>
              <li><strong>Communauté privée :</strong> pendant toute la durée active</li>
            </ul>
            <p className="mt-3">La Cliente peut demander par e-mail à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a> une <strong>pause</strong> ou le <strong>report du début du programme</strong> (par exemple en cas d'accouchement). La durée cumulée de pause et de report est limitée à <strong>deux (2) mois maximum</strong>. La date de début, le délai pour compléter le diagnostic, la période active de 6 mois et le calendrier des coachings sont alors décalés d'autant. Le Vendeur confirme la nouvelle date par e-mail. Cette pause n'a aucun effet sur le délai de rétractation de l'article 6.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 8 — Obligations de la Cliente</h2>
            <p>La Cliente s'engage à : fournir des informations exactes, conserver la confidentialité de ses identifiants, utiliser le programme strictement à titre personnel, ne pas partager, copier ou revendre le contenu, respecter les autres membres de la communauté, les coachs et l'équipe.</p>
            <div className="mt-3 p-4 bg-rose/10 rounded-xl border border-corail/10">
              <p className="text-sm"><span className="font-semibold text-corail">Attention :</span> Toute violation (partage non autorisé, comportement inapproprié) pourra entraîner la suspension immédiate de l'accès sans remboursement et donner lieu à des poursuites judiciaires.</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 9 — Propriété intellectuelle</h2>
            <p>L'ensemble du contenu est la propriété exclusive de <strong>Laury Anater</strong>. La Cliente acquiert uniquement un droit d'accès personnel, non cessible et non transférable. Sont strictement interdits : reproduction, diffusion, enregistrement des sessions Zoom, partage du lien personnel, utilisation commerciale.</p>
          </div>

          <div id="garantie">
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 10 — Garantie</h2>
            <p>La garantie prévue aux présentes ne constitue <strong>pas une garantie de résultat</strong>. L'absence de résultat, à elle seule, ne saurait ouvrir automatiquement droit à un remboursement.</p>
            <p className="mt-2">Toute demande au titre de la garantie ne peut être effectuée qu'<strong>à l'issue des six (6) mois</strong> du programme, sous réserve du respect de l'ensemble des conditions d'éligibilité de l'article 11. Le fait d'avoir suivi les trois (3) premiers mois, ou d'avoir satisfait à certaines conditions avant l'issue des six (6) mois, ne permet pas de solliciter un remboursement de manière anticipée.</p>
            <p className="mt-2">La demande doit être adressée exclusivement à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a>. Examen sous 14 jours ouvrés, remboursement sous 30 jours si toutes les conditions de l'article 11 sont remplies.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 11 — Conditions d'éligibilité à la garantie</h2>
            <p>L'accès à la garantie est soumis au respect cumulatif de l'ensemble des conditions prévues ci-dessous.</p>
            <p className="mt-2">Pour être éligible à la garantie, la Cliente doit :</p>
            <ul className="mt-2 space-y-3 ml-4 list-disc">
              <li>
                <strong>Avoir suivi les trois (3) premiers mois complets du programme.</strong> Cette condition constitue une condition minimale de suivi et ne donne en aucun cas droit à une demande de remboursement à l'issue de ces trois (3) mois.
              </li>
              <li>
                <strong>Être restée active pendant l'intégralité des six (6) mois du programme.</strong> La Cliente doit maintenir une activité régulière sur l'ensemble de la période de six (6) mois, notamment par la connexion à son espace membre, la consultation des contenus mis à disposition et la participation aux différentes actions prévues. L'activité pourra être vérifiée à partir des données enregistrées sur la plateforme (connexions, fréquence d'accès, consultation et lecture des contenus).
              </li>
              <li>
                <strong>Avoir participé à un minimum de douze (12) lives</strong> sur les six (6) mois du programme, à raison de <strong>deux (2) lives minimum par mois</strong>, dont au moins <strong>trois (3) lives FAQ</strong> inclus dans ces douze (12). La participation aux lives doit être répartie de manière régulière sur l'intégralité des six (6) mois. Les participations ne peuvent pas être concentrées sur une période donnée afin de compenser l'absence de participation au cours d'un ou plusieurs autres mois. Lors des lives FAQ, la Cliente doit allumer la caméra pour valider la gestuelle.
              </li>
              <li>
                <strong>Avoir consulté et suivi les contenus du programme</strong> disponibles sur la plateforme. Ces données d'activité peuvent être utilisées afin de vérifier que la Cliente a effectivement suivi le programme et réalisé les actions prévues.
              </li>
              <li>
                <strong>Avoir effectué les six (6) suivis</strong> prévus après le 1er, 2e, 3e, 4e, 5e et 6e mois du programme. La Cliente est tenue de renseigner et de maintenir à jour les éléments nécessaires à son suivi dans les délais communiqués par l'équipe. Ces mises à jour sont indispensables au bon fonctionnement du service d'accompagnement. L'absence d'un ou plusieurs suivis ou les retards répétés peuvent entraîner la perte du bénéfice de la garantie.
              </li>
            </ul>
            <p className="mt-3">Le respect des présentes conditions est apprécié sur l'ensemble de la période concernée. Le non-respect d'une ou plusieurs de ces conditions peut entraîner la perte du bénéfice de la garantie.</p>
            <p className="mt-2">Toute demande au titre de la garantie doit être adressée exclusivement à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a>, conformément aux modalités prévues aux articles 10 et 11. La demande doit être effectuée après que la Cliente a satisfait aux conditions d'ancienneté et de suivi applicables et doit permettre de vérifier le respect de l'ensemble des conditions d'éligibilité.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 12 — Responsabilité & avertissement médical</h2>
            <div className="p-4 bg-rose/10 rounded-xl border border-corail/10">
              <p className="text-noir font-semibold text-sm mb-1">Avertissement important</p>
              <p className="text-sm">Le programme YoGyFace est une méthode de gymnastique faciale et de bien-être. Il ne constitue en aucun cas un acte médical, paramédical ou thérapeutique. Consultation médicale préalable fortement recommandée. Résultats variables selon les individus. La Cliente pratique sous sa propre responsabilité.</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Articles 13-20 — Dispositions générales</h2>
            <ul className="space-y-2 ml-4 list-disc">
              <li><strong>Résiliation et suspension :</strong> Le Vendeur peut suspendre ou retirer l'accès au programme, à la plateforme ou à la communauté, notamment en cas de violation des présentes CGV ou de comportement contraire aux règles du programme.</li>
              <li><strong>Communauté :</strong> L'accès à la communauté est soumis au respect des règles de bonne conduite et de modération. Tout comportement inapproprié, agressif, irrespectueux, harcelant ou portant atteinte au bon fonctionnement de la communauté, à l'égard des autres participantes, des coachs ou de tout membre de l'équipe, peut entraîner l'exclusion de la communauté, sans remboursement.</li>
              <li><strong>Respect des coachs et de l'équipe :</strong> La Cliente s'engage à adopter un comportement respectueux à l'égard des coachs, intervenantes et membres de l'équipe participant au programme. Tout comportement agressif, insultant, menaçant, harcelant ou inapproprié pourra entraîner la suspension ou la résiliation de l'accès au programme, sans remboursement.</li>
              <li><strong>Non-sollicitation des coachs et intervenantes :</strong> Pendant la durée du programme et après son terme, la Cliente s'engage à ne pas solliciter directement, à des fins commerciales ou professionnelles, les coachs ou intervenantes participant au programme en dehors des canaux prévus par le Vendeur, ni à chercher à contourner le Vendeur dans le cadre des services proposés.</li>
              <li><strong>Programmes proposés par les coachs :</strong> Sauf accord exprès du Vendeur ou de la coach concernée, la Cliente s'engage à ne pas solliciter ou souscrire directement auprès d'une coach intervenant dans le programme à une prestation ou un programme proposé par celle-ci, lorsque cette démarche a pour objet de contourner le programme ou le Vendeur.</li>
              <li><strong>Données personnelles :</strong> Conformément au RGPD. Contact : <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a>. Représentant UE (article 27) : DataRep — <a href="mailto:datarequest@datarep.com?subject=YGF%20LLC" className="text-corail hover:underline">datarequest@datarep.com</a> (objet : « YGF LLC »). Détails : <Link to="/confidentialite" className="text-corail hover:underline">Politique de Confidentialité</Link></li>
              <li><strong>Droit applicable :</strong> Droit de l'État du Wyoming (États-Unis). Tribunaux compétents de Sheridan, Wyoming. Les consommatrices résidant dans l'Union européenne conservent le bénéfice des dispositions impératives de protection des consommateurs de leur pays de résidence.</li>
              <li><strong>Réclamation :</strong> Toute réclamation peut être adressée à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a></li>
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
