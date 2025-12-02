'use client'

import { useParams } from 'next/navigation'
import { Home, Phone, FileText, MapPin, Search } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { getLocalizedPath } from '@/lib/i18n-utils'
import Link from 'next/link'

export default function NotFound() {
  const params = useParams()
  const locale = (params?.locale as string) || 'es'
  
  const popularPages = [
    { href: '/contacto', label: locale === 'es' ? 'Contacto' : 'Contact', icon: Phone },
    { href: '/publicaciones', label: 'Publicaciones', icon: FileText },
    { href: '/negligencias-medicas', label: locale === 'es' ? 'Servicios' : 'Services', icon: Search },
    { href: '/abogados-negligencias-medicas-madrid', label: 'Madrid', icon: MapPin },
  ]

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cream">
      <div className="container-custom text-center py-20">
        {/* 404 Grande */}
        <h1 className="text-8xl md:text-9xl font-serif font-bold text-gold mb-4">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-serif font-semibold text-charcoal mb-4">
          {locale === 'es' ? 'Página no encontrada' : 'Page not found'}
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {locale === 'es' 
            ? 'Lo sentimos, la página que buscas no existe o ha sido movida. Pero no te preocupes, podemos ayudarte.'
            : 'Sorry, the page you are looking for does not exist or has been moved. But don\'t worry, we can help you.'
          }
        </p>

        {/* Botones principales */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link 
            href={getLocalizedPath('/', locale as 'es' | 'en')} 
            className="btn-primary inline-flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            {locale === 'es' ? 'Ir al inicio' : 'Go to home'}
          </Link>
          <Link 
            href={getLocalizedPath('/contacto', locale as 'es' | 'en')} 
            className="btn-outline inline-flex items-center justify-center"
          >
            <Phone className="w-4 h-4 mr-2" />
            {locale === 'es' ? 'Contactar' : 'Contact'}
          </Link>
        </div>

        {/* Páginas populares */}
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
            {locale === 'es' ? 'Páginas populares' : 'Popular pages'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={getLocalizedPath(page.href, locale as 'es' | 'en')}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hover:shadow-md transition-shadow group"
              >
                <page.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform" />
                <span className="text-sm text-charcoal">{page.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Teléfono de contacto */}
        <div className="mt-12 p-6 bg-charcoal rounded-lg max-w-md mx-auto">
          <p className="text-gray-300 text-sm mb-2">
            {locale === 'es' ? '¿Necesitas ayuda urgente?' : 'Need urgent help?'}
          </p>
          <a 
            href={siteConfig.contact.phoneHref}
            className="text-gold text-2xl font-semibold hover:underline"
          >
            {siteConfig.contact.phone}
          </a>
          <p className="text-gray-400 text-xs mt-2">
            {locale === 'es' ? 'Llamada gratuita' : 'Free call'}
          </p>
        </div>
      </div>
    </div>
  )
}



