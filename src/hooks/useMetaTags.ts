import { useEffect } from 'react'

interface MetaTagsConfig {
  title: string
  description: string
  image?: string
  url?: string
}

const upsertMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const upsertCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', href)
}

/**
 * Hook para actualizar meta tags dinámicamente en cada página.
 * Actualiza (o crea si no existen): title, meta description, og:*, twitter:* y canonical.
 */
export const useMetaTags = (config: MetaTagsConfig) => {
  useEffect(() => {
    document.title = config.title

    upsertMeta('meta[name="description"]', 'name', 'description', config.description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', config.title)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', config.description)

    if (config.image) {
      upsertMeta('meta[property="og:image"]', 'property', 'og:image', config.image)
      upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', config.image)
    }

    if (config.url) {
      upsertMeta('meta[property="og:url"]', 'property', 'og:url', config.url)
      upsertCanonical(config.url)
    }

    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', config.title)
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', config.description)
  }, [
    config.title, config.description, config.image, config.url,
  ])
}
