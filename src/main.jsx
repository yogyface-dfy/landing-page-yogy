import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programme from './pages/Programme'
import Transformations from './pages/Transformations'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import VIP from './pages/VIP'
import MentionsLegales from './pages/MentionsLegales'
import CGV from './pages/CGV'
import Confidentialite from './pages/Confidentialite'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="programme" element={<Programme />} />
          <Route path="transformations" element={<Transformations />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="vip" element={<VIP />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          <Route path="cgv" element={<CGV />} />
          <Route path="confidentialite" element={<Confidentialite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
