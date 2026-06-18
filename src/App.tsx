import './App.css'
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/header/header'

const Home = lazy(() => import('./components/home/home.tsx').then(module => ({ default: module.Home })))
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
            <Route path="/equipo" element={<Team />} />
            <Route path="/nosotros" element={<AboutMe />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default App
