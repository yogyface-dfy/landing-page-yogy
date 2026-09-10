# Changelog

## 2026-09-11

### ✨ Added

- **Mail 10 (ouverture VIP)** : template AC `emails/launch/final/email10-ouverture-vip.html` — CTA `/vente-vip`, visuels mail-4 + mail-2-programme + `mail-10-diagnostic.jpg`.

### 🔧 Changed

- **CGV art. 6** : 14 jours dans tous les cas, pas de renonciation (pas de case au checkout). Situations exceptionnelles laissées vagues.
- **CGV art. 11** : 12 lives, 2 par mois mini, dont 3 FAQ inclus dans les 12.
- **`/vente-vip` comparatif** : colonne « Après lancement » retirée ; ligne Programme sous Diagnostic (2e programme offert à 6 mois). Prix VIP : 299 € en vert, 499 € barré.

## 2026-09-10

### 🔧 Changed

- **CGV** : art. 2 (Studio, contenus, pas de 1-to-1), art. 6 (rétractation 14 j.), art. 7 (pause / report 2 mois max), art. 10–11 (garantie hors résultat, éligibilité lives / suivis / activité), art. 13–20 (communauté, coachs, non-sollicitation). Demandes garantie : `contact@yogyface.fr`.
- **Vente** : « Garantie de résultats » → « Garantie (sous conditions CGV) ».

## 2026-09-09

### ✨ Added

- **Mail 9 (J-1 VIP)** : template AC `emails/launch/final/email9-j1.html` — logo Studio + mockup exercices (`mail-2-programme.jpg`). Pas de CTA.
- **Mail 8 (Studio VIP)** : template AC `emails/launch/final/email8-studio.html` — lives, 3 coachs, 6 expertes, bonus VIP. Visuels `mail-8-*.jpg` + GIF Alexis. Pas de CTA. Logo officiel `yogyface STUDIO` recadré, pleine largeur.

### 🐛 Fixed

- **Logo Studio (mails 8 et 9)** : fond noir viré sans halo, PNG opaque blanc à l'URL déjà collée dans AC (`mail-8-logo-yogystudio.png?v=5`).

### 🔧 Changed

- **Liste d'attente** : rouverte (`WAITLIST_OPEN`). Formulaire `/liste-attente` et inscription auto (`/merci-liste-attente?email=` / `/liste-attente?email=`).
- **Liste d'attente** : aucun accès à `/vente` ni `/vente-vip` depuis `/liste-attente` et `/merci-liste-attente`. Page fermée : logo seul, pas de nav/footer/ticker, uniquement « Retour à l'accueil ».

## 2026-09-08

### 🔧 Changed

- **`/vente` (Studio)** : tarif 499 €, paiement 1× 499 € / 4× 124,99 € / 6× 83,99 € / 10× 49,99 €. Nom d'offre Studio (la méthode RESET™ inchangée). VIP (`/vente-vip`, 299 €) intact.
- **Liste d'attente** : fermée (`WAITLIST_OPEN`). Formulaire et inscription auto (lien email `/merci-liste-attente?email=`) coupés. Page « liste fermée ».

## 2026-09-07

### 🔧 Changed

- **CGV art. 10 (garantie)** : retour à « présence à 100 % des 12 séances » — la règle « au moins 2 coachings par mois » est mise de côté pour plus tard.
- **Droit applicable** : droit français / tribunaux français → droit du Wyoming et tribunaux de Sheridan (YGF LLC), avec réserve des dispositions impératives UE pour les consommatrices.
- **CGV art. 6 (rétractation)** : 14 jours à compter de l'achat, dans tous les cas (programme commencé ou non), sans case de renonciation. Un report du début (art. 7) ne prolonge pas ce délai. Art. 4 : commande ferme sous réserve de l'art. 6.
- **CGV art. 7** : report du début du programme sur demande (ex. accouchement) — diagnostic 60 jours, période active et coachings décalés d'autant. Garantie art. 10 : 180e–190e jour à compter du début de la période active.

### ✨ Added

- **Représentant UE (art. 27 RGPD)** : DataRep (Data Protection Representative Limited, Dublin) ajouté comme représentant de YGF LLC — article 1 bis de la politique de confidentialité, mention dans les mentions légales et les CGV.

## 2026-09-05

### ✨ Added

- **Mail 4 chauffe (seg. 1, 2 et 3)** : template AC `emails/launch/final/email4-chauffe-segment1-2-3.html` — visite espace YoGyFace 2.0, composites desktop+mobile (`mail-4-suivi.jpg`, `mail-4-coaching.jpg`, `mail-4-skincare.jpg`, `mail-4-messagerie.jpg`), exercices encore en `/app/desktop-exercices.png`, pas de CTA.
- **Mail 7 (dernier VIP)** : template AC `emails/launch/final/email7-dernier-vip.html` — fermeture liste, 50 places, comparatif sans prix (`mail-4-vip-compare.jpg`), 2 boutons corail.
- **Mail 5 (seg. 1, 2 et 3)** : template AC `emails/launch/final/email5-segment1-2-3.html` — dernier jour liste VIP, Virginie + Christel (`mail-5-virginie.jpg`, `mail-5-christel.jpg`), mockup programme (`mail-2-programme.jpg`) après la liste, 2 boutons corail. Envoi prévu 6 sept. 7h.

## 2026-09-04

### ✨ Added

- **Mail 6 (seg. 1 et 2)** : template AC `emails/launch/final/email6-segment1-2.html` — analogie matelas (`mail-6-analogie-matelas.jpg`), 2 boutons `JE REJOINS LES VIP`, signature Laury.
- **Mail 5 (seg. 1 et 2)** : template AC `emails/launch/final/email5-segment1-2.html` — muscles / 5 ans, bouton corail `JE M'INSCRIS SUR LA LISTE VIP`, signature Laury.
- **Mail 3** : 3 avant/après ovale / profil (`mail-3-ovale-1.jpg` à `mail-3-ovale-3.jpg`) juste après « ça change le visage ».
- **Mail 3** : bouton corail liste d'attente `merci-liste-attente?email=%EMAIL%`.
- **Mail 2 (chauffe VIP)** : template AC `emails/launch/final/email2-chauffevip.html` — déroulé 3 mois (diagnostic, S1–4, S5–8, S9–12), suivi + bonus VIP, 3 avant/après (Peggy 1 mois, Marie-Laure 2 mois, Emmanuelle 3 mois), signature Laury. Pas de CTA dans le copy.

### 📚 Documentation

- **Règle emails AC** : formatage gras/souligné/italique (cadre mails 2–4) + correction auto des vraies fautes (YoGyFace, bien-être, ponctuation) ; oral et phrases bancales intacts.

### 🔧 Changed

- **Tunnel /vente et /vente-vip** : header logo seul (plus de liens), footer retiré. CGV et mailto conservés.
- **Trustpilot** : mentions, widgets et liens masqués (flag `SHOW_TRUSTPILOT` dans `src/lib/trustpilot.js`) — le code reste en place pour réactivation.

## 2026-09-03

### ✨ Added

- **Mail 4 (VIP)** : template AC `emails/launch/final/email4-vip.html` — avantages liste VIP, comparatif (`mail-4-vip-compare.jpg`, sans prix / sans colonne après lancement), signature Laury. Pas de CTA dans le copy.
- **Mail 3 (seg. 1, 2 et 3)** : template AC `emails/launch/final/email3-segment1-2-3.html` — fond blanc, logo, 5 témoignages WhatsApp (`mail-3-*.jpg`), signature Laury. Pas de CTA dans le copy.
- **Mail 2 (seg. 1 et 2)** : template AC `emails/launch/final/email2-segment1-2.html` — fond blanc, logo, avant/après (`/email/launch/mail-2-*.jpg`), CTA `merci-liste-attente?email=%EMAIL%`.
- **Mail 2 (seg. 3)** : template AC `emails/launch/final/email2-segment3.html` — déroulé 3 étapes, liste d'accès, mockup programme (`mail-2-programme.jpg`), garantie, signature Laury. Pas de CTA dans le copy.

### 🚀 Improved

- **Mail 2** : CTA en boutons corail ; gras / souligné sur les phrases clés (copy inchangé).
- **Mail 2** : fautes corrigées (appris, a pu, d'attente, exclusifs, etc.) — ton oral conservé.
- **Mail 2** : portraits Laetitia / Valentine / Viera en 3 colonnes sous les mentions des coachs.
- **Signature emails** : icône profil YoGyFace à côté de Laury (`/email/launch/signature-laury.jpg`) sur les templates live.
- **Signature emails** : fond blanc autour du cercle (plus de coins noirs sur le mail).

## 2026-09-02

### ✨ Added

- **DataFast Bot traffic** : middleware Express `@datafast/ai-crawl` (crawlers AI / search / training). Origine forcée `yogyface.fr` derrière Railway.

## 2026-09-01

### ✨ Added

- **Merci liste d'attente** : petite animation feux d'artifice au hero (couleurs YoGyFace, ignorée si `prefers-reduced-motion`) — 5 éclatements.
- **DataFast revenue** : `datafast_visitor_id` / `datafast_session_id` dans les metadata Stripe (Checkout VIP + PaymentIntent upsell).
- **DataFast** : cookieless par défaut ; mode cookies seulement après Accept (SDK `datafast`, `dfid_VK30OLHyu2v9ALKIQfjxn`). Pageviews SPA + events `waitlist_signup` / `contact_submit`.
- **Double inscription liste d'attente** : si l'email existe déjà (formulaire ou `?email=`), on pose `doubleInscription = Oui` sur la fiche — pas de nouvelle ligne. Automation Airtable pour le mail « déjà inscrite ».
- **Email déjà inscrite** : `emails/waitlist-already.html` — même cadre que la confirmation, copy « tu es déjà sur la liste ».

### 🔧 Changed

- **Liste d'attente** : `?email=` valide redirige vers `/merci-liste-attente` (inscription one-click, même flux que le lien merci).

### 📚 Documentation

- **Confidentialité** : DataFast cookieless sans accord, cookies DataFast + PostHog après Accept — art. 5 et 9.
- **Règle Cursor** `.cursor/rules/email-spam-compliance.mdc` : preheader = 2 premières lignes du body, padding `&#8199;` (pas de zero-width), copy intouché, alerte si signal spam fort.

### 🚀 Improved

- **Bandeau cookies** : copy tournée vers l'intérêt de la visiteuse (pas Meta / campagnes), ton rassurant, refus sans impact sur la lecture.
- **DataFast** : à l'Accept, l'ID cookieless est recopié en cookies — même visiteuse tout de suite, pas à la visite suivante.
- **Mail 1 (seg. 1 et 2)** : preheader = début du mail, **sans** padding `&#8199;` (ZeroBounce le flag comme caractères invisibles). Copy inchangé.

## 2026-08-31

### ✨ Added

- **Lien email → liste d'attente** : `/merci-liste-attente?email=%EMAIL%` inscrit directement (Airtable + tracking), sans formulaire. Prénom optionnel (`&prenom=%FIRSTNAME%`). Doublon email ignoré. Les scanners qui préchargent le lien ne POST-ent pas.
- **Emails lancement Mail 1** : templates ActiveCampaign (`emails/launch/final/`) — tables + CSS inline, images hébergées (`/email/launch/`), tags `%FIRSTNAME%` / `%UNSUBSCRIBELINK%`. Segment 1 (conférence) et Segment 2 (intéressées).

### 🔧 Changed

- **Emails lancement Mail 1** : copy finale (atelier / intéressées, CTA « liste avant-première », mosaïques mises à jour). Templates AC dans `emails/launch/final/`.

### 🚀 Improved

- **Emails lancement Mail 1** : tables fluides `width="100%"` + `max-width:600px` (plus de `width="600"` qui forçait le scroll horizontal sur mobile).
- **Assets Mail 1** : images dans `emails/launch/final/` (`mail-1-*.jpg`) + copie `public/email/launch/` pour l’hébergement.

### 📚 Documentation

- **Règle Cursor** `.cursor/rules/activecampaign-emails.mdc` : workflow original → final AC → done, nommage images, contraintes HTML ActiveCampaign.

## 2026-08-30

### ✨ Added

- **Meta Pixel + CAPI** : même pixel que webi (`604268118937812`). Event custom `optInWaitingList` (pixel + serveur, `event_id` partagé) après inscription liste d'attente. `PageView` si consentement cookies. Token `META_CAPI_TOKEN` serveur only.
- **Email confirmation liste d'attente** : template HTML (`emails/waitlist-confirmation.html`) — logo YoGyFace, « écris-moi », Insta en PNG, YouTube en JPEG (`/email-play.jpg`) — Mail.app cassait `/email-youtube.png`.
- **Confirmation liste d'attente** : ouverture privée le 10 septembre, 50 places de membres fondatrices, placeholder vidéo Laury, carrousel avant/après et 6 avis Trustpilot. Pas de mention des cadeaux (uniquement aux CGV). Picto fleur, bouton « Retour à l'accueil » et placeholder vidéo retirés.

### 🔧 Changed

- **Cartes avant/après** : plus d’air sous le prénom / la durée (merci + `/transformations`).
- **Image sociale (Open Graph)** : portrait Laury (livres + modèle anatomique) à la place du collage 7 visages. Cache-bust `?v=20260830`.
- **Liste d'attente** : titre « réserve ta place de membre fondatrice », 50 places, 1 200 femmes, téléphone optionnel (SMS à l'ouverture).
- **Liste d'attente (copy plateforme)** : carte « La nouvelle plateforme » (diagnostic, exercices, programme jour après jour 2-3 mois). Intro sous « pas un simple replay » recentrée sur la révolution YoGyFace et le diagnostic.

## 2026-08-26

### ✨ Added

- **Liste d’attente** : champ téléphone avec sélecteur de pays (drapeau, France par défaut, liste complète). Envoyé à Airtable dans `Phone` (E.164, ex. `+336…`).
- **Checkout Session VIP** : les CTA de `/vente-vip` créent une session Stripe (1× 299 € ou 3 × 99,99 €) via Express. Carte réutilisable (`setup_future_usage`). Fallback Payment Link si `STRIPE_SECRET_KEY` absente.
- **Upsell 1 clic** : après paiement, `/vente-upsell` propose une offre complémentaire (tarif test : 0,50 € — à valider). Oui = PaymentIntent off-session ; 3-D Secure → nouveau Checkout. Non = `/merci-achat`.
- **Pages `/vente-upsell` et `/merci-achat`** : noindex (meta + robots + `X-Robots-Tag`), hors sitemap, hors ticker.
- **`/vente-upsell-test`** : preview de l’upsell sans paiement Stripe (aucun débit).

### 🐛 Fixed

- **Upsell après 3×** : webi pose déjà un schedule Stripe ; l’ancien `cancel_at` faisait planter `/vente-upsell` (« Session introuvable ») alors que le paiement était bon.

### 🔧 Changed

- **Pages de vente** : 6 étapes enrichies (diagnostic 30 min / 25 thèmes, ordo 3–7 pages, 4 semaines, zones d’exercices), mini-calendrier J+0 / J+3 / J+6, catalogue bonus (EFT, Face Tape, yoga 30 min, P.E.A.U, bible des actifs), Club des Marques = 1 live mensuel, accroche Reset en sous-titre. 12 avis Trustpilot authentiques (au lieu de 6).
- **Garantie YoGyFace** : astérisque + renvoi vers les CGV art. 10 (`/cgv#garantie`), même formulation que les bonus VIP.
- **6 étapes (vente)** : timeline verticale (ligne + pastilles), cartes en quinconce gauche/droite, apparition au scroll (`animate-on-scroll` left/right).
- **Timeline 6 étapes** : pointillés gris qui passent au corail au scroll, pastilles centrées sur la ligne et au milieu de chaque carte.
- **Vente** : mini-calendrier J+0 / J+3 / J+6 retiré sous « Un geste simple » (doublon avec les 6 étapes).
- **Ticker `/vente-vip`** : même bandeau que la home — « Ouverture VIP · Prix à durée limitée · Bonus à durée limitée ». Clic → `#offre`.
- **CGV art. 3 bis** : les bonus (coaching, accompagnement, diagnostic) ne sont dus qu’à l’issue d’un achat pendant les ventes privées de la V2 — pas du seul fait de la liste d’attente.
- **VIP 3×** : après le 1er prélèvement, l’abonnement devient un schedule Stripe de 3 mois (`end_behavior: cancel`) — même modèle que webi gift/reset. Plus de `cancel_at` approximatif (il cassait l’upsell si webi avait déjà posé le schedule). Filet aussi à l’ouverture de `/vente-upsell`.
- **CTA VIP** : plus de repli silencieux vers un Payment Link si la Checkout Session échoue (ces liens n’ont pas `kind=vip`, webi n’inscrit pas).
- **Stripe VIP** : plus de `client_reference_id` (webi le prenait pour un code parrainage). Email d’origine = `metadata.orig_email`. Session taguée `metadata.kind=vip`.
- **`/vente-upsell`** : plus de header, footer, ticker ni bandeau cookies — Oui / Non uniquement.
- **Checkout VIP (colonne gauche)** : code promo (`allow_promotion_codes`), descriptif de l’offre et logo YoGyFace. L’ancienne session Stripe déjà ouverte ne change pas — il faut relancer un paiement.
- **Ticker rentrée** : les 3 mentions sont collées (plus d'espacement `justify-evenly` sur 100vw) et répétées tout du long, comme un marquee classique. Défilement ralenti (28s → 90s).

## 2026-08-25

### ✨ Added

- **Bandeau rentrée** : ticker noir pleine largeur (Rentrée YoGyFace · lancement · liste d'attente), cliquable vers `/liste-attente`. Masqué sur `/vente`, `/vente-vip` et `/merci-liste-attente`.
- **3 pages privées (non indexées)** : `/merci-liste-attente` (confirmation d'inscription), `/vente-vip` (vente privée liste d'attente) et `/vente` (offre publique). Meta `noindex`, `robots.txt` + en-tête `X-Robots-Tag`, hors sitemap et hors navigation. L'inscription liste d'attente redirige désormais vers la page merci.
- **Copy lancement V2** : liste d'attente, page merci et pages de vente recadrées sur les ventes privées, l'avant-première de l'application YoGyFace, le diagnostic / les exercices / le programme V2, et les bonus réservés aux inscrites.
- **Bonus liste d'attente** : `/merci-liste-attente` affiche 6h de coaching, 6 mois d'accompagnement et le diagnostic complet offerts, avec renvoi * vers les CGV. Nouvel art. 3 bis : ces bonus ne s'appliquent qu'en rejoignant le programme lors des ventes privées VIP.
- **Vente VIP** : prix 299 € (au lieu de 499 €), Stripe 1× et 3 × 99,99 € (bouton secondaire, même poids que le 1×), bonus chiffrés (coaching +6h / 240 €, accompagnement +6 mois / 199 €, renouvellement diagnostic / 299 €). Email prérempli (`prefilled_email`) via `?email=` ou liste d'attente. L'email d'origine part aussi en `client_reference_id` (webhook) s'il est modifié sur Stripe. Pas de préremplissage téléphone sur Payment Link.
- **Pages de vente (mise en page type fiche produit)** : hero 2 colonnes, accent VIP / avant-première, comparatif 3 colonnes (VIP / lancement public / après lancement 999 €) — colonne VIP relevée (carte blanche, radius, contour vert), bonus en vert, bandeau marques, 6 avis Trustpilot authentiques.
- **Avis Trustpilot sur les pages de vente** : 6 avis authentiques en cartes brandées TP (5.0 / 5 étoiles par avis, moyenne 4.9/5 en header, tags, lien). « Voir plus d'avis » vers le profil Trustpilot.
- **Carrousel avant/après** sur les pages de vente : auto-swipe (pause au survol), flèches, dots. Visuels temporaires (`ba-01`…), à remplacer quand les images de vente arrivent.
- **Parcours 3 étapes** (type Lynae) : diagnostic → ordonnance/programme sous 3–4 jours → rituel quotidien.
- **Bloc autorité Laury** sur les pages de vente : 10 ans Chanel / Biotherm / Weleda, formations (LeFranc, Narumi, Takatsu), méthode RESET™.
- **Calendrier de résultats** (jusqu'à 6 mois) : semaines 1–4 (habitudes / mimiques), 2–4 mois (visible), 6 mois (confiance). Aligné sur l'article résultats + avis.
- **FAQ vente** en bas de `/vente` et `/vente-vip` : accordéon 7 questions (résultats, durée, injections, garantie, après paiement), lien mail + FAQ complète.
- **Showcase plateforme V2** : 5 blocs — **exercices en premier** (guidés pas à pas, fiche à faire/à éviter, hors ligne), puis suivi, coaching, cosmétique, messagerie. Captures desktop/mobile. Cosmétique : desktop + mobile cosmétique uniquement.

### 🚀 Improved

- **Showcase plateforme** : blocs en quinconce (texte / mockup alternés). Fond blanc des captures mobile exercices retiré.
- **Calendrier de résultats** : labels Semaines / mois en display black, plus grands et plus lisibles (plus d'italique coral trop léger).

### 🐛 Fixed

- **Comparatif VIP** : les lignes du tableau (prix, coaching, bonus…) s'alignent entre colonnes. La carte verte n'est plus une colonne isolée.

## 2026-08-07

### 🔧 Changed

- **Politique de confidentialité (`/confidentialite`)** : mise à jour pour couvrir les 3 domaines (yogyface.fr, www.yogyface.fr, webi.yogyface.fr). Art. 1 (périmètre), art. 2 (inventaire réel des données du parcours + bloc bien-être physique/santé), art. 5 (sous-traitants réels : Supabase, Airtable, Resend, Make, CloudFront, Meta, PostHog…), art. 6 (suppression du « Privacy Shield » invalidé → Data Privacy Framework + clauses contractuelles types ; Supabase/Resend en Irlande donc UE), art. 7 (ajout du journal d'utilisation, 25 mois). Date « mise à jour » → août 2026.
- **Confidentialité — 2ᵉ passe de cohérence** : art. 2 (réintroduction du bloc « programme de coaching » : diagnostic, photos d'évolution, journal, échanges), art. 3 (ajout de la finalité « mesure publicitaire »), art. 4 (bases légales réécrites : consentement **explicite** pour bien-être/santé + mesure publicitaire), art. 5 (ajout de YouTube / Google Ireland, mode sans cookie), art. 6 (Supabase/Resend étant des sociétés US, les traitements restent couverts par les garanties — on ne laisse plus croire à une exemption).

### 🐛 Fixed

- **Art. 9 — Cookies** : retrait de la fausse affirmation « aucun cookie publicitaire ». La clause est scindée en deux : (1) site vitrine → PostHog uniquement, sous consentement ; (2) application webi → description **factuelle** du pixel Meta + Conversions API et moyens d'opposition, **sans mention du moment de déclenchement ni promesse de consentement** (à repasser en version conforme une fois la bannière posée côté app).

### 📚 Documentation

- **`docs/consentement-meta-webi.md`** : guide d'implémentation d'une bannière de consentement **non-bloquante** pour `webi.yogyface.fr` (gating pixel Meta + Conversions API, checklist CNIL, texte « conforme » de l'art. 9 à recoller ensuite).

### 🔒 Security

- **Représentant UE (art. 27 RGPD)** : NON ajouté (art. 1 bis laissé de côté à la demande). Laury n'étant pas établie dans l'UE, elle ne peut pas être le représentant. À souscrire auprès d'un prestataire dédié (Prighter / DataRep / EDPO…) puis à insérer.

## 2026-06-29

### 🔧 Changed

- **Canonicalisation du domaine (SEO)** : ajout dans `server.js` d'une redirection 301 `www.yogyface.fr` → `yogyface.fr` (apex), pour ne servir/indexer qu'une seule version cohérente avec les balises `canonical` et le `sitemap.xml`. Garde-fou côté app : n'a d'effet qu'une fois le DNS du `www` repointé vers Railway.

### 📚 Documentation

- **Diagnostic indexation Google** : `www.yogyface.fr` était branché sur systeme.io (même plateforme que `holibeauty.ch`) et servait une page vide → Google consolidait `yogyface.fr` vers `holibeauty.ch` comme URL canonique. Correctif principal à faire côté DNS/systeme.io (débrancher le `www` de systeme.io et le repointer vers Railway / redirection apex).

## 2026-06-23

### ✨ Added

- **5 nouveaux avis Trustpilot** ajoutés sur la page Transformations (Fanny, Aurore, Virginie, Emmanuelle, Christine), condensés sur leurs meilleurs passages avec lien direct vers l'avis Trustpilot.

### 🔧 Changed

- **Témoignages 100% authentiques** : suppression des 6 témoignages fictifs de la page Transformations (ne restent que les 8 vrais avis Trustpilot) et remplacement des 3 témoignages fictifs de la page d'accueil par des versions courtes de vrais avis (Aurore, Fanny, Emmanuelle).
- **CGV** : titre de l'article 10 « Garantie Satisfait ou Remboursé » → « Garantie de résultats ».

## 2026-06-14

### ✨ Added

- **Vidéos YouTube intégrées** : 2 vidéos techniques branchées sur les articles (pilier yoga du visage, résultats), et 2 vidéos « parcours » ajoutées sur la page Mon Parcours (section « En vidéo », façade légère au clic).

### 🚀 Improved

- **SEO / entité de marque (sitelinks)** : ajout du schema JSON-LD `WebSite` et de Pinterest dans le `sameAs` de l'`Organization` (Instagram, YouTube, Trustpilot, Pinterest). Icône Pinterest ajoutée au footer (lien crawlable). Objectif : aider Google à consolider la marque pour les liens annexes (sitelinks).

### ✨ Added

- **10 nouveaux articles SEO** rédigés et publiés (en relecture, derrière mot de passe) — Mois 4-5 du calendrier éditorial : résultats (combien de temps), dangers & contre-indications, à quel âge commencer, fréquence (tous les jours ?), yoga du visage vs botox, gua sha/LED/yoga (que choisir), avis clientes, lecture des avant/après, vieillissement du visage (4 mécanismes), pattes d'oie. **Total : 22 articles** prêts pour la relecture de Laury.

### 🔧 Changed

- **Réécriture anti-duplication (vs glowritualstudio.com)** : reformulation des contenus calqués sur le site concurrent — hero Contact (« Restons connectées »), hero Transformations (« Des preuves, pas des promesses » / « Pas de filtres. Pas de retouches. »), hero FAQ (« Besoin de clarté ») + réponse « remplacer les injections », phrase hero About + titres des étapes du parcours (Le Déclic / La Recherche / Aujourd'hui), formulation « 45 muscles » sur Home. Faux témoignage « Sophie M. » (copié) remplacé par « Sandrine L. » reformulé sur Home et Transformations. Bloc de stats Transformations réordonné et chiffres ajustés.
- Calendrier éditorial mis à jour (statuts #11-20 → rédigés) ; #16 recadré pour ne pas cannibaliser le #21 (gua sha) ; #19 rédigé en article factuel (note : un vrai sondage est requis pour en faire une opération Digital PR).

## 2026-06-13

### ✨ Added

- **12 articles SEO** publiés dans `src/content/articles/` (pilier yoga du visage, sillon nasogénien, rides du lion, double menton, ovale du visage, gymnastique faciale, auto-massage, drainage lymphatique, face taping, respiration & tensions, gua sha, rides du front) — **en relecture** (non publics).
- Balise de **vérification de propriété Pinterest** (`p:domain_verify`) ajoutée au `<head>`.

### 🔒 Security

- Sections `/articles` et `/evenements` **protégées par mot de passe** (HTTP Basic Auth côté serveur, identifiants via les variables d'env `REVIEW_USER` / `REVIEW_PASSWORD`) : accessibles uniquement avec les identifiants, **invisibles du public et de Google** (401) le temps de la relecture par Laury.

### 🔧 Changed

- Routes **Événements réactivées** (prérendues, sans lien visible dans la navigation).
- `/articles` et les pages d'articles **exclus du sitemap** tant qu'ils sont en relecture.
- Chargeur d'articles : le placeholder vidéo YouTube des brouillons est ignoré (évite les miniatures cassées).

## 2026-06-11

### ✨ Added

- Section **Articles / Blog** : nouvelle page `/articles` (liste + filtres par catégorie) et pages d'article `/articles/:slug` avec intégration de vidéos YouTube. Contenu rédigé en **Markdown** versionné dans `src/content/articles/` (frontmatter `title`, `slug`, `date`, `category`, `excerpt`, `cover`, `youtube`, `description`). Lien « Articles » ajouté à la navigation (Navbar + Footer). Façade YouTube légère (miniature → iframe au clic) pour préserver les performances.

### 🚀 Improved

- **Prerendering statique (SSG) via `vite-react-ssg`** : toutes les pages (existantes + articles) sont désormais rendues en HTML statique au build → texte et balises SEO présents dans le HTML pour un vrai référencement Google. Gestion du `<head>` par page migrée vers `<Head>` (titres, meta, Open Graph, canonical, JSON-LD `Article`/`FAQPage`/`Person`/`Business`). `sitemap.xml` régénéré automatiquement au build (script `prebuild`) avec les URLs d'articles.

### 🔧 Changed

- Pages légales (Mentions légales, CGV, Politique de confidentialité) : remplacement de l'entité éditrice « TRACKS CONSULTANCY - F.Z.C » (Dubaï) par **YGF LLC** (Limited Liability Company — 30 N Gould St Ste R, Sheridan, WY 82801-6317, États-Unis) ; suppression de l'ancien Trade Licence 44373.
- Remplacement du logo texte par le logo image officiel (version foncée pour fonds clairs : Navbar/menu mobile ; version claire pour fond sombre : Footer), détouré en PNG transparent.
- Uniformisation de la marque en « YoGyFace » sur tout le site (FAQ, CGV, Mentions légales, Transformations, Footer, Programme) ; les URLs/emails `yogyface.fr` restent inchangés.

### ✨ Added

- Page FAQ : 2 nouvelles questions (« Est-ce que je dois pratiquer tous les jours, matin et soir ? » et « J'ai peur de mal faire, est-ce que je peux abîmer mon visage ? »).

### 🚀 Improved

- Page FAQ : mise en gras des mots/expressions clés dans les réponses (parser `**…**` → `<strong>`) pour une meilleure lisibilité et un repérage rapide ; les marqueurs sont retirés du JSON-LD (SEO).

### 🐛 Fixed

- Page FAQ : réponses multi-paragraphes passées en template literals (corrige l'erreur de syntaxe due aux retours à la ligne dans des chaînes `"..."`) et rendu en `whitespace-pre-line` pour conserver les sauts de ligne ; hauteur d'ouverture augmentée pour éviter la troncature des longues réponses.

### ✨ Added

- Page Transformations : ajout de l'avis Trustpilot d'Elisabeth (condensé sans reformulation) après celui de Carine.
- Events de conversion PostHog : `waitlist_signup` (inscription liste d'attente) et `contact_submit` (message contact, avec le sujet) envoyés au succès du formulaire — permet de mesurer les taux de conversion et de construire des funnels.

### 📚 Documentation

- Ajout de `docs/analytics-posthog.md` : architecture, variables d'env, procédure Railway et garde-fous PostHog (bot filtering, billing limit, domaines autorisés).

### ✨ Added

- Mesure d'audience PostHog (cloud EU) : suivi des pages vues au changement de route (SPA), chargé en import dynamique (chunk séparé) et **uniquement après consentement**. Ajout d'un bandeau de consentement RGPD (`CookieConsent`) avec choix Accepter/Refuser, et mise à jour de la page Confidentialité (Article 9). Clé via `VITE_POSTHOG_KEY` (cf. `.env.example`).
- Page Transformations : ajout de l'avis de Carine (« Une renaissance », version raccourcie sans modification des propos) juste après celui de Jeanne, avec son lien Trustpilot.

### 🔧 Changed

- Remplacement des images avant/après `ba-05`, `ba-06`, `ba-08` (bande blanche retirée + recadrage 1000×600) et `ba-11` par de nouvelles photos.

## 2026-06-10

### 🔧 Changed

- Image de partage social (Open Graph / Twitter) remplacée par `laury-profil` (converti en JPG `og-laury-profil.jpg`, 1024×682, meilleur support multi-plateformes que le WebP) ; dimensions `og:image` mises à jour en conséquence.

### 🔧 Changed

- Page Programme (section 5 expertes) : descriptions des expertes enrichies de 2-3 lignes à partir de recherches en ligne (Camille Hermann, Irina Sambucini, Laëtitia / LovelyLift®, Alicia, Julie / Natis) à la place de la simple ligne précédente.

### 🔧 Changed

- Page Programme : section R.E.S.E.T™ passée du fond noir au fond crème (cartes piliers blanches), cartes des 6 étapes redessinées (ombre douce, liseré corail, numéro en badge plein, effet hover), phrases italiques de détail agrandies (15/17px), et texte de l'étape 03 reformulé (routine 4 semaines renouvelée sur 6 mois, progression douce).

### 📚 Documentation

- Ajout de `docs/strategie-seo-6-mois.md` : stratégie SEO complète sur 6 mois (mots-clés, roadmap, plan éditorial 20 articles, netlinking, KPIs).

### 🚀 Improved

- Optimisation des performances (PageSpeed) : polices Google chargées en asynchrone (~1150 ms de blocage de rendu en moins), conversion de toutes les images de contenu en WebP (~1,8 Mo économisés, -57%), et code-splitting des routes via `React.lazy` + `Suspense` (Home reste en eager pour le LCP, -43 Kio de JS au chargement initial).

### 🔧 Changed

- Masquage temporaire de la page Événements (données manquantes) : lien retiré de la navbar et du footer, routes `/evenements` et `/evenements/:id` redirigées vers l'accueil, marques du bandeau "Elles m'ont fait confiance" affichées sans lien, entrées Événements retirées du sitemap. Les pages `Evenements.jsx` et `EvenementDetail.jsx` sont conservées pour réactivation ultérieure.
