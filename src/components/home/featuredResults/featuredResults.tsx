import './featuredResults.css'
import './featuredResults.responsive.css'
import '../../../common.css'

export const FeaturedResults = () => {
  return (
    <div className="featured-results">
      <div className="featured-results-container max-width">
        <div className="results-card">
          <span className="results-card-number">95%</span>
          <p className="results-card-text">de resultados favorables en casos de familia</p>
        </div>
        <div className="results-card">
          <span className="results-card-number">+8 AÑOS</span>
          <p className="results-card-text">de experiencia en derecho de familia</p>
        </div>
        <div className="results-card">
          <span className="results-card-number">+400</span>
          <p className="results-card-text">familias acompañadas en sus procesos</p>
        </div>
        <div className="results-card">
          <span className="results-card-number">100%</span>
          <p className="results-card-text">especializados en derecho de familia</p>
        </div>
      </div>
    </div>
  )
}