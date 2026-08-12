import { useLocation } from 'react-router-dom'
import { SocialLinks } from '../socialLinks/socialLinks'
import './footer.css'
import './footer.responsive.css'

export const Footer = () => {
  const location = useLocation()

  const isContactPage = location.pathname === '/contacto' || location.pathname === '/contacto/'

  return (
    <footer className="footer">
      <div className="footer-container max-width">
        <div className="footer-main-section">
          <h3 className="footer-title">Referencia Legal</h3>
          <p className="footer-text">Transformamos el derecho en un aliado accesible, claro y humano.</p>
          <div className="footer-contact">
            <a href="mailto:contacto@referencialegal.com">contacto@referencialegal.com</a>
            <a href="tel:+573009439955">+57 300 9439955</a>
          </div>
          <p>©2026 Todos los derechos reservados</p>
        </div>
        <div className={`footer-map-section ${isContactPage ? 'hidden' : ''}`}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4796555704092!2d-75.57509012323992!3d6.200275726831413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4683b191a30f69%3A0x7fa8cbb878de554c!2sReferencia%20Legal!5e0!3m2!1ses-419!2sco!4v1782349732362!5m2!1ses-419!2sco" width="600" height="450" loading="lazy"></iframe>
        </div>
        <div className={`footer-location-section ${isContactPage ? 'hidden' : ''}`}>
          <div className="footer-social-links">
            <SocialLinks />
          </div>
          <div className="footer-location-address">
            <b>Dirección:</b>
            <p className="footer-text">Carrera 42 #3 sur - 81, piso 15 Milla de Oro</p>
            <p className="footer-text">Medellín, Antioquia</p>
            <b>Horarios de atención:</b>
            <p>Lunes a Viernes de 8am a 6pm</p>
            <br />
            <b>Atención presencial solo con cita previa</b>
          </div>
        </div>
      </div>
    </footer>)
}