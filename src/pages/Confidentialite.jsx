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
        <p className="text-gris text-sm mb-12">Mise à jour : août 2026</p>

        <div className="space-y-10 text-[15px] text-gris leading-relaxed break-words">
          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 1 — Responsable du traitement</h2>
            <ul className="space-y-1 ml-4 list-disc">
              <li><strong>Nom :</strong> Laury Anater</li>
              <li><strong>Société :</strong> YGF LLC (Limited Liability Company)</li>
              <li><strong>Siège :</strong> 30 N Gould St Ste R, Sheridan, WY 82801-6317, États-Unis</li>
              <li><strong>Email :</strong> contact@yogyface.fr</li>
              <li><strong>Sites et services concernés :</strong> yogyface.fr (site de présentation), www.yogyface.fr (pages d'inscription) et webi.yogyface.fr (application du parcours et de l'atelier)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 2 — Données collectées</h2>
            <h3 className="font-semibold text-noir text-sm mt-3 mb-2">Automatiquement :</h3>
            <p>Adresse IP, navigateur, pages consultées, durée de visite, provenance, géolocalisation approximative.</p>
            <h3 className="font-semibold text-noir text-sm mt-3 mb-2">Lors de l'inscription/commande :</h3>
            <p>Nom, prénom, email, téléphone, données de paiement (traitées par Stripe, Klarna ou PayPal — nous ne conservons jamais vos données bancaires).</p>
            <h3 className="font-semibold text-noir text-sm mt-3 mb-2">Dans le cadre du parcours et de l'atelier (application webi.yogyface.fr) :</h3>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Vos réponses aux missions :</strong> âge, préoccupations concernant votre visage, type de peau, habitudes de vie, position et qualité de sommeil, niveau de stress, motivation, ainsi que les notes personnelles que vous rédigez librement.</li>
              <li><strong>Votre progression :</strong> missions terminées, score, contenus consultés, temps de visionnage des vidéos, présence et durée de participation à l'atelier en direct.</li>
              <li><strong>L'origine de votre inscription :</strong> campagne publicitaire, source et support ayant conduit à votre venue sur le site.</li>
              <li><strong>Des données techniques :</strong> adresse IP, navigateur, type d'appareil, abonnement aux notifications si vous l'activez.</li>
            </ul>
            <div className="mt-3 p-4 bg-rose/10 rounded-xl border border-corail/10">
              <p className="text-sm"><strong>Données relatives à votre bien-être physique.</strong> Certaines missions vous demandent si vous ressentez une gêne ou une douleur en réalisant un exercice, ainsi que votre niveau de stress et la qualité de votre sommeil. Ces informations servent <strong>uniquement</strong> à adapter les exercices proposés et à vous orienter vers les explications appropriées lorsqu'une gêne est signalée. Elles ne sont utilisées à aucune autre fin, ne sont jamais transmises à des tiers et ne font l'objet d'aucun ciblage publicitaire. Vous pouvez poursuivre le parcours sans les renseigner, et en demander la suppression à tout moment.</p>
            </div>
            <h3 className="font-semibold text-noir text-sm mt-3 mb-2">Dans le cadre du programme de coaching (avec votre consentement) :</h3>
            <p>Diagnostic personnalisé, photos d'évolution, journal de pratique, échanges avec la coach.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 3 — Finalités du traitement</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Exécution du contrat :</strong> commandes, compte client, plateforme, coaching, WhatsApp, paiements</li>
              <li><strong>Personnalisation :</strong> programme sur-mesure, suivi de progression, conseils adaptés</li>
              <li><strong>Amélioration :</strong> analyse d'utilisation, satisfaction client, statistiques anonymisées</li>
              <li><strong>Communications commerciales :</strong> newsletters, offres (avec votre consentement — désinscription possible à tout moment)</li>
              <li><strong>Obligations légales :</strong> facturation 10 ans, demandes d'autorités</li>
              <li><strong>Mesure publicitaire :</strong> évaluer l'efficacité de nos campagnes et éviter de diffuser des publicités devenues sans objet (avec votre consentement)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 4 — Base légale</h2>
            <p>Exécution du contrat, consentement explicite (photos, diagnostic, données de bien-être physique), consentement (communications, mesure publicitaire), intérêt légitime (amélioration, sécurité), obligation légale (facturation).</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 5 — Destinataires</h2>
            <p><strong>Nous ne vendons, ne louons et ne partageons jamais vos données avec des tiers à des fins commerciales.</strong> Vos données sont accessibles à nos seuls prestataires techniques, tous liés par un contrat de sous-traitance conforme à l'article 28 du RGPD :</p>
            <ul className="mt-2 space-y-1.5 ml-4 list-disc">
              <li><strong>Hébergement de l'application :</strong> Railway (États-Unis)</li>
              <li><strong>Base de données :</strong> Supabase (Irlande, Union européenne)</li>
              <li><strong>Outil de suivi client (CRM) :</strong> Airtable (États-Unis)</li>
              <li><strong>Envoi des e-mails :</strong> Resend (Irlande, Union européenne)</li>
              <li><strong>Automatisations :</strong> Make (Union européenne)</li>
              <li><strong>Diffusion des vidéos :</strong> Amazon CloudFront</li>
              <li><strong>Lecture des vidéos de l'atelier :</strong> YouTube (Google Ireland Ltd.), en mode sans cookie</li>
              <li><strong>Mesure d'audience :</strong> PostHog (Union européenne), DataFast</li>
              <li><strong>Mesure publicitaire :</strong> Meta Platforms Ireland Ltd. (application du parcours)</li>
              <li><strong>Visioconférence :</strong> Zoom — <strong>Messagerie de groupe :</strong> WhatsApp</li>
              <li><strong>Paiement :</strong> Stripe, Klarna, PayPal (nous ne conservons aucune donnée bancaire)</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 6 — Transferts hors UE</h2>
            <p>YGF LLC est établie aux États-Unis, et certains de nos prestataires y sont également établis (notamment Railway, Airtable, Meta, Stripe, PayPal, Zoom, WhatsApp). Vos données font donc l'objet de transferts hors de l'Union européenne.</p>
            <p className="mt-2">Ces transferts sont encadrés soit par le <strong>cadre de protection des données UE–États-Unis</strong> (EU–US Data Privacy Framework) lorsque le prestataire y est certifié, soit par les <strong>clauses contractuelles types</strong> adoptées par la Commission européenne, complétées le cas échéant par des mesures techniques supplémentaires. Nos bases de données (Supabase), l'envoi d'e-mails (Resend), la mesure d'audience (PostHog) et les automatisations (Make) sont hébergés dans l'Union européenne. Certains de ces prestataires étant des sociétés de droit américain, ces traitements restent couverts par les garanties décrites ci-dessus.</p>
            <p className="mt-2">Vous pouvez obtenir une copie de ces garanties en écrivant à <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a>.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 7 — Durée de conservation</h2>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li><strong>Données programme :</strong> durée du programme + 3 ans max après dernier contact</li>
              <li><strong>Facturation :</strong> 10 ans (obligations fiscales)</li>
              <li><strong>Photos d'évolution :</strong> durée du programme + 3 ans (sauf demande de suppression)</li>
              <li><strong>Navigation :</strong> 13 mois maximum</li>
              <li><strong>Journal d'utilisation</strong> (progression, visionnage, présence) : 25 mois à compter de l'événement, puis suppression ou anonymisation</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 8 — Sécurité</h2>
            <p>HTTPS, chiffrement, sauvegardes régulières, pare-feu, accès restreint, traçabilité, mises à jour de sécurité.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 9 — Cookies & mesure d'audience</h2>
            <h3 className="font-semibold text-noir text-sm mt-1 mb-2">Site vitrine (yogyface.fr) :</h3>
            <p>Seuls des cookies strictement nécessaires au fonctionnement technique du site sont déposés sans votre accord (session, sécurité). Le site vitrine <strong>n'utilise aucun cookie publicitaire ni de marketing</strong>.</p>
            <p className="mt-2">Nous utilisons <strong>DataFast</strong> pour la mesure d'audience et l'attribution marketing (pages vues, parcours). Sans votre accord, il fonctionne <strong>sans cookie</strong> (identifiant de session uniquement). Si vous acceptez, DataFast dépose des cookies pour reconnaître vos visites suivantes.</p>
            <p className="mt-2">Nous utilisons aussi <strong>PostHog</strong>, hébergé dans l'Union européenne, pour un suivi plus détaillé. Ces cookies ne sont déposés <strong>qu'après votre consentement</strong>, recueilli via la bannière affichée à votre première visite. Vous pouvez refuser sans conséquence sur votre navigation.</p>
            {/* Section webi : on décrit factuellement le pixel Meta (obligation de
                transparence, art. 13), SANS énoncer le moment de déclenchement ni de
                promesse de consentement. Repasser en version "conforme" (traceurs
                activés après consentement) une fois la bannière non-bloquante en place
                côté app — cf. docs/consentement-meta-webi.md. */}
            <h3 className="font-semibold text-noir text-sm mt-4 mb-2">Application du parcours (webi.yogyface.fr) :</h3>
            <p>L'application utilise également le <strong>pixel Meta</strong> et la <strong>Conversions API de Meta</strong> afin de mesurer l'efficacité de nos campagnes publicitaires. Ces traceurs déposent les cookies « _fbp » et « _fbc » et transmettent à Meta Platforms Ireland Ltd. votre adresse e-mail, votre numéro de téléphone et votre prénom sous forme <strong>hachée</strong> (SHA-256, non réversible en pratique), ainsi que votre adresse IP et votre navigateur.</p>
            <p className="mt-2">Vous pouvez vous opposer à ces traceurs via les réglages de votre navigateur et de votre appareil, ainsi que depuis vos préférences publicitaires Meta. Un stockage local technique (« yf_token ») conserve votre session de connexion : il est nécessaire au fonctionnement du service et ne sert à aucune finalité publicitaire.</p>
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
            <p className="text-gris/50 text-xs">© 2026 — Laury Anater — YoGyFace · YGF LLC · Tous droits réservés</p>
          </div>
        </div>
      </div>
    </section>
  )
}
