import './home.css'
import '../../common.css'
import { Hero } from './hero/hero'
import { Slogan } from './slogan/slogan'
import { FeaturedResults } from './featuredResults/featuredResults'
import { Presentation } from './presentation/presentation'
import { Services } from './services/services'
import { useScrollAnimation } from '../../hooks/useScrollanimation'
import { useHashScroll } from '../../hooks/useHashScroll'
import { Testimonies } from './testimonies/testimonies'

export function Home() {
  useScrollAnimation()
  useHashScroll()
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
