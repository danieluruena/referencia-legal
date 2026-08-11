import { useEffect } from 'react'

interface MetaTagsConfig {
  title: string
  description: string
  image?: string
  url?: string
}

/**
 * Hook para actualizar meta tags dinámicamente en cada página
 * Actualiza: title, meta description, og:*, twitter:* tags y canonical
 */
export const useMetaTags = (config: MetaTagsConfig) => {
  useEffect(() => {
    // Actualizar document.title
    document.title = config.title

    // Actualizar meta description
    const descMeta = document.querySelector('meta[name="description"]')
    if (descMeta) descMeta.setAttribute('content', config.description)

    // Actualizar og:title
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', config.title)

    // Actualizar og:description
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', config.description)

    // Actualizar og:image
    if (config.image) {
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) ogImage.setAttribute('content', config.image)
    }

    // Actualizar og:url
    if (config.url) {
      const ogUrl = document.querySelector('meta[property="og:url"]')
      if (ogUrl) ogUrl.setAttribute('content', config.url)
    }

    // Actualizar twitter:title
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', config.title)

    // Actualizar twitter:description
    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', config.description)

    // Actualizar twitter:image
    if (config.image) {
      const twitterImage = document.querySelector('meta[name="twitter:image"]')
      if (twitterImage) twitterImage.setAttribute('content', config.image)
    }

    // Actualizar canonical
    if (config.url) {
      const canonical = document.querySelector('link[rel="canonical"]')
      if (canonical) {
        canonical.setAttribute('href', config.url)
      }
    }
  }, [
    config.title, config.description, config.image, config.url,
  ])
}
