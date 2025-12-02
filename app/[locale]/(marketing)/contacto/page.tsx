import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { siteConfig, services } from '@/config/site'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContactForm } from '@/components/forms/ContactForm'
import { JsonLdContactPage, JsonLdBreadcrumbs } from '@/components/seo/JsonLd'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' })
  const isSpanish = locale === 'es'
  
  const title = isSpanish
    ? 'Contacto | Consulta Gratuita con Abogados Negligencias Médicas'
    : 'Contact | Free Consultation with Medical Negligence Lawyers'
  const description = isSpanish
    ? 'Contacta con nuestros abogados especializados en negligencias médicas. Primera consulta gratuita y sin compromiso. Llámanos al 900 123 456. Respuesta en 24h.'
    : 'Contact our specialized medical negligence lawyers. Free first consultation with no obligation. Call us at 900 123 456. Response within 24h.'
  
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/contacto`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/${locale}/contacto`,
      siteName: siteConfig.name,
      type: 'website',
      locale: isSpanish ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ContactoPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'contact' })
  const isSpanish = locale === 'es'
  
  return (
    <>
      <JsonLdContactPage />
      <JsonLdBreadcrumbs
        items={[
          { name: isSpanish ? 'Inicio' : 'Home', url: siteConfig.url },
          { name: isSpanish ? 'Contacto' : 'Contact', url: `${siteConfig.url}/${locale}/contacto` },
        ]}
      />

      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: isSpanish ? 'Contacto' : 'Contact' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            <span className="text-gold">{isSpanish ? 'Contacta' : 'Contact'}</span>{' '}
            {isSpanish ? 'con Nosotros' : 'Us'}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            {isSpanish
              ? 'Cuéntanos tu caso sin compromiso. Te responderemos en menos de 24 horas con una valoración inicial gratuita.'
              : 'Tell us about your case without obligation. We will respond within 24 hours with a free initial assessment.'}
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
                {isSpanish ? 'Información de Contacto' : 'Contact Information'}
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
                      {isSpanish ? 'Llámanos gratis' : 'Call us free'}
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
                      {isSpanish ? 'Escríbenos' : 'Write to us'}
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
                      {isSpanish ? 'Visítanos' : 'Visit us'}
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
                    <span className="block text-sm text-gray-500">
                      {isSpanish ? 'Horario' : 'Schedule'}
                    </span>
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
                  title={isSpanish ? 'Ubicación GVC Expertos' : 'GVC Expertos Location'}
                  className="rounded-sm"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-10 rounded-sm shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">
                  {isSpanish ? 'Cuéntanos tu caso' : 'Tell us about your case'}
                </h2>
                <p className="text-gray-600 mb-8">
                  {isSpanish
                    ? 'Completa el formulario y un abogado especializado se pondrá en contacto contigo en menos de 24 horas.'
                    : 'Complete the form and a specialized lawyer will contact you within 24 hours.'}
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
              {isSpanish ? '¿Tienes dudas?' : 'Have questions?'}
            </h2>
            <p className="text-gray-600 mb-4">
              {isSpanish ? (
                <>
                  Consulta nuestra sección de{' '}
                  <a href={`/${locale}/preguntas-frecuentes`} className="text-gold hover:underline">
                    preguntas frecuentes
                  </a>{' '}
                  o llámanos directamente. Estamos aquí para ayudarte.
                </>
              ) : (
                <>
                  Check our{' '}
                  <a href={`/${locale}/preguntas-frecuentes`} className="text-gold hover:underline">
                    FAQ section
                  </a>{' '}
                  or call us directly. We are here to help you.
                </>
              )}
            </p>
            <p className="text-gray-500 text-sm">
              {isSpanish
                ? 'La primera consulta es completamente gratuita y confidencial.'
                : 'The first consultation is completely free and confidential.'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

