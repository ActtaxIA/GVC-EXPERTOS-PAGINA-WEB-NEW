import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { teamMembers } from '@/config/site'

export function TeamSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            Nuestro Equipo
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
            Profesionales Especializados
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Un equipo de abogados con amplia experiencia en derecho sanitario y
            negligencias médicas, comprometidos con la defensa de tus derechos.
          </p>
        </div>

        {/* Team Grid - 5 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.slug}
              className="bg-white rounded-sm shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Photo */}
              <div className="aspect-square relative overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Info */}
              <div className="p-5 text-center relative">
                {/* Gold line animation */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <h3 className="text-base font-serif font-semibold text-charcoal mb-1 line-clamp-1">
                  {member.name}
                </h3>
                <span className="text-xs text-gold uppercase tracking-wider font-medium">
                  {member.position}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/equipo"
            className="btn-outline inline-flex items-center"
          >
            Conoce al equipo completo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
