import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Los locales soportados
const locales = ['es', 'en'] as const
type Locale = typeof locales[number]

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale entrante es válido
  // Si no hay locale o no es válido, usar el default 'es'
  const validLocale = locale && locales.includes(locale as Locale) 
    ? (locale as Locale) 
    : 'es'

  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default
  }
})
