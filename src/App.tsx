import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header/header'

const Home = lazy(() => import('./components/home/home.tsx').then(module => ({ default: module.Home })))
const Services = lazy(() => import('./components/services/services.tsx').then(module => ({ default: module.Services })))
const Team = lazy(() => import('./components/team/team.tsx').then(module => ({ default: module.Team })))
const AboutMe = lazy(() => import('./components/aboutMe/aboutMe.tsx').then(module => ({ default: module.AboutMe })))
const Contact = lazy(() => import('./components/contact/contact.tsx').then(module => ({ default: module.Contact })))

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Suspense fallback={<div className="loading-spinner">Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/about-me" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
