import type { FC } from 'react'
import './team.css'
import './team.responsive.css'
import '../../common.css'
import '../../common.responsive.css'
import melisaImg from '../../assets/team/Melisa.webp'
import carolinaImg from '../../assets/team/Carolina.webp'
import santiagoImg from '../../assets/team/Santiago.webp'
import cristianImg from '../../assets/team/Cristian.webp'
import check from '../../assets/team/check.webp'


export const Team: FC = () => {
  return (
    <>
      <section id='team' className='team'>
        <div className='team-content max-width'>
          <h2 className='alternative-title'>NUESTRO EQUIPO DE EXPERTOS</h2>
          <div className='team-members'>
            <div className='team-member'>
              <img src={melisaImg} alt="MELISA ARBOLEDA OSPINA" />
              <h3>MELISA ARBOLEDA OSPINA</h3>
              <p>Directora Jurídica</p>
            </div>
            <div className='team-member'>
              <img src={cristianImg} alt="CRISTIAN TORRES" />
              <h3>CRISTIAN TORRES</h3>
              <p>Director Administrativo y Comercial</p>
            </div>
            <div className='team-member'>
              <img src={carolinaImg} alt="CAROLINA RESTREPO" />
              <h3>CAROLINA RESTREPO</h3>
              <p>Abogada Especialista</p>
            </div>
            <div className='team-member'>
              <img src={santiagoImg} alt="SANTIAGO CARDONA" />
              <h3>SANTIAGO CARDONA</h3>
              <p>Auxiliar Jurídico</p>
            </div>
          </div>
        </div>
      </section>

      <section id='principles' className='principles'>
        <div className='principles-content max-width'>
          <h2 className='alternative-title'>PRINCIPIOS Y VALORES</h2>
          <div className='principles-cards'>
            <div className='principle-card'>
              <div className='principle-card-header'>
                <h3>Comunicación y transparencia</h3>
                <img src={check} alt="Check" />
              </div>
              <p>Mantenemos una comunicación constante, asegurando que comprendas cada etapa de tu proceso.</p>
            </div>
            <div className='principle-card'>
              <div className='principle-card-header'>
                
                <h3>Compromiso</h3>
                <img src={check} alt="Check" />
              </div>
              <p>Nuestro compromiso es tu bienestar, siempre priorizando tus necesidades e intereses en cada acción.</p>
            </div>
            <div className='principle-card'>
              <div className='principle-card-header'>
                <h3>Criterio ético y moral</h3>
                <img src={check} alt="Check" />
              </div>
              <p>Seleccionamos cada caso con responsabilidad ética, ofreciendo un servicio honesto, justo y respetuoso de la ley.</p>
            </div>
            <div className='principle-card'>
              <div className='principle-card-header'>
                <h3>Procesos humanizados</h3>
                <img src={check} alt="Check" />
              </div>
              <p>Humanizamos cada proceso, asegurando claridad en cada decisión y priorizando siempre tu bienestar.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
