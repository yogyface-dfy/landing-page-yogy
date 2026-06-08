# YoGyFace — Landing Page

Repo de la landing page YoGyFace, inspirée du design de [Glow Ritual Studio](https://www.glowritualstudio.com/).

## Stack

- **React 18** + **React Router v6** (SPA multi-pages)
- **Vite** (bundler)
- **Tailwind CSS v3** (styling)
- **Inter** (body) + **League Spartan** (display/titres) + **Cormorant Garamond** (serif)

## Palette couleurs (tokens Tailwind)

| Token       | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| `noir`      | `#1A1A1A` | Texte principal, fonds sombres |
| `corail`    | `#E6726A` | Accent principal, CTA          |
| `bordeaux`  | `#841435` | Accent secondaire              |
| `orange`    | `#E6936A` | Accent chaud                   |
| `rose`      | `#FFCDCD` | Fond léger, badges             |
| `bleu`      | `#CAD3F8` | Fond léger, accents froids     |
| `creme`     | `#FCF3F2` | Fond sections alternées        |
| `gris`      | `#6B6B6B` | Texte secondaire               |

## Pages

| Route             | Composant          | Description                      |
|-------------------|--------------------|----------------------------------|
| `/`               | `Home`             | Page d'accueil complète          |
| `/about`          | `About`            | Histoire de Laury & YoGyFace     |
| `/programme`      | `Programme`        | Détail de la méthode RESET™      |
| `/transformations`| `Transformations`  | Avant/après & témoignages        |
| `/faq`            | `FAQ`              | Questions fréquentes (accordion) |
| `/contact`        | `Contact`          | Formulaire de contact            |
| `/vip`            | `VIP`              | Inscription liste VIP            |
| `/mentions-legales`| `MentionsLegales` | CGU / CGV / Confidentialité      |

## Lancement

```bash
npm install
npm run dev
```

Puis ouvrir [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
├── components/
│   ├── Layout.jsx     # Wrapper + IntersectionObserver animations
│   ├── Navbar.jsx     # Nav fixe + mobile menu
│   └── Footer.jsx     # Footer 4 colonnes
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Programme.jsx
│   ├── Transformations.jsx
│   ├── FAQ.jsx
│   ├── Contact.jsx
│   ├── VIP.jsx
│   └── MentionsLegales.jsx
├── index.css          # Tailwind + composants globaux
└── main.jsx           # Router + entry point
```

## TODO (à intégrer dans Cursor)

- [ ] Remplacer les placeholders avant/après par les vraies photos
- [ ] Connecter le formulaire VIP à ActiveCampaign via Make.com
- [ ] Connecter le formulaire Contact à Make.com
- [ ] Ajouter Meta Pixel ID `604268118937812`
- [ ] Ajouter les vraies stats sociales (Instagram, TikTok, YouTube)
- [ ] Intégrer la vraie vidéo de Laury dans le hero
- [ ] Ajouter les vraies photos de transformations
- [ ] Déployer sur Vercel avec domaine yogyface.fr
- [ ] Ajouter le compteur VIP dynamique (Airtable ou ActiveCampaign)
