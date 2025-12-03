'use client'

import { usePathname } from 'next/navigation'
import { WifiOff, RefreshCw, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { getLocaleFromPath } from '@/lib/i18n-utils'

export default function OfflinePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPath(pathname || '/')
  
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <WifiOff className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        
        <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">
          {locale === 'es' ? 'Sin conexión' : 'Offline'}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {locale === 'es'
            ? 'Parece que no tienes conexión a internet. Comprueba tu conexión e inténtalo de nuevo.'
            : 'It seems you don\'t have an internet connection. Check your connection and try again.'
          }
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            {locale === 'es' ? 'Reintentar' : 'Retry'}
          </button>

          <a
            href={siteConfig.contact.phoneHref}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white font-semibold rounded-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            {locale === 'es' ? 'Llamar' : 'Call'}: {siteConfig.contact.phone}
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          {locale === 'es'
            ? 'También puedes llamarnos directamente. Te escuchamos.'
            : 'You can also call us directly. We listen to you.'
          }
        </p>
      </div>
    </div>
  )
}
