'use client'

import { ArrowRight } from 'lucide-react'
import { services } from '@/config/site'
import { ServiceIcon } from '@/components/ui/Icons'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { useTranslations } from 'next-intl'

export function ServicesSection() {
  const t = useTranslations('home.services')
  const tCommon = useTranslations('common')
  const tServices = useTranslations('services')
  
  // Mapeo de slugs en español a claves de traducción en inglés
  const serviceSlugMap: Record<string, string> = {
    'errores-quirurgicos': 'surgical-errors',
    'errores-diagnostico': 'diagnostic-errors',
    'negligencia-hospitalaria': 'hospital-negligence',
    'negligencia-obstetrica': 'obstetric-negligence',
    'errores-medicacion': 'medication-errors',
    'consentimiento-informado': 'informed-consent',
  }
  
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
            {t('title')}
          </h2>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const translationKey = serviceSlugMap[service.slug] || service.slug
            return (
              <LocalizedLink
                key={service.slug}
                href={`/negligencias-medicas/${service.slug}`}
                className="group bg-cream p-8 rounded-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gold/20"
              >
                <div className="w-14 h-14 bg-white rounded-sm flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300 shadow-sm">
                  <ServiceIcon
                    name={service.icon}
                    className="w-7 h-7 text-gold group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors">
                  {tServices(`${translationKey}.title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tServices(`${translationKey}.description`)}
                </p>
              <div className="flex items-center text-gold text-sm font-medium">
                {tCommon('learnMore')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </LocalizedLink>
          )})}
        </div>

        {/* CTA */}
        <div className="text-center">
          <LocalizedLink href="/negligencias-medicas" className="btn-secondary">
            {t('viewAllServices')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </LocalizedLink>
        </div>
      </div>
    </section>
  )
}
