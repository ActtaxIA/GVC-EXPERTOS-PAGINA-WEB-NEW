import Link from 'next/link'
import { WifiOff, RefreshCw, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <WifiOff className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        
        <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">
          Sin conexión
        </h1>
        
        <p className="text-gray-600 mb-8">
          Parece que no tienes conexión a internet. Comprueba tu conexión e inténtalo de nuevo.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Reintentar
          </button>

          <a
            href={siteConfig.contact.phoneHref}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-white font-semibold rounded-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            Llamar: {siteConfig.contact.phone}
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          También puedes llamarnos directamente para una consulta gratuita.
        </p>
      </div>
    </div>
  )
}
