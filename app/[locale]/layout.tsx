import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/ui/BackToTop'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { ServiceWorkerRegistration } from '@/components/ServiceWorkerRegistration'
import { siteConfig } from '@/config/site'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#b8860b',
}

const locales = ['es', 'en']

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isSpanish = locale === 'es'
  
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: isSpanish 
        ? `${siteConfig.name} | Abogados Negligencias Médicas España`
        : `${siteConfig.name} | Medical Negligence Lawyers Spain`,
      template: `%s | ${siteConfig.name}`,
    },
    description: isSpanish 
      ? siteConfig.description
      : 'Specialized law firm in medical negligence with over 20 years of experience defending patients\' rights in Spain.',
    keywords: isSpanish
      ? [
          'abogados negligencias médicas',
          'negligencia médica',
          'error médico',
          'indemnización negligencia',
          'abogado mala praxis',
          'reclamación sanitaria',
        ]
      : [
          'medical negligence lawyers',
          'medical malpractice',
          'medical error',
          'negligence compensation',
          'malpractice lawyer',
          'healthcare claim',
        ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    manifest: '/manifest.json',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        'es': `${siteConfig.url}/es`,
        'en': `${siteConfig.url}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: `${siteConfig.url}/${locale}`,
      title: isSpanish 
        ? `${siteConfig.name} | Abogados Negligencias Médicas`
        : `${siteConfig.name} | Medical Negligence Lawyers`,
      description: isSpanish 
        ? siteConfig.description
        : 'Specialized lawyers in medical negligence with over 20 years of experience',
      siteName: siteConfig.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name,
      description: isSpanish ? siteConfig.description : 'Medical Negligence Specialists',
      creator: '@gvc_abogados',
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validar que el locale sea válido
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // Obtener mensajes de traducción
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${playfair.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen bg-white text-charcoal antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <BackToTop />
          <CookieBanner />
          <ServiceWorkerRegistration />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

