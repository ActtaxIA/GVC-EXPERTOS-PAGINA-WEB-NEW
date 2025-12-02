import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function CtaFinal() {
  return (
    <section className="section-padding bg-gradient-to-br from-charcoal via-charcoal to-charcoal-light relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              ¿Necesitas Ayuda?
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mt-3 mb-6">
              Empieza a Reclamar lo que Te Corresponde
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              No dejes pasar más tiempo. Cada día que pasa puede afectar a tu
              reclamación. Contacta con nosotros hoy y te informaremos de las
              opciones disponibles sin ningún compromiso.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-4 text-white hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Phone className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-gray-400">
                    Llámanos gratis
                  </span>
                  <span className="block text-xl font-semibold">
                    {siteConfig.contact.phone}
                  </span>
                </div>
              </a>

              <a
                href={siteConfig.contact.emailHref}
                className="flex items-center gap-4 text-white hover:text-gold transition-colors group"
              >
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center group-hover:bg-gold transition-colors">
                  <Mail className="w-5 h-5 text-gold group-hover:text-white transition-colors" />
                </div>
                <div>
                  <span className="block text-sm text-gray-400">
                    Escríbenos
                  </span>
                  <span className="block text-xl font-semibold">
                    {siteConfig.contact.email}
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="block text-sm text-gray-400">Visítanos</span>
                  <span className="block font-semibold">
                    {siteConfig.contact.address}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/contacto" className="btn-primary inline-flex items-center">
              Solicitar Consulta Gratuita
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Right - Form Preview or Image */}
          <div className="bg-white p-8 md:p-10 rounded-sm shadow-2xl">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
              Consulta Gratuita
            </h3>
            <p className="text-gray-600 mb-6">
              Cuéntanos tu caso y te contactaremos en menos de 24 horas.
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
              </div>
              <div>
                <textarea
                  placeholder="Describe brevemente tu caso..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  className="mt-1 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  Acepto la{' '}
                  <Link
                    href="/politica-privacidad"
                    className="text-gold hover:underline"
                  >
                    política de privacidad
                  </Link>
                </label>
              </div>
              <button type="submit" className="btn-primary w-full">
                Enviar Consulta
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Tus datos están protegidos y tratados con confidencialidad
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
