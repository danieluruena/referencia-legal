import './contact.css'
import './contact.responsive.css'
import '../../common.css'
import { WhatsAppButton } from '../whatsappButton/whatsappButton'

export function Contact() {
  return (
    <div className="contact">
      <div className="contact-container max-width">
        <h1 className="alternative-title">CONTÁCTENOS</h1>
        <p className="contact-description">Estamos aquí para ayudarte con tus consultas legales. Contáctanos y recibirás asesoría profesional.</p>
        <div className="contact-sub-container">
          <div className="form-container">
            <form action="" className="contact-form" method='POST'>
              <input type="text" name="fullName" id="fullName" placeholder='Nombre completo' />
              <input type="email" name="email" id="email" placeholder='Correo electrónico' />
              <input type="tel" name="phone" id="phone" placeholder='Teléfono' />
              <textarea name="question" id="question" placeholder='Consulta' rows={3}></textarea>
              <button className="main-button form-button" type="submit">Enviar mensaje</button>
            </form>
          </div>
          <div className="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.4796555704092!2d-75.57509012323992!3d6.200275726831413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4683b191a30f69%3A0x7fa8cbb878de554c!2sReferencia%20Legal!5e0!3m2!1ses-419!2sco!4v1782349732362!5m2!1ses-419!2sco" width="600" height="450" loading="lazy"></iframe>
          </div>
          <div className="address-container">
            <div className="footer-location-address">
              <b>Dirección:</b>
              <p className="footer-text">Carrera 42 #3 sur - 81, piso 15 Milla de Oro</p>
              <p className="footer-text">Medellín, Antioquia</p>
              <b>Horarios de atención:</b>
              <p>Lunes a Viernes de 8am a 6pm</p>
              <br />
              <b>Atención presencial solo con cita previa</b>
            </div>
            <WhatsAppButton showClassic={true} />
          </div>
        </div>
      </div>
    </div>
  )
}
