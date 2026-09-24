import './review.css'
import './review.responsive.css'
import '../../../common.css'
import {
  useEffect,
  useRef,
  useState,
} from 'react'
import type { CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

interface Review {
  author: string
  date: string
  rating: number
  text: string
}

const googleRating = 5.0 as number | null
const googleReviewsCount = 35 as number | null
const googleReviewsUrl = 'https://www.google.com/search?q=Referencia+Legal&oq=Referencia+Legal&gs_lcrp=EgZjaHJvbWUyCwgAEEUYJxg5GOMCMgwIARAuGCcYrwEYxwEyCAgCEAAYFhgeMggIAxAAGBYYHjIICAQQABgWGB4yBggFEEUYPDIGCAYQRRg8MgYIBxBFGD3SAQgxMTExajBqNKgCALACAQ&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x8e4683b191a30f69:0x7fa8cbb878de554c,1,,,,'

const reviewsData: Review[] = [
  {
    author: 'Rosalba M.',
    date: 'Hace 3 meses',
    rating: 5,
    text: 'Hemos recibido un acompañamiento muy profesional, responsable, honesto y cumplido dentro de los tiempos acordes a lo contratado,cada miembro del bufette demostró compromiso y calidad humana para obtener los mejores resultados.\nAgradecemos como familia tan buena gestión y excelente trabajo .\nIgualmente mi más grande gratitud a la Doctora Melisa por todo su acompañamiento, al Doctor Cristian David por su empatía y comprensión durante todo el proceso.',
  },
  {
    author: 'Grety O.',
    date: 'Hace 3 meses',
    rating: 5,
    text: 'Excelente servicio y acompañamiento durante todo mi proceso de divorcio. Fueron muy profesionales, claros, atentos y eficientes. Me sentí muy bien asesorada y todo salió de la mejor manera. Los recomiendo totalmente.',
  },
  {
    author: 'Daniel U.',
    date: 'Hace un año',
    rating: 5,
    text: 'Me ayudaron mucho en mi caso de custodia, el acompañamiento fue total, se usaron todos los recursos a disposición y el resultado fué el mejor que podía esperar.',
  },
  {
    author: 'Leidy B.',
    date: 'Hace 8 meses',
    rating: 5,
    text: 'El servicio excelente y mucho profesionalismo . Te brindan una atención clara y eficiente creando en ti la confianza suficiente. Totalmente recomendados .',
  },
  {
    author: 'Felipe T.',
    date: 'Hace 7 meses',
    rating: 5,
    text: 'Gracias doctora Melisa por el acompañamiento y la buena gestión',
  },
  {
    author: 'Daniel R.',
    date: 'Hace 8 meses',
    rating: 5,
    text: 'Excelente servicio',
  },
]

const starPositions = [
  1, 2, 3, 4, 5,
]

const collapsedTextLimit = 220

const swipeThreshold = 50

// Avance automático del carrusel, solo en escritorio
const autoplayDelay = 3000

const desktopVisibleCount = 3

// Tarjetas visibles según el ancho de pantalla (mismos cortes que review.responsive.css)
const getVisibleCount = () => {
  if (window.matchMedia('(max-width: 768px)').matches) return 1
  if (window.matchMedia('(max-width: 1200px)').matches) return 2
  return desktopVisibleCount
}

const useVisibleCount = () => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount)

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return visibleCount
}

const Stars = ({ rating }: { rating: number }) => (
  <div className="review-stars" aria-label={`${rating} de 5 estrellas`}>
    {starPositions.map((star) => (
      <FontAwesomeIcon
        key={star}
        icon={faStar}
        className={star <= Math.round(rating) ? 'review-star-filled' : 'review-star-empty'}
      />
    ))}
  </div>
)

const ReviewCard = ({ review, isVisible }: { review: Review, isVisible: boolean }) => {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.text.length > collapsedTextLimit

  return (
    <article className="review-card" aria-hidden={!isVisible} inert={!isVisible}>
      <header className="review-card-header">
        <span className="review-card-avatar" aria-hidden="true">
          {review.author.charAt(0).toUpperCase()}
        </span>
        <div className="review-card-author">
          <span className="review-card-name">{review.author}</span>
          <span className="review-card-date">{review.date}</span>
        </div>
        <FontAwesomeIcon icon={faGoogle} className="review-card-google" aria-hidden="true" />
      </header>
      <Stars rating={review.rating} />
      <p className={`review-card-text${isLong && !expanded ? ' review-card-text-collapsed' : ''}`}>
        {review.text}
      </p>
      {isLong && (
        <button
          type="button"
          className="review-card-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? 'Leer menos' : 'Leer más'}
        </button>
      )}
    </article>
  )
}

export const Review = () => {
  const visibleCount = useVisibleCount()
  const positionsCount = Math.max(reviewsData.length - visibleCount + 1, 1)
  const [selectedIndex, setCurrentIndex] = useState(0)
  const currentIndex = Math.min(selectedIndex, positionsCount - 1)
  const touchStartX = useRef<number | null>(null)

  // Se reinicia con cada cambio de reseña: un clic en flechas o puntos vuelve a contar los 15 s
  useEffect(() => {
    if (visibleCount !== desktopVisibleCount) return
    const timer = window.setTimeout(() => {
      setCurrentIndex((currentIndex + 1) % positionsCount)
    }, autoplayDelay)
    return () => window.clearTimeout(timer)
  }, [
    currentIndex,
    positionsCount,
    visibleCount,
  ])

  const nextReview = () => {
    setCurrentIndex((currentIndex + 1) % positionsCount)
  }
  const prevReview = () => {
    setCurrentIndex((currentIndex - 1 + positionsCount) % positionsCount)
  }

  const trackStyle = {
    '--review-visible': visibleCount,
    '--review-index': currentIndex,
  } as CSSProperties

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const distance = e.changedTouches[0].clientX - touchStartX.current
    if (distance > swipeThreshold) prevReview()
    if (distance < -swipeThreshold) nextReview()
    touchStartX.current = null
  }

  return (
    <section className="review">
      <div className="review-container max-width">
        {/* <h2 className="alternative-title">RESEÑAS EN GOOGLE</h2> */}

        <div className="review-summary">
          <div className="review-summary-brand">
            <FontAwesomeIcon icon={faGoogle} className="review-google-icon" />
            <span>Reseñas de Google</span>
          </div>
          {googleRating !== null && (
            <div className="review-summary-rating">
              <span className="review-summary-score">{googleRating.toFixed(1)}</span>
              <div>
                <Stars rating={googleRating} />
                {googleReviewsCount !== null && (
                  <span className="review-summary-count"></span>
                )}
              </div>
            </div>
          )}
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="main-button review-summary-button"
          >
            Ver en Google
          </a>
        </div>

        <div className="review-carousel">
          <button
            type="button"
            className="review-arrow review-arrow-prev"
            aria-label="Reseña anterior"
            onClick={prevReview}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <div
            className="review-items"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="review-track" style={trackStyle}>
              {reviewsData.map((review, index) => (
                <ReviewCard
                  review={review}
                  isVisible={index >= currentIndex && index < currentIndex + visibleCount}
                  key={index}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            className="review-arrow review-arrow-next"
            aria-label="Reseña siguiente"
            onClick={nextReview}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>

        <div className="review-dots">
          {reviewsData.slice(0, positionsCount).map((review, index) => (
            <button
              type="button"
              key={index}
              className={`review-dot${index === currentIndex ? ' is-active' : ''}`}
              aria-label={`Ver reseña de ${review.author}`}
              aria-current={index === currentIndex}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
