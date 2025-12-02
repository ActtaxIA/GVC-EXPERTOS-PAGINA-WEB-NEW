'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Home, RefreshCw, AlertTriangle, Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log del error para debugging
    console.error('Error capturado:', error)
    
    // Aquí podrías enviar el error a un servicio de tracking
    // como Sentry, LogRocket, etc.
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream">
      <div className="container-custom text-center py-20">
        {/* Icono de error */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
          Algo ha salido mal
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo. 
          Si el problema persiste, contacta con nosotros.
        </p>

        {/* Código de error (solo en desarrollo) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <p className="text-xs text-gray-400 mb-6 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => reset()}
            className="btn-primary inline-flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </button>
          <Link href="/" className="btn-outline inline-flex items-center justify-center">
            <Home className="w-4 h-4 mr-2" />
            Ir al inicio
          </Link>
        </div>

        {/* Contacto de emergencia */}
        <div className="p-6 bg-white rounded-lg shadow-sm max-w-sm mx-auto">
          <p className="text-sm text-gray-500 mb-2">
            ¿Necesitas ayuda urgente?
          </p>
          <a 
            href={siteConfig.contact.phoneHref}
            className="inline-flex items-center gap-2 text-gold text-lg font-semibold hover:underline"
          >
            <Phone className="w-5 h-5" />
            {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
