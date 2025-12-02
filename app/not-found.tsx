import Link from 'next/link'
import { Home, ArrowLeft, Search, Phone, FileText, MapPin } from 'lucide-react'
import { siteConfig } from '@/config/site'

export default function NotFound() {
  const popularPages = [
    { href: '/contacto', label: 'Contacto', icon: Phone },
    { href: '/blog', label: 'Blog', icon: FileText },
    { href: '/negligencias-medicas', label: 'Servicios', icon: Search },
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
          Página no encontrada
        </h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Pero no te preocupes, podemos ayudarte.
        </p>

        {/* Botones principales */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/" className="btn-primary inline-flex items-center justify-center">
            <Home className="w-4 h-4 mr-2" />
            Ir al inicio
          </Link>
          <Link href="/contacto" className="btn-outline inline-flex items-center justify-center">
            <Phone className="w-4 h-4 mr-2" />
            Contactar
          </Link>
        </div>

        {/* Páginas populares */}
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
            Páginas populares
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
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
          <p className="text-gray-300 text-sm mb-2">¿Necesitas ayuda urgente?</p>
          <a 
            href={siteConfig.contact.phoneHref}
            className="text-gold text-2xl font-semibold hover:underline"
          >
            {siteConfig.contact.phone}
          </a>
          <p className="text-gray-400 text-xs mt-2">Llamada gratuita</p>
        </div>
      </div>
    </div>
  )
}
