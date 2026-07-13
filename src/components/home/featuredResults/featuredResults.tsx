import './featuredResults.css'
import './featuredResults.responsive.css'
import '../../../common.css'
import { useEffect, useState } from 'react'
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

  return (
    <div className="featured-results">
      <div className="featured-results-container max-width">
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
    </div>
  )
}