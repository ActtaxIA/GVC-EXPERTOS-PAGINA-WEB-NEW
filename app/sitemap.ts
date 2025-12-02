import { MetadataRoute } from 'next'
import { siteConfig, services, cities } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['es', 'en'] as const
  const now = new Date()
  
  const routes: MetadataRoute.Sitemap = []

  // Páginas principales para cada idioma
  const mainPages = [
    '',
    '/sobre-nosotros',
    '/equipo',
    '/preguntas-frecuentes',
    '/contacto',
    '/negligencias-medicas',
  ]

  for (const locale of locales) {
    // Home y páginas principales
    for (const page of mainPages) {
      routes.push({
        url: `${siteConfig.url}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }

    // Servicios individuales (6 servicios × 2 idiomas = 12 páginas)
    for (const service of services) {
      routes.push({
        url: `${siteConfig.url}/${locale}/negligencias-medicas/${service.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9, // Alta prioridad para servicios
      })
    }

    // Ciudades (105 ciudades × 2 idiomas = 210 páginas)
    for (const city of cities) {
      routes.push({
        url: `${siteConfig.url}/${locale}/${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    // Páginas legales
    const legalPages = [
      '/aviso-legal',
      '/politica-privacidad',
      '/politica-cookies',
    ]

    for (const page of legalPages) {
      routes.push({
        url: `${siteConfig.url}/${locale}${page}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      })
    }
  }

  return routes
}
