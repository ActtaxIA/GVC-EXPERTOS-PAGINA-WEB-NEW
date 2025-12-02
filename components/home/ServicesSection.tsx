import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { services } from '@/config/site'
import { ServiceIcon } from '@/components/ui/Icons'

export function ServicesSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Áreas de Especialización
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
            Tipos de Negligencias Médicas
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Estamos especializados en todo tipo de negligencias y errores
            médicos. Cada caso es único y merece un tratamiento personalizado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/negligencias-medicas/${service.slug}`}
              className="group bg-cream p-8 rounded-sm hover:bg-charcoal transition-all duration-300"
            >
              <div className="text-gold group-hover:text-gold mb-5">
                <ServiceIcon name={service.icon} className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal group-hover:text-white mb-3 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 group-hover:text-gray-300 text-sm leading-relaxed mb-4 transition-colors">
                {service.shortDescription}
              </p>
              <span className="inline-flex items-center text-gold text-sm font-semibold uppercase tracking-wide">
                Ver más
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/negligencias-medicas"
            className="btn-outline inline-flex items-center"
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
