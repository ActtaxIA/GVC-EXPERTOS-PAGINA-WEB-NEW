'use client'

import { useTranslation } from '@/lib/i18n-context'
import { Languages } from 'lucide-react'

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation()

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-charcoal hover:text-gold transition-colors"
        aria-label="Select language"
      >
        <Languages className="w-4 h-4" />
        <span className="uppercase">{locale}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          <button
            onClick={() => setLocale('es')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
              locale === 'es' ? 'text-gold font-semibold' : 'text-gray-700'
            }`}
          >
            🇪🇸 Español
          </button>
          <button
            onClick={() => setLocale('en')}
            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
              locale === 'en' ? 'text-gold font-semibold' : 'text-gray-700'
            }`}
          >
            🇬🇧 English
          </button>
        </div>
      </div>
    </div>
  )
}

