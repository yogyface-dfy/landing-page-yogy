import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'

// Code-splitting : pages chargées à la demande (Home reste en eager pour le LCP)
const About = lazy(() => import('./pages/About'))
const Programme = lazy(() => import('./pages/Programme'))
const Transformations = lazy(() => import('./pages/Transformations'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))
const ListeAttente = lazy(() => import('./pages/ListeAttente'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const CGV = lazy(() => import('./pages/CGV'))
const Confidentialite = lazy(() => import('./pages/Confidentialite'))
// Événements masqué temporairement (données manquantes) — pages conservées, routes redirigées
const NotFound = lazy(() => import('./pages/NotFound'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="programme" element={<Programme />} />
            <Route path="transformations" element={<Transformations />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="liste-attente" element={<ListeAttente />} />
            <Route path="mentions-legales" element={<MentionsLegales />} />
            <Route path="cgv" element={<CGV />} />
            <Route path="confidentialite" element={<Confidentialite />} />
            <Route path="evenements" element={<Navigate to="/" replace />} />
            <Route path="evenements/:id" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
