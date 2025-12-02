'use client'

import { Phone, ArrowRight } from 'lucide-react'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { siteConfig } from '@/config/site'
import { useTranslations } from 'next-intl'

export function CtaDark() {
  const t = useTranslations('home.cta')
  
  return (
    <section className="section-padding bg-charcoal">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </section>
  )
}
