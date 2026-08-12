import type { FC } from 'react'
import './aboutUs.css'
import './aboutUs.responsive.css'
import '../../common.css'
import misionImg from '../../assets/aboutUs/mision.webp'
import visionImg from '../../assets/aboutUs/vision.webp'

export const AboutUs: FC = () => {
  return (
    <div className='about-us'>
      <section className='about-section-mission'>
        <div className='about-section-content'>
          <div className='about-image'>
            <img src={misionImg} alt='Nuestra misión' />
          </div>

          <div className='about-text-content'>
            <h2 className='alternative-title'>NUESTRA MISIÓN</h2>
            <p>
              En Referencia Legal ejercemos la práctica jurídica con excelencia, rigor y un profundo compromiso por la protección de los intereses de quienes representamos. Somos una firma especializada en Derecho de Familia, Infancia y Adolescencia, área en la que articulamos experticia técnica con una comprensión humana y sensible de los contextos personales, Nuestra visión integral del derecho nos permite también ofrecer soluciones jurídicas sólidas en múltiples áreas del derecho , siempre orientadas a la defensa del interés legítimo de nuestros clientes. Trabajamos con integridad, empatía y visión estratégica para acompañar y representar con solvencia cada proceso legal, promoviendo una justicia más cercana, eficaz y consciente de la realidad de quienes confían en nosotros.
            </p>
          </div>
        </div>
      </section>

      <section className='about-section-vision'>
        <div className='about-section-content'>
          <div className='about-text-content'>
            <h2 className='alternative-title'>NUESTRA VISIÓN</h2>
            <p>
              Consolidarnos como una firma de abogados que sirva de referencia nacional por nuestra alta calidad en la prestación de servicios en Derecho de Familia, Infancia y Adolescencia, así como por nuestra capacidad y excelencia al momento de ofrecer un servicio legal integral, ético en diversas ramas del derecho. Aspiramos a transformar el ejercicio de la abogacía mediante una práctica orientada al impacto social, la confianza profesional y la construcción de soluciones jurídicas innovadoras, humanas y sostenibles. Nuestro objetivo es ser aliados estratégicos de quienes enfrentan desafíos legales, ofreciendo claridad, respaldo y seguridad en cada etapa de su camino.
            </p>
          </div>

          <div className='about-image'>
            <img src={visionImg} alt='Nuestra visión' />
          </div>
        </div>
      </section>
    </div>
  )
}
