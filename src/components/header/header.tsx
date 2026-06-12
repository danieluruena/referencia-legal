import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { socialLinks } from './header.data'
import logoImage from '../../assets/logo_referencia_legal.png'
import './header.css'
import '../../common.css'

const navItems = [
    { label: 'Inicio', to: '/' },
    { label: 'Servicios', to: '/services' },
    { label: 'Equipo', to: '/team' },
    { label: 'Quiénes somos', to: '/about-me' },
    { label: 'Contáctenos', to: '/contact' },
]

export const Header = () => {
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
                      <div className="header-social-links">
                            <ul className="header-social-list">
                                {socialLinks.map((socialLink) => (
                                    <li className="header-social-item" key={socialLink.label}>
                                        <a
                                            className="header-social-link"
                                            href={socialLink.href}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <FontAwesomeIcon icon={socialLink.icon} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <nav className="navbar">
                        <ul className="navbar-list">
                            {navItems.map((navItem) => (
                                <li className="navbar-item" key={navItem.to}>
                                    <NavLink
                                        className={({ isActive }) => 
                                            `navbar-link${isActive ? ' navbar-link-active' : ''}`
                                        }
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
