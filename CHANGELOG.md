# Changelog

## 2026-06-11

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
