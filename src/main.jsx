import { ViteReactSSG } from 'vite-react-ssg'
import { Navigate } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import { articles } from './lib/articles'

// Helper : route React Router "lazy" à partir d'un export default de page.
// L'import() est écrit en clair pour que vite-react-ssg détecte le chunk au build.
const page = (loader) => () => loader().then((m) => ({ Component: m.default }))

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      // Home reste en eager pour le LCP (page la plus visitée).
      { index: true, element: <Home /> },
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'programme', lazy: page(() => import('./pages/Programme')) },
      { path: 'transformations', lazy: page(() => import('./pages/Transformations')) },
      { path: 'faq', lazy: page(() => import('./pages/FAQ')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: 'articles', lazy: page(() => import('./pages/Articles')) },
      {
        path: 'articles/:slug',
        lazy: page(() => import('./pages/ArticleDetail')),
        // Liste des pages d'articles à prérendre au build.
        getStaticPaths: () => articles.map((a) => `articles/${a.slug}`),
      },
      { path: 'liste-attente', lazy: page(() => import('./pages/ListeAttente')) },
      { path: 'mentions-legales', lazy: page(() => import('./pages/MentionsLegales')) },
      { path: 'cgv', lazy: page(() => import('./pages/CGV')) },
      { path: 'confidentialite', lazy: page(() => import('./pages/Confidentialite')) },
      // Événements masqués temporairement : routes redirigées vers l'accueil.
      { path: 'evenements', element: <Navigate to="/" replace /> },
      { path: 'evenements/:id', element: <Navigate to="/" replace /> },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
]

export const createRoot = ViteReactSSG({ routes })
