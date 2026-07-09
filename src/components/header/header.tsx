import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useInView } from '../../hooks/useInView'
import logoImage from '../../assets/logo_referencia_legal.png'
import './header.css'
import './header.responsive.css'
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
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        if (!menuOpen) {
            document.body.classList.remove('menu-open')
            return
        }

        document.body.classList.add('menu-open')

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setMenuOpen(false)
            }
        }

        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.classList.remove('menu-open')
        }
    }, [menuOpen])

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
                    <div className="header-contact-row header-contact-row-desktop">
                      <WhatsAppButton showClassic={true} />
                      <SocialLinks />
                    </div>

                    <button
                        aria-controls="primary-navigation"
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                        className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        type="button"
                    >
                        <FontAwesomeIcon className="menu-toggle-icon" icon={menuOpen ? faXmark : faBars} />
                    </button>

                    <div
                        aria-hidden={!menuOpen}
                        className={`mobile-menu-overlay${menuOpen ? ' is-visible' : ''}`}
                        onClick={() => setMenuOpen(false)}
                    />

                    <nav
                        aria-hidden={!menuOpen}
                        aria-label="Navegación principal"
                        className={`navbar${menuOpen ? ' is-open' : ''}`}
                        id="primary-navigation"
                        role="dialog"
                    >
                        <div className="mobile-menu-header">
                            <NavLink className="mobile-menu-logo-link" to="/" onClick={() => setMenuOpen(false)}>
                                <img
                                    alt="Referencia Legal"
                                    className="header-logo"
                                    src={logoImage}
                                />
                            </NavLink>
                        </div>
                        <div className="mobile-menu-actions">
                          <SocialLinks />
                        </div>
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
                                        onClick={() => setMenuOpen(false)}
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
