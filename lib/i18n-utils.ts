import { Locale } from '@/i18n'
import { routes, getTranslatedRoute, getTranslatedServiceRoute } from './routes'

/**
 * Helper para generar rutas con locale y traducción de URLs
 */
export function getLocalizedPath(path: string, locale: Locale = 'es'): string {
  // Si ya tiene locale, no duplicar
  if (path.startsWith('/es/') || path.startsWith('/en/')) {
    return path
  }
  
  // Si es la raíz, devolver solo el locale
  if (path === '/') {
    return `/${locale}`
  }
  
  // Remover slash inicial si existe
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Mapear rutas conocidas a sus versiones traducidas
  const routeMap: Record<string, keyof typeof routes.es> = {
    '/': 'home',
    '/negligencias-medicas': 'services',
    '/sobre-nosotros': 'about',
    '/equipo': 'team',
    '/blog': 'blog',
    '/contacto': 'contact',
    '/preguntas-frecuentes': 'faq',
    '/about-us': 'about',
    '/team': 'team',
    '/contact': 'contact',
    '/faq': 'faq',
    '/medical-negligence': 'services',
  }
  
  // Si es una ruta conocida, usar la versión traducida
  if (routeMap[`/${cleanPath}`]) {
    const translatedPath = getTranslatedRoute(routeMap[`/${cleanPath}`], locale)
    return `/${locale}${translatedPath === '/' ? '' : translatedPath}`
  }
  
  // Si es una ruta de servicio, traducirla
  if (cleanPath.startsWith('negligencias-medicas/')) {
    const serviceSlug = cleanPath.replace('negligencias-medicas/', '')
    const translatedServicePath = getTranslatedServiceRoute(serviceSlug, locale)
    return `/${locale}${translatedServicePath}`
  }
  
  // Si es una ruta de servicio en inglés
  if (cleanPath.startsWith('medical-negligence/')) {
    const serviceSlug = cleanPath.replace('medical-negligence/', '')
    // Mapear slugs en inglés a slugs en español para lookup
    const slugMap: Record<string, string> = {
      'surgical-errors': 'errores-quirurgicos',
      'diagnostic-errors': 'errores-diagnostico',
      'hospital-negligence': 'negligencia-hospitalaria',
      'obstetric-negligence': 'negligencia-obstetrica',
      'medication-errors': 'errores-medicacion',
      'informed-consent': 'consentimiento-informado',
    }
    const spanishSlug = slugMap[serviceSlug] || serviceSlug
    const translatedServicePath = getTranslatedServiceRoute(spanishSlug, locale)
    return `/${locale}${translatedServicePath}`
  }
  
  // Para otras rutas, mantener la estructura pero añadir locale
  return `/${locale}/${cleanPath}`
}

/**
 * Helper para obtener el locale de la URL actual
 */
export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en'
  }
  return 'es'
}

/**
 * Convertir una ruta de un idioma a otro manteniendo la página equivalente
 */
export function translatePath(pathname: string, targetLocale: Locale): string {
  // Remover locale actual
  const pathWithoutLocale = pathname.replace(/^\/(es|en)/, '') || '/'
  
  // Si es la raíz, devolver solo el locale
  if (pathWithoutLocale === '/') {
    return `/${targetLocale}`
  }
  
  const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale.slice(1) : pathWithoutLocale
  
  // Mapear rutas conocidas
  const routeMap: Record<string, keyof typeof routes.es> = {
    '': 'home',
    'negligencias-medicas': 'services',
    'sobre-nosotros': 'about',
    'equipo': 'team',
    'blog': 'blog',
    'contacto': 'contact',
    'preguntas-frecuentes': 'faq',
    'about-us': 'about',
    'team': 'team',
    'contact': 'contact',
    'faq': 'faq',
    'medical-negligence': 'services',
  }
  
  // Si es una ruta conocida, usar la versión traducida
  if (routeMap[cleanPath]) {
    const translatedPath = getTranslatedRoute(routeMap[cleanPath], targetLocale)
    return `/${targetLocale}${translatedPath === '/' ? '' : translatedPath}`
  }
  
  // Si es una ruta de servicio en español
  if (cleanPath.startsWith('negligencias-medicas/')) {
    const serviceSlug = cleanPath.replace('negligencias-medicas/', '')
    const translatedServicePath = getTranslatedServiceRoute(serviceSlug, targetLocale)
    return `/${targetLocale}${translatedServicePath}`
  }
  
  // Si es una ruta de servicio en inglés
  if (cleanPath.startsWith('medical-negligence/')) {
    const serviceSlug = cleanPath.replace('medical-negligence/', '')
    const slugMap: Record<string, string> = {
      'surgical-errors': 'errores-quirurgicos',
      'diagnostic-errors': 'errores-diagnostico',
      'hospital-negligence': 'negligencia-hospitalaria',
      'obstetric-negligence': 'negligencia-obstetrica',
      'medication-errors': 'errores-medicacion',
      'informed-consent': 'consentimiento-informado',
    }
    const spanishSlug = slugMap[serviceSlug] || serviceSlug
    const translatedServicePath = getTranslatedServiceRoute(spanishSlug, targetLocale)
    return `/${targetLocale}${translatedServicePath}`
  }
  
  // Para otras rutas (blog, noticias, ciudades), mantener la estructura
  return `/${targetLocale}/${cleanPath}`
}
