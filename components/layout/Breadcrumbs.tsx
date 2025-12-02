'use client'

import { ChevronRight, Home } from 'lucide-react'
import type { BreadcrumbItem } from '@/types'
import { useTranslations } from 'next-intl'
import { LocalizedLink } from '@/components/ui/LocalizedLink'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  const t = useTranslations('common')
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <LocalizedLink
            href="/"
            className="text-gray-500 hover:text-gold transition-colors flex items-center"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">{t('home')}</span>
          </LocalizedLink>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.href ? (
              <LocalizedLink
                href={item.href}
                className="text-gray-500 hover:text-gold transition-colors"
              >
                {item.label}
              </LocalizedLink>
            ) : (
              <span className="text-charcoal font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
