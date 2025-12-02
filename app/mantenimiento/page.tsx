import { Wrench, Clock, Phone, Mail } from 'lucide-react'
import { siteConfig } from '@/config/site'

export const metadata = {
  title: 'Mantenimiento | GVC Expertos',
  description: 'Estamos realizando tareas de mantenimiento. Volveremos pronto.',
  robots: 'noindex, nofollow',
}

export default function MantenimientoPage() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo */}
        <div className="mb-8">
          <span className="text-3xl font-serif font-bold text-gold">
            GVC Expertos
          </span>
        </div>

        {/* Icono */}
        <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Wrench className="w-12 h-12 text-gold animate-pulse" />
        </div>

        {/* Mensaje */}
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
          En mantenimiento
        </h1>
        
        <p className="text-gray-400 mb-8">
          Estamos realizando mejoras en nuestra web para ofrecerte una mejor experiencia. 
          Volveremos muy pronto.
        </p>

        {/* Tiempo estimado */}
        <div className="flex items-center justify-center gap-2 text-gold mb-10">
          <Clock className="w-5 h-5" />
          <span className="text-sm">Tiempo estimado: menos de 1 hora</span>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 my-8" />

        {/* Contacto alternativo */}
        <p className="text-gray-500 text-sm mb-4">
          Si tienes una urgencia, puedes contactarnos:
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={siteConfig.contact.phoneHref}
            className="inline-flex items-center justify-center gap-2 bg-gold text-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {siteConfig.contact.phone}
          </a>
          
          <a
            href={siteConfig.contact.emailHref}
            className="inline-flex items-center justify-center gap-2 border border-gray-600 text-gray-300 px-6 py-3 rounded-lg hover:border-gold hover:text-gold transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email
          </a>
        </div>

        {/* Footer */}
        <p className="text-gray-600 text-xs mt-12">
          © {new Date().getFullYear()} GVC Expertos. Todos los derechos reservados.
        </p>
      </div>
    </div>
  )
}
