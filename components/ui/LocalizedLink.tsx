'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { getLocalizedPath } from '@/lib/i18n-utils'

interface LocalizedLinkProps extends React.ComponentProps<typeof Link> {
  href: string
  children: React.ReactNode
}

export function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'es'
  const localizedHref = getLocalizedPath(href, locale as 'es' | 'en')
  
  return <Link href={localizedHref} {...props} />
}

