/**
 * Sistema de rutas traducidas para SEO multiidioma
 * Las URLs cambian según el idioma para mejor SEO
 */

export const routes = {
  es: {
    home: '/',
    services: '/negligencias-medicas',
    about: '/sobre-nosotros',
    team: '/equipo',
    blog: '/publicaciones',
    contact: '/contacto',
    faq: '/preguntas-frecuentes',
    legal: {
      notice: '/aviso-legal',
      privacy: '/politica-privacidad',
      cookies: '/politica-cookies',
      sitemap: '/sitemap',
    },
    servicesList: {
      'errores-quirurgicos': '/negligencias-medicas/errores-quirurgicos',
      'errores-diagnostico': '/negligencias-medicas/errores-diagnostico',
      'negligencia-hospitalaria': '/negligencias-medicas/negligencia-hospitalaria',
      'negligencia-obstetrica': '/negligencias-medicas/negligencia-obstetrica',
      'errores-medicacion': '/negligencias-medicas/errores-medicacion',
      'consentimiento-informado': '/negligencias-medicas/consentimiento-informado',
    },
  },
  en: {
    home: '/',
    services: '/medical-negligence',
    about: '/about-us',
    team: '/team',
    blog: '/publicaciones',
    contact: '/contact',
    faq: '/faq',
    legal: {
      notice: '/legal-notice',
      privacy: '/privacy-policy',
      cookies: '/cookie-policy',
      sitemap: '/sitemap',
    },
    servicesList: {
      'errores-quirurgicos': '/medical-negligence/surgical-errors',
      'errores-diagnostico': '/medical-negligence/diagnostic-errors',
      'negligencia-hospitalaria': '/medical-negligence/hospital-negligence',
      'negligencia-obstetrica': '/medical-negligence/obstetric-negligence',
      'errores-medicacion': '/medical-negligence/medication-errors',
      'consentimiento-informado': '/medical-negligence/informed-consent',
    },
  },
} as const

/**
 * Obtener ruta traducida según el locale
 */
export function getTranslatedRoute(
  routeKey: keyof typeof routes.es,
  locale: 'es' | 'en' = 'es'
): string {
  return routes[locale][routeKey] as string
}

/**
 * Obtener ruta de servicio traducida
 */
export function getTranslatedServiceRoute(
  serviceSlug: string,
  locale: 'es' | 'en' = 'es'
): string {
  const serviceRoute = routes[locale].servicesList[serviceSlug as keyof typeof routes.es.servicesList]
  return serviceRoute || routes[locale].services
}

/**
 * Obtener slug de servicio desde URL traducida (reverse lookup)
 */
export function getServiceSlugFromTranslatedRoute(
  translatedPath: string,
  locale: 'es' | 'en'
): string | null {
  const serviceRoutes = routes[locale].servicesList
  for (const [slug, path] of Object.entries(serviceRoutes)) {
    if (path === translatedPath || path.endsWith(translatedPath)) {
      return slug
    }
  }
  return null
}

