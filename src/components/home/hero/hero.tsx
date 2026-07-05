import './hero.css'
import './hero.responsive.css'
import '../../../common.css'
import teamImage from '../../../assets/home/001.webp'
import { whatsappUrl } from '../../../utils/constants'

export const Hero = () => {
  return (
    <div className="hero max-width">
      <div className="hero-description">
        <h1 className="hero-title">Especialistas en Derecho de Familia con enfoque estratégico y humano.</h1>
        <hr />
        <a href={whatsappUrl} className="main-button hero-button">Agendar consulta</a>
      </div>
      <div className="hero-image-container">
        <img src={teamImage} alt="" />
      </div>
    </div>
  )
}