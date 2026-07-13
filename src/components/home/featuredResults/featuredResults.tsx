import './featuredResults.css'
import './featuredResults.responsive.css'
import '../../../common.css'
import { useEffect, useState } from 'react'
import { useInView } from '../../../hooks/useInView'

export const FeaturedResults = () => {
  const [favorablePercentage, setFavorablePercentage] = useState(0)
  const [experienceYears, setExperienceYears] = useState(0)
  const [familiesAccompanied, setFamiliesAccompanied] = useState(0)
  const [specializationPercentage, setSpecializationPercentage] = useState(0)
  const isFavorableInView = useInView('favorable-percentage')
  const isExperienceInView = useInView('experience-years')
  const isFamiliesInView = useInView('families-accompanied')
  const isSpecializationInView = useInView('specialization-percentage')

  useEffect(() => {
    if (!isFavorableInView) {
      setFavorablePercentage(0)
    }

    if (!isExperienceInView) {
      setExperienceYears(0)
    }

    if (!isFamiliesInView) {
      setFamiliesAccompanied(0)
    }

    if (!isSpecializationInView) {
      setSpecializationPercentage(0)
    }

    const favorableInterval = setInterval(() => {
      setFavorablePercentage((prev: number) => {
        if (prev < 95) {
          return prev + 1
        } else {
          clearInterval(favorableInterval)
          return prev
        }
      })
    }, 20)
    const experienceInterval = setInterval(() => {
      setExperienceYears((prev: number) => {
        if (prev < 8) {
          return prev + 1
        } else {
          clearInterval(experienceInterval)
          return prev
        }
      })
    }, 200)
    const familiesInterval = setInterval(() => {
      setFamiliesAccompanied((prev: number) => {
        if (prev < 400) {
          return prev + 10
          } else {
          clearInterval(familiesInterval)
          return prev
        }
      })
    }, 50)
    const specializationInterval = setInterval(() => {
      setSpecializationPercentage((prev: number) => {
        if (prev < 100) {
          return prev + 1
        } else {
          clearInterval(specializationInterval)
          return prev
        }
      })
    }, 20)
    return () => {
      clearInterval(favorableInterval)
      clearInterval(experienceInterval)
      clearInterval(familiesInterval)
      clearInterval(specializationInterval)
    }
  }, [
    isFavorableInView, 
    isExperienceInView, 
    isFamiliesInView, 
    isSpecializationInView,
  ])
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