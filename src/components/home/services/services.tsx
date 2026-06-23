import './services.css'
import '../../../common.css'
import logoImage from '../../../assets/logo_referencia_legal.png'
import divorciosIcon from '../../../assets/services/divorcios.webp'
import custodiaIcon from '../../../assets/services/custodia.webp'
import pensionIcon from '../../../assets/services/pension.webp'
import liquidacionIcon from '../../../assets/services/liquidacion.webp'
import sucesionesIcon from '../../../assets/services/sucesiones.webp'
import violenciaIcon from '../../../assets/services/violencia.webp'
import unionIcon from '../../../assets/services/union.webp'
import adopcionIcon from '../../../assets/services/adopciones.webp'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Service {
  title: string
  description: string
  icon: string
}

export const Services = () => {
  const servicesData: Service[] = [
    {
      title: 'Divorcios',
      description: 'Soluciones claras que protegen tus derechos y patrimonio.',
      icon: divorciosIcon,
    },
    {
      title: 'Custodia y visitas',
      description: 'Acuerdos justos que cuidan la relación con tus hijos.',
      icon: custodiaIcon,
    },
    {
      title: 'Pensión alimenticia',
      description: 'Acompañamiento claro y profesional en tu proceso.',
      icon: pensionIcon,
    },
    {
      title: 'Liquidación de bienes',
      description: 'División clara y conforme con la ley.',
      icon: liquidacionIcon,
    },
    {
      title: 'Sucesiones',
      description: 'Herencias y sucesiones claras, justas y protegidas por la ley.',
      icon: sucesionesIcon,
    },
    {
      title: 'Violencia intrafamiliar',
      description: 'Protección rápida para tí y tu familia.',
      icon: violenciaIcon,
    },
    {
      title: 'Unión marital de hecho',
      description: 'Reconocimiento y liquidación de sociedades patrimoniales derivadas de la unión libre.',
      icon: unionIcon,
    },
    {
      title: 'Adopciones',
      description: 'Acompañamiento legal seguro.',
      icon: adopcionIcon,
    },
  ]
  return (
    <div className="services max-width" id="servicios">
      <div className="services-head">
        <div className="services-logo">
          <img src={logoImage} alt="Referencia Legal" />
        </div>
        <h2 className="alternative-title">DERECHO DE FAMILIA</h2>
        <p className="services-description">Cada caso lo trabajamos con  experiencia, criterio y  atención personalizada.</p>
      </div>
      <div className="services-items">
        {servicesData.map((serviceData) => (
          <div className="service-item" key={serviceData.title}>
            <img src={serviceData.icon} alt="" className="service-item-icon" />
            <h4 className="service-item-title">{serviceData.title}</h4>
            <p className="service-item-description">{serviceData.description}</p>
            <a href="" className="service-item-link">
              <FontAwesomeIcon icon={faAngleRight} className="carousel-icon"/>
              Más información
            </a>
          </div>
        ))}
      </div>
      <button className="main-button services-button">Agendar consulta</button>
    </div>
  )
}