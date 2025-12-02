'use client'

import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { siteConfig } from '@/config/site'
import { useTranslations } from 'next-intl'

export function CtaFinal() {
  const t = useTranslations('home.cta')
  
  return (
    <section className="section-padding bg-gradient-to-br from-charcoal to-charcoal/95">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <LocalizedLink href="/contacto" className="btn-primary">
                {t('button')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </LocalizedLink>
              <a
                href={siteConfig.contact.phoneHref}
                className="btn-outline-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>

          {/* Right Content - Contact Info */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-sm border border-white/10">
            <h3 className="text-xl font-serif font-semibold text-white mb-6">
              Datos de Contacto
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Teléfono</p>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="text-white hover:text-gold transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Email</p>
                  <a
                    href={siteConfig.contact.emailHref}
                    className="text-white hover:text-gold transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Dirección</p>
                  <p className="text-white">{siteConfig.contact.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
