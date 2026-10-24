# Changelog

## 2026-10-24

### 🔧 Changed

- **`/vente-10x`** : tarif **359,99 €** (plus 449 €) — CTAs **10 × 35,99 €**, **6 × 59,99 €**, **1×**. Plans `studio-dix-*` retirés.

## 2026-10-22

### ✨ Added

- **`/diagnosticrevelateurygf`** : redirect 301 → `https://diagnostic.yogyface.fr/fw3rd9m9d` (sans email / UTM).

### 🔒 Security

- **Node.js** : pin `22.23.4` (patch sécu 21/10 — CVE high dns/TLS/Brotli). `.nvmrc` + `engines`.

## 2026-10-21

### ✨ Added

- **`/atelier-gratuit`** : l’inscription Airtable lie le webi Studio du prochain mardi (`Webinars` → table Webinars), comme le SearchRecords Make.

### 🔧 Changed

- **`/atelier-gratuit`** : téléphone **obligatoire** (UI + API). Plus d’inscription sans numéro E.164.

## 2026-10-20

### ✨ Added

- **Upsell pack** : le paiement 99 € (1 clic ou 3DS) pose `studio_extension` sur Stripe. App v2 crédite +12 h, +6 mois, ticket diag. Purchase CAPI aussi sur le 1 clic.
- **`/vente-6x`** : Studio **359 €** — 1×, **4 × 89,99 €**, **6 × 59,99 €**. Upsell pack après paiement.

### 🔧 Changed

- **Checkout 4×/6×** : bouton Stripe « Payer » / « Acheter » au lieu de « S’abonner » (`submit_type: pay`).
- **`/vente`** : paiement en **1×**, **4 × 89,99 €** et **6 × 59,99 €** (même plans que `/vente-6x`).
- **Confirmation achat** : plus de bouton « Écrire à Laury » sur `/confirmation-achat-bienvenue`.
- **`/vente`** `/vente-6x` : Studio **359,99 €** en 1× (Stripe aligné). 4× et 6× inchangés.
- **Upsell** : `/vente`, `/vente-6x` et `/vente-10x` redirigent vers `/vente-upsell`. Preview `/vente-upsell-test` et variante coaching retirées.

### 🐛 Fixed

- **`/vente` 4×** : « Payer en 4 × 89,99 € » ouvre Stripe. `customer_creation` n’est plus envoyé sur l’abo (Stripe 400 → « Impossible de créer le paiement »).
- **Upsell** : « Oui je le veux » débite la carte Studio en 1 clic. Plus de 2e Checkout ni de 2e 3DS. Si la banque refuse le débit hors session, le dialog le dit et elle peut passer.
- **Stripe /vente** : la carte du 1er paiement est posée en `default_payment_method` (customer + abo 4×/6×) pour l’upsell.
- **Checkout** : le CTA ouvre Stripe tout de suite, plus de « Email requis ». L’email se saisit sur Stripe ; s’il vient de `?email=`, on rattache le `cus_` existant.
- **Stripe** : plus de customers en double. Checkout `/vente` exige l’email, réutilise le `cus_` existant (ou en crée un seul) au lieu de `customer_creation: always` sans lookup.

### 🔧 Changed

- **`/vente`** : Studio à **359 €** (899 € barré). Paiement en **1×** ou **4 × 89,99 €** (plus de 6×). Checkout Stripe aligné. `/vente-10x` reste à 449 €.

### ✨ Added

- **Upsell A/B post-achat** : pack VIP 99 € (2e programme à 6 mois, 359 € barré) vs 12h de coaching 79 € (249 € barré). Split 50/50 hashé sur le `cs_` Stripe. Preview `/vente-upsell-test?v=pack` et `?v=coaching`. Flag `UPSELL_ENABLED` toujours à `false` jusqu’à validation.

### 🔧 Changed

- **`/vente-upsell`** : accents et CTA en bordeaux `#841435` (même teinte que la carte garantie), plus de corail.
- **`/vente-upsell`** : retrait de la mention « Un seul paiement · sans retaper ta carte ».
- **`/vente-upsell-test`** : plus de badge « Mode test » — la preview est identique au live.
- **`/vente-upsell`** : tableau comparatif avec / sans (même grille que VIP), colonne mise en avant en bordeaux.
- **Pack VIP upsell** : Diagnostic = 1 à l’achat + 1 après 6 mois (sans le hint « nouvelles zones »).
- **`/vente-upsell`** : avantages du tableau et CTA d’achat en vert (comme le comparatif VIP).
- **`/vente-upsell`** : retrait du badge « Avec, toi ».
- **Pack VIP upsell** : headline « suivi 1 an au lieu de 6 mois ».
- **`/vente-upsell`** : plus de bandeau vide en mobile ; desktop « Avec l’offre 1 an ».
- **`/vente-upsell`** : titre « UNE DERNIÈRE chose. » sur une ligne, bordeaux.
- **Upsell coaching** : pill desktop « Les 12 en + ».
- **Upsell** : « Après 6 mois » → « 6 nouveaux mois ».
- **Pack upsell** : tableau « Ce que tu peux avoir pour 99 € » vs « Ce que tu as acheté pour 359 € ».
- **`/vente-upsell`** : layout OTO Systeme.io (étapes, compte à rebours, carte produit, liste, Oui / Non). Tableau pack conservé.
- **`/vente-upsell`** : 2 clics — « Oui ! je le veux ! » ouvre un dialog, « Confirmer » déclenche le débit.
- **`/vente-upsell`** : chrono 15 min + « ou quand tu fermeras cette page ».
- **Upsell** : retrait de la ligne Prix du tableau (déjà dans les titres / carte produit).
- **Upsell** : colonne verte = uniquement le bonus (`+6 mois`, `+12h`…) — l’initial reste à droite.
- **Pack upsell** : Diagnostic = renouvellement après 6 mois vs diagnostic de départ seulement.
- **Pack upsell** : Suivi photo = jusqu’à 12 mois vs 6 premiers mois.
- **Pack upsell** : titre « Félicitations, tu rejoins YoGyFace STUDIO » + question sur l’extension 1 an.
- **Pack upsell** : Accompagnement = 12 mois vs 6 mois.
- **Pack upsell** : Programme = renouvellement à 6 mois vs programme initial seulement.
- **`/vente-upsell`** : CTA « Oui ! je le veux ! » et « Confirmer » en vert achat.
- **`/vente-upsell`** : retrait de « Le paiement part sur la carte… » dans le dialog.
- **Pack upsell** : nom « Extension YoGyFace STUDIO — 1 an ».
- **`/vente-upsell`** : sous-titre (question extension) en noir gras.
- **Pack upsell** : Programme « après 6 mois » (plus « au bout de »).
- **Pack upsell** : puces « Cette offre contient » (renouvellement programme / diagnostic, +12h, +6 mois suivi).
- **Pack upsell** : « après 6 mois » à la ligne en mobile ; une ligne en desktop (colonne élargie).
- **Pack upsell** : mobile = « Renouvellement de ton » puis « programme/diagnostic après 6 mois ».
- **Upsell live** : pack uniquement après `/vente` (359 € 1× ou 4×). Plus de split coaching. VIP et `/vente-10x` restent sur la confirmation.

## 2026-10-16

### 🐛 Fixed

- **`/atelier-gratuit`** : pixel Meta chargé dès l'arrivée (PageView) + `Lead` au submit. Le bandeau est masqué, donc `fbq` ne partait jamais — seul le CAPI filait.

## 2026-10-14

### ✨ Added

- **Partenariat ODEN** : visuels publics `yogyfaceXoden.jpg` et `oden-fondatrices.jpg`.
- **Meta Lead `/atelier-gratuit`** : pixel + CAPI (email hashé, pixel `604268118937812`) au submit, event standard `Lead` pour optimiser la campagne.
- **Identité page vente** : cookie first-party `yf_hid` (`.yogyface.fr`) posé à l'opt-in `/atelier-gratuit` via l'app webi ; ping `/api/vente-hit` sur `/vente` `/vente-vip` `/vente-10x` (lien générique, sans Meta forcé).
- **`yf_hid` Airtable** : `users.id` écrit sur la table **Inscription** (`tblgeGEVgkZnDxwfR`) après l'opt-in.
- **Couverture** : `?email=` (mails AC `%EMAIL%`) et IP unique de la cohorte si pas de cookie ; stamp cookie aussi sur le tunnel si l'email est dans l'URL.

### 🐛 Fixed

- **`/vente` → Airtable Inscription** : écrit `opened_vente` / `vente_page_*` sur la fiche `yf_hid` (plus seulement via le lien webi).
- **`vente_page_hits`** : envoyé en texte (le champ Airtable n'est pas un number — 422 qui bloquait tout le PATCH).
- **Railway** : `server.js` — parenthèse en trop après `/api/replay` (healthcheck KO au boot).

### 🔧 Changed

- **`/atelier-gratuit`** : plus de bandeau cookies (comme `/vente`).
- **`/confirmation-inscription`** : plus de bandeau cookies, plus de CTA bonus #1, WhatsApp vert bounce au-dessus des étapes.
- **`/confirmation-inscription`** : miniature vidéo (frame sourire Laury) + bouton play.

### 📚 Documentation

- **Confidentialité** : cookie technique `yf_hid` pour rattacher la visite offre à la fiche d'une inscrite.

## 2026-10-13

### 🚀 Improved

- **`/vente`** : étape 1, mockup diagnostic (liste + carte vidéo) à la place des photos Suivi.
- **`/vente`** : étapes 1 et 2 en `object-contain` (plus de crop), comme l'étape 3.
- **`/vente`** : ombres renforcées sur les 3 cartes « Comment ça se passe ».
- **`/vente`** : étapes 1 et 2 recadrées (photos diagnostic, ordonnances sans marge crème).
- **`/vente`** : 3 étapes (diagnostic, ordo, programme) à nouveau sur 1 ligne desktop.
- **`/vente`** : montage ordonnances, bas des 2 pages flouté (texte plus lisible).
- **`/vente`** : plus de CTA d'achat sous la FAQ (déjà dans « Prête à commencer »).
- **`/vente`** : bloc Studio réagencé (parcours / plateforme / accompagnement) + portraits des 5 expertes.
- **`/vente`** : 36 avis Trustpilot 5★ (les 1★ restent hors page). Note affichée **4.9/5**.
- **`/vente`** : témoignages vidéo en 16:9 + bouton play sur la miniature (plus de crop 3:4).

### ✨ Added

- **`/vente`** : miniature avant/après sur le témoignage Carine.
- **`/vente`** : témoignage vidéo relabelé **Carine** (plus « Carine & Céline »).
- **`/vente`** : miniatures avant/après sur Marion 32 ans et Julie 28 ans.
- **`/vente`** `/vente-10x` : stacked value Systeme.io (plus de 2 200 € vs 449 €) sous « Elles m'ont fait confiance », puis garantie 6 mois remontée.
- **`/vente`** `/vente-10x` : 449 €, **899 €** barré (plus 999 €).
- **`/vente-10x`** : CTA dans l'ordre 10×, 4×, 1×.
- **`/vente-10x#temoignages`** : même ancre que `/vente`, offset calé sur le bandeau bordeaux.
- **`/vente-10x`** : mensualité **10 × 44,99 €**.
- **`/vente-10x`** : bandeau **bordeaux** (`#841435`) + countdown minuit plus grand.
- **`/vente-10x`** : même page que `/vente`, paiement **10 × 44,99 €** seulement, bandeau urgence (2/20 + countdown minuit Paris).
- **`/vente`** : étape 3, mockup programme (desktop + tablette) à la place de la photo Laury.
- **`/vente`** : étape 2, montage carré des ordonnances (beauté + skincare) à la place de la photo Laury.
- **`/vente`** : étape 1 (diagnostic) en mockup plateforme (écran Suivi desktop + iPhone) à la place de la photo Laury.
- **`/vente`** : titre échecs → « Pourquoi ce que tu as déjà essayé n'a pas fonctionné ».
- **`/vente`** : tirets cadratins « — » remplacés par des virgules (copy moins « IA »).
- **`/vente`** : plus de bandeau cookies (ni sur `/vente-vip`).
- **`/vente`** : plus de « 50 places » / « 18 septembre » (CTA, badge, bandeau).
- **`/vente`** : blocs « Si tu te reconnais », « Pourquoi ça n'a pas marché », 14 témoignages vidéo Systeme.io, 4 FAQ (âge, injections, peau, accès).
- **`/bonus-live`** : 3 bonus YouTube extraits de Systeme.io (front `99Doy7fS6dI`, SCM `3JAZd76I6Nw`, muscles `1NDbQgwNCp8`) + miniatures + CTA Studio.

### 🔧 Changed

- **`/vente`** : plus la phrase « Diagnostic V2, exercices refondus… » ; V2 → diagnostic ultra personnalisé.
- **`/vente`** : stacked value dans le hero sur mobile seulement (desktop : section d'origine).
- **`/vente`** : reconnaissance et échecs commentés ; titres (clientes, science, plateforme, produit, garantie) mis à jour.
- **`/vente`** : messagerie, plus « fils par sujet ».
- **`/vente`** : messagerie, plus « avec Laury et l'équipe ».
- **`/vente`** : messagerie, plus « Tout de suite ».
- **`/vente`** : parcours étape 3, « Programme de 3 mois » (plus 4 semaines).
- **`/vente`** : suivis photo chaque mois (1, 2, 3, 4, 5 et 6), plus seulement 1-2-3-6.
- **`/vente`** FAQ après paiement : les 6 mois de suivi commencent à la réception du programme.
- **`/vente`** FAQ accès : programme 3 mois, plateforme à vie, lives et suivis photo sur 6 mois.
- **`/vente`** : garantie en 2 cartes (conditions + « Tu m'écris. Je te rembourse. »).
- **`/vente`** : cadeaux, prix barré et « Offert » sur la même ligne.
- **`/vente`** : 4 piliers à moitié (149 / 75 / 40 / 185 = 449 €) en vert, ancien prix barré.
- **`/vente`** : sceau garantie = badge officiel (plus le rond CSS).
- **`/vente`** : prix des cadeaux barrés + mention Offert.
- **`/vente`** : garantie sans bandeau corail, titre orange, conditions numérotées.
- **`/vente`** : stacked value, plus le titre « PLUS DE 2 200 € si tu achetais chaque pièce à part ».
- **`/vente#temoignages`** : ancre sur le titre (plus le bloc prix du dessus).
- **`/vente`** : note Trustpilot affichée **4.9/5** (hardcodée, pas d'API).
- **`/vente`** : ancre `#temoignages` sur « Elles en parlent ».
- **`/bonus-live`** : CTA → « Studio : Découvrir la Méthode YoGyFace Studio » (plus RESET).
- **`/vente`** `/programme` : « Groupe WhatsApp privé » → « Communauté privée dans la plateforme ».
- **`/replay-gratuit`** : embed YouTube via short link `go.yogyface.fr/replay-yt` (`GET /api/replay`). Plus de redeploy pour changer la vidéo.
- **`/vente` (Studio)** : **449 €** (999 € barré). Mensualités 4 × 112,25 € / 6 × 74,99 €.
- **Navbar** : CTA « Mon Espace » → `https://perso.yogyface.fr` (plus « Liste d'attente »).

### 🐛 Fixed

- **SEO HTML** : les URLs propres servent le fichier SSG (`/programme` → `programme.html`), plus le fallback SPA. 404 réelle. 301 `*.html` → URL propre. 301 `/yogyface-reset` → `/programme`, `/pol-co` → `/`.

## 2026-10-12

### 🔧 Changed

- **Atelier** : plus de dédoublonnage email — chaque inscription crée une nouvelle fiche Airtable.
- **Canonique www** : `yogyface.fr` → `www.yogyface.fr` (301). Sitemap, canonical, JSON-LD et robots alignés.
- **Vite local** : écoute IPv4+IPv6 sur **5173** (`strictPort`). Plus de restart à chaque touch de `.env.local`.

### ✨ Added

- **Tunnel acquisition** (ex-Systeme.io) : `/atelier-gratuit`, `/confirmation-inscription`, `/video-01` `/02` `/03`, `/replay-gratuit`, `/confirmation-achat-bienvenue`. Hors nav, sitemap et Google (`noindex` + `robots.txt` + `X-Robots-Tag`). Opt-in → base Airtable atelier (`AIRTABLE_ATELIER_BASE_ID` / `AIRTABLE_ATELIER_TABLE_ID`).
- **Tunnel cadeaux / vidéos** : `/video-123`, `/cadeau1` (routine skincare), `/cadeau2` (ebook médecine chinoise), `/cadeau3` (podcast YouTube), `/cadeaux-123`. Même noindex et chrome réduit.
- **Miniatures bonus** : posters `/videos/funnel-bonus-01.png` `/02` `/03` sur `/video-01` `/02` `/03` et `/video-123`.
- **`/video-01` `/02` `/03`** : playlist à droite (miniatures nettes / floutées selon le jour du drip). WhatsApp + espace perso en 2 étapes, sur les 3 pages. Point live clignotant + CTA qui pulse.
- **Live atelier** : badge « Mardi [date] à 20h » (Paris). Passé 20h le mardi → mardi suivant.
- **`/atelier-gratuit`** : formulaire en popup (clic + auto au scroll), 2e CTA en bas, footer légal (mentions / confidentialité / CGV). Photos originales Systeme.io : collage Laury + visages fondus au hero, 3 photos au-dessus des cartes « TU VAS apprendre ». Wash rose continu sous le header (plus de coupure blanche). Espacement resserré entre le CTA et « TU VAS apprendre ». Opt-in : ISO pays → `Country`. UTM / ads (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `campaign_id`, `campaign_name`, `adset_id`, `ad_name`, `adgroup_name`, `placement`) si présents dans l’URL.
- **Légal depuis le tunnel** : `?from=funnel` — logo seul, pas de menu site, retour à l’atelier.

## 2026-10-08

### 🔧 Changed

- **`/vente` (Studio)** : tarif **499 €** (999 € barré). Mensualités 4 × 124,75 € / 6 × 83,17 €.

## 2026-09-26

### ✨ Added

- **`/installer-app`** : tutos iPhone et Android pour installer YoGyFace sur l’écran d’accueil. Sans bandeau ni CTA liste d’attente.

## 2026-09-22

### 🔧 Changed

- **`/vente-vip`** : ventes VIP fermées — page conservée, plus de checkout. CTA vers `/vente`. API refuse les plans `vip-*`.

## 2026-09-15

### 🔧 Changed

- **`/vente` (Studio)** : tarif **299 €** (999 € barré), sans bonus VIP. Mensualités 4 × 74,99 € / 6 × 49,99 € (plus de 10×).
- **`/vente` hero** : photo calée en haut, badge 50 places, titre mobile au-dessus, offre regroupée (prix + inclus + CTA) — plus de répétition 299 € / 4×.
- **`/merci-achat`** : « Ton inscription est validée » (plus « offre VIP ») — même page pour Studio et VIP.

### ✨ Added

- **Meta Purchase** : pixel + CAPI (`Purchase`) à l'achat VIP / Studio — webhook Stripe + `/merci-achat`, même `event_id`. Mensualités 2..N : pas de 2e Purchase.

## 2026-09-14

### ✨ Added

- **Mail 23 (M8 soir non VIP)** : template AC `emails/launch/final/email23-m8-non-vip.html` — dernières heures minuit, 2 CTA `/vente`, 499 €.
- **Mail 22 (M7 matin non VIP)** : template AC `emails/launch/final/email22-m7-non-vip.html` — dernier jour minuit, 2 CTA `/vente`, 499 €, mosaïque, « Moins de 10 places ».
- **Mail 21 (M6 non VIP)** : template AC `emails/launch/final/email21-m6-non-vip.html` — FAQ, 2 CTA `/vente`, 499 € jusqu'à demain soir.
- **Mail 20 (M5 non VIP)** : template AC `emails/launch/final/email20-m5-non-vip.html` — accompagnement vs bibliothèque, 1 CTA `/vente`, tarif de lancement « 2 jours ».
- **Mail 19 (M4 soir non VIP)** : template AC `emails/launch/final/email19-m4-soir-non-vip.html` — FOMO places, récap, 2 CTA `/vente`, 499 € jusqu'au 15 sept.
- **Mail 18 (M3 matin non VIP)** : template AC `emails/launch/final/email18-m3-non-vip.html` — ouverture publique, 2 CTA `/vente`, 499 € jusqu'au 15 sept., visuels mail-4 + `mail-2-programme.jpg`.

### 🔧 Changed

- **`/vente`** : ticker en haut (comme VIP) + pastille « 50 places dispos max / jusqu'au 18 septembre » sous les CTA.
- **`/vente-vip`** : paiement 6 × 49,99 € + rareté « Plus que 2 places disponibles ». `max_invoices` aussi sur la Checkout Session (webi).
- **Checkout 1×** : plus de `setup_future_usage` tant que l'upsell est coupé — Stripe n'affiche plus « ce paiement et ceux à venir » sur VIP 299 € / Studio 499 €.
- **VIP 3× / mensualités** : le schedule `from_subscription` restait en « forever » (update 400 : `start_date` + `duration`). Retry si le schedule existe déjà, 3 échéances puis `cancel`.
- **Mail 15 (M7 VIP)** : « Moins de 10 places disponibles » sous le 1er CTA (aligné `/vente-vip`).

## 2026-09-12

### 🔧 Changed

- **DataFast** : plus de `?session_id=` sur `/merci-achat` (et strip avant init) — le webhook Stripe + metadata suffisent, sinon chaque achat était doublé.
- **`/vente-vip` CTA** : « Moins de 10 places disponibles sur 50 » + fermeture lundi soir 14 septembre, 00h.

### ✨ Added

- **Mail 17 (M2 non VIP)** : template AC `emails/launch/final/email17-m2-non-vip.html` — diagnostic / cause, mockup exos `mail-2-programme.jpg`, portes demain / 50 places. Pas de CTA.
- **Mail 16 (M8 VIP)** : template AC `emails/launch/final/email16-m8-vip.html` — dernières heures / minuit, 2 CTA `/vente-vip`, comparatif `mail-10-diagnostic.jpg`.
- **Mail 15 (M7 VIP)** : template AC `emails/launch/final/email15-m7-vip.html` — dernier jour minuit, 2 CTA `/vente-vip`, comparatif + mosaïque avant/après `mail-m7-mosaique.jpg`.
- **Mail 14 (M6 VIP)** : template AC `emails/launch/final/email14-m6-vip.html` — FAQ, ferme 24h, 2 CTA `/vente-vip`, comparatif `mail-10-diagnostic.jpg`.
- **Mail 13 (J-2)** : template AC `emails/launch/final/email13-j2.html` — refonte diagnostic, mockup exos `mail-2-programme.jpg`, avant/après Peggy + Emmanuelle. Pas de CTA.

## 2026-09-11

### ✨ Added

- **`/vente-vip` CTA** : « Seulement 50 places disponibles » au-dessus des boutons d'achat, pastille verte ping + bounce.
- **Mail 12 (M5 VIP)** : template AC `emails/launch/final/email12-m5-vip.html` — habitude 10 min, FOMO 48h, CTA `/vente-vip`, comparatif `mail-10-diagnostic.jpg`.
- **Mail 11 (M4 soir VIP)** : template AC `emails/launch/final/email11-m4-soir-vip.html` — FOMO places, récap VIP, CTA `/vente-vip`, comparatif `mail-10-diagnostic.jpg`.
- **Mail 10 (ouverture VIP)** : template AC `emails/launch/final/email10-ouverture-vip.html` — CTA `/vente-vip`, visuels mail-4 + mail-2-programme + `mail-10-diagnostic.jpg`.

### 🐛 Fixed

- **`/vente-vip`** : chaîne « Paiement sécurisé Stripe » coupée dans `vente-offre.jsx` (syntaxe cassée, page KO).

### 🔧 Changed

- **Stripe** : metadata `version=v2` sur chaque Checkout (VIP / Studio) — pas d'exos RESET V1.
- **VIP prévente** : app dès l'achat, diagnostic à partir du 17 septembre (hero, comparatif, FAQ, merci).
- **Upsell 1:1** : désactivé (`UPSELL_ENABLED = false`). Après paiement → `/merci-achat` directement.
- **VIP hero mobile** : titre « Vente privée / ouverte » au-dessus de la photo.
- **Preuve sociale** : 700+ → 1200+ femmes accompagnées (vente, transformations, about, liste d'attente).
- **Vente étapes** : photos recadrées sur le visage (plus le bandeau blanc du studio).
- **Vente résultats mobile** : note 4.9 centrée, carte avant/après centrée, légende complète, CTA non coupé.
- **VIP comparatif mobile** : 2 colonnes (critère + VIP), public en légende sous chaque ligne. Plus de texte coupé.
- **Mail 12 (M5)** : gras, souligné, puces, 2 CTA, prix 299 €.
- **VIP** : 299 € au lieu de 999 € ; colonne lancement public à 999 € aussi. Mention « 700 € de moins » retirée.
- **Mail 10/11 visuel** : `mail-10-diagnostic.jpg` remplacé (comparatif 299 / 999, même URL).
- **CGV art. 6** : 14 jours dans tous les cas, pas de renonciation (pas de case au checkout). Situations exceptionnelles laissées vagues.
- **CGV art. 11** : 12 lives, 2 par mois mini, dont 3 FAQ inclus dans les 12.
- **`/vente-vip` comparatif** : colonne « Après lancement » retirée ; ligne Programme sous Diagnostic (2e programme offert à 6 mois). Prix VIP : 299 € en vert, 999 € barré. Lancement public : 999 €.

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
