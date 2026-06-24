import './hero.css'
import '../../../common.css'
import teamImage from '../../../assets/home/001.webp'

export const Hero = () => {
    return (
      <div className="hero max-width">
        <div className="hero-description">
          <h1 className="hero-title">Especialistas en Derecho de Familia con enfoque estratégico y humano.</h1>
          <hr />
          <button className="main-button hero-button">Agendar consulta</button>
        </div>
        <div className="hero-image-container">
          <img src={teamImage} alt="" />
        </div>
      </div>
    )
}