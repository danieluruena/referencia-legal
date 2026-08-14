import './home.css'
import './home.responsive.css'
import '../../common.css'
import { Hero } from './hero/hero'
import { Slogan } from './slogan/slogan'
import { FeaturedResults } from './featuredResults/featuredResults'
import { Presentation } from './presentation/presentation'
import { Services } from './services/services'
import { useScrollAnimation } from '../../hooks/useScrollanimation'
import { useHashScroll } from '../../hooks/useHashScroll'
import { useMetaTags } from '../../hooks/useMetaTags'
import { Testimonies } from './testimonies/testimonies'

export function Home() {
  useScrollAnimation()
  useHashScroll()
  useMetaTags({
    title: 'Referencia Legal | Derecho de Familia en Medellín',
    description: 'Firma de abogados en Medellín especializada en derecho de familia: divorcios, custodia, pensión alimenticia, sucesiones y más. Asesoría clara y humana.',
    image: 'https://referencialegal.com/og-image.png',
    url: 'https://referencialegal.com/',
  })
  return (
    <div className="home">
      <div className="home-container">
        <Hero />
        <hr />
        <Slogan />
        <FeaturedResults />
        <Presentation />
        <hr />
        <Services />
        <Testimonies />
      </div>
    </div>
  )
}
