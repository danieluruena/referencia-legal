import React, { useEffect } from 'react'
import './submitModal.css'
import '../../../common.css'

interface SubmitModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
          <div className="modal-content">
            <h2 className="alternative-title modal-title">Mensaje Enviado</h2>
            <p className="modal-message">
              Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto pronto.
            </p>
            <button className="main-button modal-button" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
