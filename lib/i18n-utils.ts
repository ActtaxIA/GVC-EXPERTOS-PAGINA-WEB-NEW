import { Locale } from '@/i18n'

/**
 * Helper para generar rutas con locale
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


