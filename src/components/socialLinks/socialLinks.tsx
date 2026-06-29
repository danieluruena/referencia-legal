import {
    faFacebook,
    faInstagram,
    faLinkedinIn,
    faTiktok,
    faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './socialLinks.css'

export const SocialLinks = () => {
  const socialLinks = [
      {
          label: 'Facebook',
          href: 'https://www.facebook.com/profile.php?id=61566707771089',
          icon: faFacebook,
      },
      {
          label: 'Instagram',
          href: 'https://www.instagram.com/referencia.legal/',
          icon: faInstagram,
      },
      {
          label: 'TikTok',
          href: 'https://www.tiktok.com/@referencialegal',
          icon: faTiktok,
      },
      {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/company/referencia-legal/',
          icon: faLinkedinIn,
      },
      {
          label: 'YouTube',
          href: 'https://www.youtube.com/@ReferenciaLegalmde',
          icon: faYoutube,
      },
  ]

  return (
    <div className="social-links">
        <ul className="social-list">
            {socialLinks.map((socialLink) => (
                <li className="social-item" key={socialLink.label}>
                    <a
                        className="social-link"
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
  )
}