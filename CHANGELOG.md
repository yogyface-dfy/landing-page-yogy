# Changelog

## 2026-08-07

### 🔧 Changed

- **Politique de confidentialité (`/confidentialite`)** : mise à jour pour couvrir les 3 domaines (yogyface.fr, www.yogyface.fr, webi.yogyface.fr). Art. 1 (périmètre), art. 2 (inventaire réel des données du parcours + bloc bien-être physique/santé), art. 5 (sous-traitants réels : Supabase, Airtable, Resend, Make, CloudFront, Meta, PostHog…), art. 6 (suppression du « Privacy Shield » invalidé → Data Privacy Framework + clauses contractuelles types ; Supabase/Resend en Irlande donc UE), art. 7 (ajout du journal d'utilisation, 25 mois). Date « mise à jour » → août 2026.

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
