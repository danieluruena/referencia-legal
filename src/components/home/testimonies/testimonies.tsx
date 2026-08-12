import './testimonies.css'
import './testimonies.responsive.css'
import '../../../common.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export const Testimonies = () => {
  const videoUrls = [
    'https://www.youtube.com/embed/_xlfdsx62d4',
    'https://www.youtube.com/embed/RST08_g9BcM',
    'https://www.youtube.com/embed/wtLu4vFxEls',
    'https://www.youtube.com/embed/_xlfdsx62d4',
    'https://www.youtube.com/embed/RST08_g9BcM',
    'https://www.youtube.com/embed/wtLu4vFxEls',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoUrls.length)
  }
  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videoUrls.length) % videoUrls.length)
  }
  const getPrevIndex = () => (currentIndex - 1 + videoUrls.length) % videoUrls.length
  const getNextIndex = () => (currentIndex + 1) % videoUrls.length

  const getClassName = (index: number): string => {
    if (index === currentIndex) return 'current'
    if (index === getPrevIndex()) return 'prev'
    if (index === getNextIndex()) return 'next'
    return 'hidden'
  }

  return (
    <div className="testimonies">
      <div className="testimonies-videos-carousel-container">
        <h2 className="alternative-title">LO QUE DICEN NUESTROS CLIENTES</h2>
        <div className="testimonies-videos-carousel max-width">
          <button className="carousel-btn prev-btn">
            <FontAwesomeIcon icon={faAngleLeft} className="carousel-icon" onClick={prevVideo}/>
          </button>
          <div className="testimonies-videos-container">
            {videoUrls.map((videoUrl, index) => (
              <iframe 
                key={index}
                className={`testimonies-video ${getClassName(index)}`}
                src={videoUrl}

              ></iframe>
            ))}
          </div>
          <button className="carousel-btn next-btn">
            <FontAwesomeIcon icon={faAngleRight} className="carousel-icon" onClick={nextVideo}/>
          </button>
        </div>  
      </div>
      {/* La sección de reseñas de google queda pendiente, depende de un backend */}
    </div>
  )
}