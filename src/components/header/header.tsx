import { NavLink } from 'react-router-dom'
import { useInView } from '../../hooks/useInView'
import logoImage from '../../assets/logo_referencia_legal.png'
import './header.css'
import '../../common.css'
import { SocialLinks } from '../socialLinks/socialLinks'
import { WhatsAppButton } from '../whatsappButton/whatsappButton'

const navItems = [
    { label: 'Inicio', to: '/' },
    {
      label: 'Servicios', 
      to: '/#servicios', 
      sectionId: 'servicios', 
    },
    { label: 'Equipo', to: '/equipo' },
    { label: 'Quiénes somos', to: '/nosotros' },
    { label: 'Contáctenos', to: '/contacto' },
]

export const Header = () => {
    const servicesInView = useInView('servicios')

    return (
        <header className="header">
            <div className="header-content max-width">
                <NavLink className="header-logo-link" to="/">
                    <img
                        alt="Referencia Legal"
                        className="header-logo"
                        src={logoImage}
                    />
                </NavLink>

                <div className="header-navigation">
                    <div className="header-contact-row">
                      <SocialLinks />
                      <WhatsAppButton showClassic={true} />
                    </div>

                    <nav className="navbar">
                        <ul className="navbar-list">
                            {navItems.map((navItem) => (
                                <li className="navbar-item" key={navItem.to}>
                                    <NavLink
                                        className={({ isActive }) => {
                                            if (navItem.sectionId) {
                                                return `navbar-link${servicesInView ? ' navbar-link-active' : ''}`
                                            }
                                            return `navbar-link${isActive ? ' navbar-link-active' : ''}`
                                        }}
                                        end={navItem.to === '/'}
                                        to={navItem.to}
                                    >
                                        {navItem.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
