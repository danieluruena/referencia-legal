import './slogan.css'
import './slogan.responsive.css'
import '../../../common.css'
import iconImage from '../../../assets/icon.webp'

export const Slogan = () => {
  return (
    <div className="slogan">
      <div className="slogan-container max-width">
        <div className="slogan-icon">
          <img src={iconImage} alt="" />
        </div>
        <p>Transformamos el Derecho de Familia en un proceso claro y cercano.</p>
      </div>
    </div>
  )
}