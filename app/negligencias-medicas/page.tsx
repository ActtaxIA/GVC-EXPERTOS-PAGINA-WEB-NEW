import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Shield, Scale, FileCheck, Clock } from 'lucide-react'
import { services } from '@/config/site'
import { ServiceIcon } from '@/components/ui/Icons'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaFinal } from '@/components/home'
import { JsonLdBreadcrumbs } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Negligencias Médicas | Tipos de Errores Médicos',
  description:
    'Especialistas en todo tipo de negligencias médicas: errores quirúrgicos, diagnósticos incorrectos, negligencia hospitalaria, obstétrica y más. Consulta gratuita.',
  alternates: {
    canonical: '/negligencias-medicas',
  },
}

export default function NegligenciasMedicasPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: 'Inicio', url: 'https://gvcexpertos.es' },
          { name: 'Negligencias Médicas', url: 'https://gvcexpertos.es/negligencias-medicas' },
        ]}
      />

      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Negligencias Médicas' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Tipos de <span className="text-gold">Negligencias Médicas</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Estamos especializados en la defensa de víctimas de todo tipo de
            negligencias y errores médicos. Conoce las diferentes áreas en las
            que podemos ayudarte.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/negligencias-medicas/${service.slug}`}
                className="bg-white p-8 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="text-gold mb-6">
                  <ServiceIcon name={service.icon} className="w-14 h-14" />
                </div>
                <h2 className="text-2xl font-serif font-semibold text-charcoal mb-4 group-hover:text-gold transition-colors">
                  {service.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
                <span className="inline-flex items-center text-gold font-semibold uppercase text-sm tracking-wide">
                  Más información
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section - Rediseñada */}
      <section className="section-padding bg-gradient-to-b from-white to-cream">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Información Esencial
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mt-3 mb-6">
              ¿Qué es una <span className="text-gold">Negligencia Médica</span>?
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Una negligencia médica ocurre cuando un profesional sanitario causa un daño 
              al paciente por actuación imprudente o contraria a los protocolos establecidos.
            </p>
          </div>

          {/* Grid Layout con Imagen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Imagen Principal */}
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-2xl group">
              <Image
                src="/images/abogados_negligencias_medicas_negligencia_hospital.jpg"
                alt="Negligencia médica hospitalaria"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white font-serif text-2xl font-bold">
                  Más de 25 años defendiendo tus derechos
                </p>
              </div>
            </div>

            {/* Contenido */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold">
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-gold" />
                  Definición Legal
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Se produce cuando un profesional sanitario actúa de manera imprudente 
                  o negligente, causando un daño que podría haberse evitado siguiendo 
                  los protocolos médicos establecidos.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold">
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3 flex items-center gap-3">
                  <Scale className="w-6 h-6 text-gold" />
                  Elementos Fundamentales
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Para que exista responsabilidad médica deben concurrir tres elementos:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>Actuación médica contraria a la <em>lex artis</em> (buena práctica)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>Daño efectivo al paciente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold mt-1">•</span>
                    <span>Relación de causalidad entre la actuación y el daño</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold">
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-gold" />
                  Actúa con Rapidez
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Los plazos de prescripción pueden limitar tu derecho a reclamar. 
                  Te recomendamos contactar con nosotros lo antes posible para 
                  evaluar tu caso sin compromiso.
                </p>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-serif font-bold text-gold mb-2">95%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Casos Ganados</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-serif font-bold text-gold mb-2">+2.500</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Clientes Atendidos</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-serif font-bold text-gold mb-2">+50M€</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Indemnizaciones</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl font-serif font-bold text-gold mb-2">25+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Años Experiencia</div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="mt-16 bg-charcoal rounded-lg p-8 md:p-12 text-center">
            <FileCheck className="w-16 h-16 text-gold mx-auto mb-6" />
            <h3 className="text-3xl font-serif font-bold text-white mb-4">
              ¿Has Sufrido una Negligencia Médica?
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Evaluamos tu caso de forma gratuita y sin compromiso. 
              Nuestro equipo de expertos te asesorará sobre tus derechos y posibilidades.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contacto" className="btn-primary inline-flex items-center justify-center">
                Consulta Gratuita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a href="tel:+34900123456" className="btn-outline-white inline-flex items-center justify-center">
                Llamar Ahora: 900 123 456
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
