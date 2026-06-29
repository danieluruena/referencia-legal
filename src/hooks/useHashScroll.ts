import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useHashScroll = () => {
  const { hash, pathname } = useLocation()

  const scrollToHash = (hashValue: string) => {
    if (hashValue) {
      const element = document.querySelector(hashValue)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 0)
      }
    }
  }

  useEffect(() => {
    scrollToHash(hash)
  }, [hash, pathname])

  useEffect(() => {
    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href*="#"]')
      if (link) {
        const href = link.getAttribute('href')
        if (href?.includes('#')) {
          const hashPart = href.substring(href.indexOf('#'))
          setTimeout(() => scrollToHash(hashPart), 100)
        }
      }
    }

    document.addEventListener('click', handleLinkClick)
    return () => document.removeEventListener('click', handleLinkClick)
  }, [])
}
