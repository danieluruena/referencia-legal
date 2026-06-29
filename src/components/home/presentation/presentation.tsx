import './presentation.css'
import '../../../common.css'
import videoPauta from '../../../assets/home/pauta.webm'
import videoPautaThumbnail from '../../../assets/home/pauta-thumbnail.webp'
import { VideoPlayer } from '../../common/videoPlayer/videoPlayer'

export const Presentation = () => {
  return (
    <div className="presentation max-width">
      <div className="presentation-video-container">
        <div className="video-wrapper">
          <VideoPlayer videoUrl={videoPauta} thumbnail={videoPautaThumbnail}/>
        </div>
      </div>
      <div className="presentation-description">
        <h1 className="alternative-title">EN REFERENCIA LEGAL</h1>
        <p>Entendemos el Derecho de Familia como una herramienta clara y humana, con el bienestar de tu familia como nuestra prioridad. Con un enfoque estratégico y cercano, acompañamos cada proceso con experiencia, transparencia y rigor.</p>
      </div>
    </div>
  )
}