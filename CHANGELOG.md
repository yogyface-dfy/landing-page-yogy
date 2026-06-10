# Changelog

## 2026-06-10

### 🔧 Changed
- Page Programme : section R.E.S.E.T™ passée du fond noir au fond crème (cartes piliers blanches), cartes des 6 étapes redessinées (ombre douce, liseré corail, numéro en badge plein, effet hover), phrases italiques de détail agrandies (15/17px), et texte de l'étape 03 reformulé (routine 4 semaines renouvelée sur 6 mois, progression douce).

### 📚 Documentation
- Ajout de `docs/strategie-seo-6-mois.md` : stratégie SEO complète sur 6 mois (mots-clés, roadmap, plan éditorial 20 articles, netlinking, KPIs).

### 🚀 Improved
- Optimisation des performances (PageSpeed) : polices Google chargées en asynchrone (~1150 ms de blocage de rendu en moins), conversion de toutes les images de contenu en WebP (~1,8 Mo économisés, -57%), et code-splitting des routes via `React.lazy` + `Suspense` (Home reste en eager pour le LCP, -43 Kio de JS au chargement initial).

### 🔧 Changed
- Masquage temporaire de la page Événements (données manquantes) : lien retiré de la navbar et du footer, routes `/evenements` et `/evenements/:id` redirigées vers l'accueil, marques du bandeau "Elles m'ont fait confiance" affichées sans lien, entrées Événements retirées du sitemap. Les pages `Evenements.jsx` et `EvenementDetail.jsx` sont conservées pour réactivation ultérieure.
