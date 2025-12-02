import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

// Los locales soportados
const locales = ['es', 'en'] as const
type Locale = typeof locales[number]

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale entrante es válido
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  return {
    locale: locale as Locale,
    messages: (await import(`../messages/${locale}.json`)).default
  }
})
