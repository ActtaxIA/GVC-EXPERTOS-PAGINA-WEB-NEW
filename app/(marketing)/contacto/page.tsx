import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig, services } from '@/config/site'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContactForm } from '@/components/forms/ContactForm'
import { JsonLdContactPage, JsonLdBreadcrumbs } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Contacto | Consulta Gratuita con Abogados Negligencias Médicas',
  description:
    'Contacta con nuestros abogados especializados en negligencias médicas. Primera consulta gratuita y sin compromiso. Llámanos al 900 123 456. Respuesta en 24h.',
  alternates: {
    canonical: `${siteConfig.url}/contacto`,
  },
  openGraph: {
    title: 'Contacto | GVC Expertos',
    description: 'Primera consulta gratuita. Abogados especializados en negligencias médicas. Respuesta en 24h.',
    url: `${siteConfig.url}/contacto`,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto | GVC Expertos',
    description: 'Primera consulta gratuita. Abogados especializados en negligencias médicas.',
  },
}

export default function ContactoPage() {
  return (
    <>
      <JsonLdContactPage />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Inicio', url: siteConfig.url },
          { name: 'Contacto', url: `${siteConfig.url}/contacto` },
        ]}
      />

      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Contacto' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            <span className="text-gold">Contacta</span> con Nosotros
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Cuéntanos tu caso sin compromiso. Te responderemos en menos de 24
            horas con una valoración inicial gratuita.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
                Información de Contacto
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <a
                  href={siteConfig.contact.phoneHref}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                    <Phone className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Llámanos gratis
                    </span>
                    <span className="block text-xl font-semibold text-charcoal group-hover:text-gold transition-colors">
                      {siteConfig.contact.phone}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={siteConfig.contact.emailHref}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold transition-colors">
                    <Mail className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Escríbenos
                    </span>
                    <span className="block text-lg font-semibold text-charcoal group-hover:text-gold transition-colors">
                      {siteConfig.contact.email}
                    </span>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">
                      Visítanos
                    </span>
                    <span className="block text-lg font-semibold text-charcoal">
                      {siteConfig.contact.address}
                    </span>
                  </div>
                </div>

                {/* Schedule */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-500">Horario</span>
                    <span className="block text-lg font-semibold text-charcoal">
                      {siteConfig.contact.schedule}
                    </span>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="mt-8 bg-gray-200 rounded-sm aspect-video flex items-center justify-center">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.223428!2d-3.7025!3d40.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDI1JzEyLjAiTiAzwrA0MicwOS4wIlc!5e0!3m2!1ses!2ses!4v1234567890!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación GVC Expertos"
                  className="rounded-sm"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-sm shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">
                  Cuéntanos tu caso
                </h2>
                <p className="text-gray-600 mb-8">
                  Completa el formulario y un abogado especializado se pondrá en
                  contacto contigo en menos de 24 horas.
                </p>

                <ContactForm services={services} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
              ¿Tienes dudas?
            </h2>
            <p className="text-gray-600 mb-4">
              Consulta nuestra sección de{' '}
              <a href="/preguntas-frecuentes" className="text-gold hover:underline">
                preguntas frecuentes
              </a>{' '}
              o llámanos directamente. Estamos aquí para ayudarte.
            </p>
            <p className="text-gray-500 text-sm">
              La primera consulta es completamente gratuita y confidencial.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
