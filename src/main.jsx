import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programme from './pages/Programme'
import Transformations from './pages/Transformations'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import ListeAttente from './pages/ListeAttente'
import MentionsLegales from './pages/MentionsLegales'
import CGV from './pages/CGV'
import Confidentialite from './pages/Confidentialite'
import NotFound from './pages/NotFound'

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
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)
