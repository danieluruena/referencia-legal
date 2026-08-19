import './contact.css'
import './contact.responsive.css'
import '../../common.css'
import { WhatsAppButton } from '../whatsappButton/whatsappButton'
import { Turnstile } from '@marsidev/react-turnstile'
import { useState } from 'react'
import { useMetaTags } from '../../hooks/useMetaTags'
import { SubmitModal } from './submitModal/submitModal'

type FieldErrors = {
  name?: string
  phone?: string
  email?: string
  message?: string
  turnstileToken?: string
}

type ContactFormData = {
  name: string
  phone: string
  email: string
  message: string
}

export function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [turnstileToken, setToken] = useState('')
  
  useMetaTags({
    title: 'Contacto | Referencia Legal',
    description: 'Contáctanos para solicitar una asesoría legal profesional en derecho de familia. Recibirás atención personalizada y humana.',
    image: 'https://referencialegal.com/og-image.png',
    url: 'https://referencialegal.com/contacto',
  })

  const extractFormValues = (form: HTMLFormElement): ContactFormData => {
    const name = form.elements.namedItem('name') as HTMLInputElement
    const phone = form.elements.namedItem('phone') as HTMLInputElement
    const email = form.elements.namedItem('email') as HTMLInputElement
    const message = form.elements.namedItem('message') as HTMLTextAreaElement

    return {
      name: name.value.trim(),
      phone: phone.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    }
  }

  const validateForm = (formValues: ContactFormData): boolean => {
    const errors: FieldErrors = {}

    if (!formValues.name) {
      errors.name = 'Este campo es obligatorio'
    } else if (formValues.name.length < 2) {
      errors.name = 'La longitud de este campo debe ser mínimo 2 caracteres'
    } else if (formValues.name.length > 100) {
      errors.name = 'La longitud de este campo debe ser máximo 100 caracteres'
    }

    if (!formValues.phone) {
      errors.phone = 'Este campo es obligatorio'
    } else if (formValues.phone.length < 10) {
      errors.phone = 'La longitud de este campo debe ser mínimo 10 caracteres'
    } else if (formValues.phone.length > 15) {
      errors.phone = 'La longitud de este campo debe ser máximo 15 caracteres'
    }

    if (!formValues.email) {
      errors.email = 'Este campo es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = 'Este campo debe tener el siguiente formato: correo@ejemplo.com'
    }

    if (!formValues.message) {
      errors.message = 'Este campo es obligatorio'
    } else if (formValues.message.length < 10) {
      errors.message = 'La longitud de este campo debe ser mínimo 10 caracteres'
    } else if (formValues.message.length > 5000) {
      errors.message = 'La longitud de este campo debe ser máximo 5000 caracteres'
    }

    if (!turnstileToken) {
      errors.turnstileToken = 'Debes completar la validación de CAPTCHA'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget

    const formValues = extractFormValues(form)
    
    try {
      if (!validateForm(formValues)) {
        return
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formValues, turnstileToken }),
      })

      if (!response.ok) {
        console.error(`Error al enviar el mensaje: ${response.status}`)
        throw new Error('Error al enviar el mensaje')
      }
      

      console.log('Mensaje enviado correctamente')
      form.reset()
      setFieldErrors({})
      setToken('')
      setIsModalOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleFieldChange = (fieldName: keyof FieldErrors) => {
    if (fieldErrors[fieldName]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }
  return (
    <div className="contact">
      <div className="contact-container max-width">
        <h1 className="alternative-title">CONTÁCTENOS</h1>
        <p className="contact-description">Estamos aquí para ayudarte con tus consultas legales. Contáctanos y recibirás asesoría profesional.</p>
        <div className="contact-sub-container">
          <div className="form-container">
            <form action="" className="contact-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <input 
                  className={fieldErrors.name ? 'field-error' : ''} 
                  type="text" 
                  name="name" 
                  id="name" 
                  placeholder='Nombre completo' 
                  aria-invalid={Boolean(fieldErrors.name)} 
                  onChange={() => handleFieldChange('name')}
                />
                {fieldErrors.name && <span className="field-error-message">{fieldErrors.name}</span>}
              </div>
              <div className="form-field">
                <input 
                  className={fieldErrors.email ? 'field-error' : ''} 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder='Correo electrónico' 
                  aria-invalid={Boolean(fieldErrors.email)} 
                  onChange={() => handleFieldChange('email')} 
                />
                {fieldErrors.email && <span className="field-error-message">{fieldErrors.email}</span>}
              </div>
              <div className="form-field">
                <input 
                  className={fieldErrors.phone ? 'field-error' : ''} 
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  placeholder='Teléfono' 
                  aria-invalid={Boolean(fieldErrors.phone)} 
                  onChange={() => handleFieldChange('phone')}
                />
                {fieldErrors.phone && <span className="field-error-message">{fieldErrors.phone}</span>}
              </div>
              <div className="form-field">
                <textarea 
                  className={fieldErrors.message ? 'field-error' : ''} 
                  name="message" 
                  id="message" 
                  placeholder='Mensaje' 
                  rows={3} 
                  aria-invalid={Boolean(fieldErrors.message)} 
                  onChange={() => handleFieldChange('message')}>
                </textarea>
                {fieldErrors.message && <span className="field-error-message">{fieldErrors.message}</span>}
              </div>
              <button className="main-button form-button" type="submit">Enviar mensaje</button>
              <div className={fieldErrors.turnstileToken ? 'turnstile-field field-error' : 'turnstile-field'}>
                <Turnstile
                  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                  onSuccess={(token) => {
                    setToken(token)
                    handleFieldChange('turnstileToken')
                  }}
                />
                {fieldErrors.turnstileToken && <span className="field-error-message">{fieldErrors.turnstileToken}</span>}
              </div>
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
      <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
