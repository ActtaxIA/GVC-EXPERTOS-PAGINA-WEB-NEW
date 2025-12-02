import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // Idiomas soportados
  locales: ['es', 'en'],
  
  // Idioma por defecto
  defaultLocale: 'es',
  
  // Siempre mostrar prefijo de idioma en la URL
  localePrefix: 'always',
  
  // Forzar detección de locale desde la URL siempre
  localeDetection: false
})

export const config = {
  // Matcher para todas las rutas excepto:
  // - API routes (/api)
  // - Archivos estáticos (_next/static)
  // - Archivos en public (imágenes, fonts, etc)
  // - Rutas de admin (mantenemos sin i18n por ahora)
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|admin|_next|_vercel|.*\\..*).*)'
  ]
}
