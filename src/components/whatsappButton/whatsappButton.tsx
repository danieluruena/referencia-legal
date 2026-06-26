import { whatsappUrl } from '../../utils/constants'
import './whatsappButton.css'

interface WhatsAppButtonProps {
  showClassic: boolean
}

export const WhatsAppButton = ({ showClassic = false }: WhatsAppButtonProps) => {
  return (
    <>
      {showClassic ? (
        <a href={whatsappUrl} target="_blank" className="whatsapp-classic-button">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Contáctanos
        </a>
      ) : (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-button"
          aria-label="Contactar por WhatsApp"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
      )}
    </>
  )
}
