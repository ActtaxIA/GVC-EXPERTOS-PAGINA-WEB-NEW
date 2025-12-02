import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  // Idiomas soportados
  locales: ['es', 'en'],
  
  // Idioma por defecto
  defaultLocale: 'es',
  
  // Siempre mostrar prefijo de idioma en la URL
  localePrefix: 'always'
})

export const config = {
  // Matcher para todas las rutas excepto:
  // - API routes (/api)
  // - Archivos estáticos (_next/static)
  // - Archivos en public (imágenes, fonts, etc)
  // - Rutas de admin (mantenemos sin i18n por ahora)
  matcher: ['/((?!api|admin|_next/static|_next/image|images|favicon.ico|sw.js|manifest.json).*)']
}
