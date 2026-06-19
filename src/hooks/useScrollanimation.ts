import { useEffect } from 'react'

export const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.3 },
    )

    const fadeElements = document.querySelectorAll('.fade-in')
    fadeElements.forEach((element) => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])
}