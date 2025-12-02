'use client'

import { Phone, ArrowRight } from 'lucide-react'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { siteConfig } from '@/config/site'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

interface CtaDarkProps {
  variant?: 'dark' | 'light'
}

export function CtaDark({ variant = 'dark' }: CtaDarkProps) {
  const t = useTranslations('home.cta')
  const isLight = variant === 'light'
  
  return (
    <section className={cn(
      "section-padding",
      isLight ? "bg-cream" : "bg-charcoal"
    )}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={cn(
            "text-3xl md:text-4xl font-serif font-bold mb-6",
            isLight ? "text-charcoal" : "text-white"
          )}>
            {t('title')}
          </h2>
          <p className={cn(
            "text-lg mb-10 leading-relaxed",
            isLight ? "text-gray-600" : "text-gray-300"
          )}>
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink href="/contacto" className="btn-primary">
              {t('button')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </LocalizedLink>
            <a
              href={siteConfig.contact.phoneHref}
              className={cn(
                isLight ? "btn-outline" : "btn-outline-white"
              )}
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
