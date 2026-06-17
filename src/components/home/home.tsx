import './home.css'
import '../../common.css'

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
            <img src="./src/assets/home/001.webp" alt="" />
          </div>
        </div>
        <hr />
        <div className="slogan max-width">
          <div className="slogan-icon">
            <img src="./src/assets/icon.webp" />
          </div>
          <p>Transformamos el Derecho de Familia en un proceso claro y cercano.</p>
        </div>
      </div>
    </div>
  )
}
