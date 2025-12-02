'use client'

import { processSteps } from '@/config/site'
import { useTranslations } from 'next-intl'

export function ProcessSection() {
  const t = useTranslations('home.process')
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
            {t('title')}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line for desktop */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -translate-x-1/2 z-0">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold rounded-full" />
                </div>
              )}
              
              <div className="relative z-10 bg-white p-8 rounded-sm border border-gray-100 hover:border-gold/30 hover:shadow-lg transition-all duration-300">
                {/* Number */}
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-gold transition-colors duration-300">
                  <span className="text-2xl font-serif font-bold text-gold group-hover:text-white transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                  {t(`step${index + 1}.title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`step${index + 1}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
