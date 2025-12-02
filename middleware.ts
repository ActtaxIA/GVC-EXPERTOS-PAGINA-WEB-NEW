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
    '/',
    '/(es|en)/:path*',
    '/((?!api|admin|_next/static|_next/image|images|favicon.ico|sw.js|manifest.json|robots.txt).*)'
  ]
}
