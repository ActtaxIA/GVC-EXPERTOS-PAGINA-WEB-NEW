'use client'

import Image from 'next/image'
import { Phone, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { useTranslations } from 'next-intl'

export function Hero() {
  const t = useTranslations('home.hero')
  
  return (
    <section className="relative min-h-[520px] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/error-medico-1408x704.jpg"
          alt={t('title')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/80 to-charcoal/70" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            <span className="text-gold text-sm font-medium">
              {t('ctaPrimary')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-[50px] font-serif font-bold text-white leading-tight mb-6">
            {t('title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-[17px] text-gray-300 leading-relaxed mb-8 max-w-2xl">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <LocalizedLink href="/contacto" className="btn-primary text-center">
              {t('ctaPrimary')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </LocalizedLink>
            <a
              href={siteConfig.contact.phoneHref}
              className="btn-outline-white text-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              {siteConfig.contact.phone}
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-[38px] font-serif font-bold text-gold">
                {siteConfig.stats.successRate}
              </p>
              <p className="text-xs md:text-[12px] text-gray-400 uppercase tracking-wider mt-1">
                {t('statsSuccessRate')}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-[38px] font-serif font-bold text-gold">
                {siteConfig.stats.casesWon}
              </p>
              <p className="text-xs md:text-[12px] text-gray-400 uppercase tracking-wider mt-1">
                {t('statsCasesWon')}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-[38px] font-serif font-bold text-gold">
                {siteConfig.stats.compensation}
              </p>
              <p className="text-xs md:text-[12px] text-gray-400 uppercase tracking-wider mt-1">
                {t('statsCompensation')}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-[38px] font-serif font-bold text-gold">
                {siteConfig.stats.yearsExperience}+
              </p>
              <p className="text-xs md:text-[12px] text-gray-400 uppercase tracking-wider mt-1">
                {t('statsYearsExperience')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
