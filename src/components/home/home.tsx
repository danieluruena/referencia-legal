import './home.css'
import '../../common.css'
import teamImage from '../../assets/home/001.webp'
import iconImage from '../../assets/icon.webp'

export function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-hero max-width">
          <div className="home-description">
            <h1 className="home-title">Especialistas en Derecho de Familia con enfoque estratégico y humano.</h1>
            <hr />
            <button className="main-button">Agendar consulta</button>
          </div>
          <div className="image-container">
            <img src={teamImage} alt="" />
          </div>
        </div>
        <hr />
        <div className="slogan max-width">
          <div className="slogan-icon">
            <img src={iconImage} alt="" />
          </div>
          <p>Transformamos el Derecho de Familia en un proceso claro y cercano.</p>
        </div>
      </div>
    </div>
  )
}
