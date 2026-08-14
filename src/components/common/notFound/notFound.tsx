import { Link } from 'react-router-dom'
import { useMetaTags } from '../../../hooks/useMetaTags'
import './notFound.css'
import '../../../common.css'

export const NotFound = () => {
  useMetaTags({
    title: 'Página no encontrada | Referencia Legal',
    description: 'La página que buscas no existe o fue movida. Vuelve al inicio de Referencia Legal para conocer nuestros servicios de derecho de familia.',
    url: 'https://referencialegal.com/',
  })

  return (
    <div className="not-found">
      <div className="not-found-content max-width">
        <h1 className="not-found-code">404</h1>
        <h2 className="alternative-title not-found-title">PÁGINA NO ENCONTRADA</h2>
        <p className="not-found-description">
          Lo sentimos, la página que estás buscando no existe o fue movida.
        </p>
        <Link className="main-button not-found-button" to="/">
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
