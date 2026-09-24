import './featuredResults.css'
import './featuredResults.responsive.css'
import '../../../common.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import {
  useEffect, useRef, useState,
} from 'react'
import { useInView } from '../../../hooks/useInView'

const useAnimatedCounter = (isInView: boolean, target: number, step: number, interval: number) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) {
      return
    }

    const resetFrame = window.requestAnimationFrame(() => {
      setValue(0)
    })

    const timer = window.setInterval(() => {
      setValue((prev) => {
        if (prev < target) {
          return Math.min(prev + step, target)
        }

        window.clearInterval(timer)
        return prev
      })
    }, interval)

    return () => {
      window.cancelAnimationFrame(resetFrame)
      window.clearInterval(timer)
    }
  }, [
      interval, 
      isInView, 
      step, 
      target,
    ],
  )

  return isInView ? value : 0
}

export const FeaturedResults = () => {
  const isFavorableInView = useInView('favorable-percentage')
  const isExperienceInView = useInView('experience-years')
  const isFamiliesInView = useInView('families-accompanied')
  const isSpecializationInView = useInView('specialization-percentage')

  const favorablePercentage = useAnimatedCounter(isFavorableInView, 95, 1, 20)
  const experienceYears = useAnimatedCounter(isExperienceInView, 8, 1, 200)
  const familiesAccompanied = useAnimatedCounter(isFamiliesInView, 400, 10, 50)
  const specializationPercentage = useAnimatedCounter(isSpecializationInView, 100, 1, 20)

  // Carrusel en responsive: el card activo es el más cercano al centro del contenedor
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(0)
  const cardsCount = 4

  const handleScroll = () => {
    const container = containerRef.current
    if (!container) return

    const center = container.scrollLeft + container.clientWidth / 2
    const cards = Array.from(container.children) as HTMLElement[]
    const distances = cards.map((card) => Math.abs(card.offsetLeft + card.offsetWidth / 2 - center))
    setActiveCard(distances.indexOf(Math.min(...distances)))
  }

  const goToCard = (index: number) => {
    const container = containerRef.current
    const card = container?.children[index] as HTMLElement | undefined
    if (!container || !card) return

    container.scrollTo({
      left: card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }

  const prevCard = () => goToCard((activeCard - 1 + cardsCount) % cardsCount)
  const nextCard = () => goToCard((activeCard + 1) % cardsCount)

  return (
    <div className="featured-results">
      <div className="featured-results-carousel">
        <button type="button" className="featured-results-arrow prev" onClick={prevCard} aria-label="Resultado anterior">
          <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
        <div className="featured-results-container max-width" ref={containerRef} onScroll={handleScroll}>
          <div className="results-card">
            <span className="results-card-number" id="favorable-percentage">
              {favorablePercentage}%
            </span>
            <p className="results-card-text">de resultados favorables en casos de familia</p>
          </div>
          <div className="results-card">
            <span className="results-card-number" id="experience-years">
              +{experienceYears} AÑOS
            </span>
            <p className="results-card-text">de experiencia en derecho de familia</p>
          </div>
          <div className="results-card">
            <span className="results-card-number" id="families-accompanied">
              +{familiesAccompanied}
            </span>
            <p className="results-card-text">familias acompañadas en sus procesos</p>
          </div>
          <div className="results-card">
            <span className="results-card-number" id="specialization-percentage">
              {specializationPercentage}%
            </span>
            <p className="results-card-text">especializados en derecho de familia</p>
          </div>
        </div>
        <button type="button" className="featured-results-arrow next" onClick={nextCard} aria-label="Resultado siguiente">
          <FontAwesomeIcon icon={faAngleRight}/>
        </button>
      </div>
    </div>
  )
}