'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import { Menu, X, Phone, ChevronDown, Languages, Twitter, Facebook } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'
import { getLocalizedPath, translatePath } from '@/lib/i18n-utils'
import { getTranslatedRoute, getTranslatedServiceRoute } from '@/lib/routes'

// Componente del menú móvil que se renderiza con Portal
function MobileMenu({
  isOpen,
  onClose,
  locale,
  navigationLinks,
  spanishPath,
  englishPath,
}: {
  isOpen: boolean
  onClose: () => void
  locale: 'es' | 'en'
  navigationLinks: { label: string; href: string }[]
  spanishPath: string
  englishPath: string
}) {
  const tCommon = useTranslations('common')
  const tFooter = useTranslations('footer')
  const tServices = useTranslations('services')
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  const menuContent = (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        style={{ zIndex: 99998 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-sm bg-white lg:hidden transition-transform duration-300 ease-in-out overflow-y-auto shadow-2xl',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ zIndex: 99999 }}
      >
        {/* Header del menú móvil */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2" onClick={onClose}>
            <Image
              src="/images/logo.png"
              alt={siteConfig.name}
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-charcoal hover:text-gold transition-colors"
            aria-label={tCommon('close')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-4 py-4">
          <nav className="flex flex-col gap-0.5">
            {navigationLinks.map((link) => {
              const isServicesRoute = link.href === getTranslatedRoute('services', locale)
              if (isServicesRoute) {
                return (
                  <div key={link.href} className="flex flex-col">
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="py-2.5 px-4 text-charcoal hover:text-gold hover:bg-cream rounded-md font-medium text-base transition-colors flex items-center justify-between w-full text-left"
                    >
                      {link.label}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isMobileServicesOpen && "rotate-180"
                      )} />
                    </button>
                    
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isMobileServicesOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="pl-4 pt-1 pb-1 space-y-0.5">
                        {siteConfig.services.map((service) => {
                          const servicePath = getTranslatedServiceRoute(service.slug, locale)
                          const serviceSlugMap: Record<string, string> = {
                            'errores-quirurgicos': 'surgical-errors',
                            'errores-diagnostico': 'diagnostic-errors',
                            'negligencia-hospitalaria': 'hospital-negligence',
                            'negligencia-obstetrica': 'obstetric-negligence',
                            'errores-medicacion': 'medication-errors',
                            'consentimiento-informado': 'informed-consent',
                          }
                          const translationKey = serviceSlugMap[service.slug] || service.slug
                          return (
                            <Link
                              key={service.slug}
                              href={getLocalizedPath(servicePath, locale)}
                              onClick={() => {
                                onClose()
                                setIsMobileServicesOpen(false)
                              }}
                              className="block py-2 px-4 text-gray-600 hover:text-gold hover:bg-cream rounded-md text-sm transition-colors"
                            >
                              {tServices(`${translationKey}.title`)}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }
              
              return (
                <Link
                  key={link.href}
                  href={getLocalizedPath(link.href, locale)}
                  onClick={onClose}
                  className="py-2.5 px-4 text-charcoal hover:text-gold hover:bg-cream rounded-md font-medium text-base transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="my-4 border-t border-gray-200" />

          {/* Language Selector */}
          <div className="mb-4">
            <div className="flex items-center gap-2 px-4 py-1.5 mb-2">
              <Languages className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{tCommon('language')}</span>
            </div>
            <div className="pl-4 space-y-0.5">
              <Link
                href={spanishPath}
                onClick={onClose}
                className={cn(
                  "block py-2 px-4 rounded-md text-sm transition-colors",
                  locale === 'es' 
                    ? 'text-gold font-semibold bg-cream' 
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                🇪🇸 Español
              </Link>
              <Link
                href={englishPath}
                onClick={onClose}
                className={cn(
                  "block py-2 px-4 rounded-md text-sm transition-colors",
                  locale === 'en' 
                    ? 'text-gold font-semibold bg-cream' 
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                🇬🇧 English
              </Link>
            </div>
          </div>

          <div className="my-4 border-t border-gray-200" />

          {/* Contact */}
          <div className="space-y-3">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-3 py-2.5 px-4 text-gold font-semibold text-base hover:bg-cream rounded-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <Link
              href={getLocalizedPath(getTranslatedRoute('contact', locale), locale)}
              onClick={onClose}
              className="btn-primary w-full text-center text-sm py-2.5"
            >
              {tCommon('contactUs')}
            </Link>
          </div>

          {/* Social Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-medium">
              {tFooter('followUs')}
            </p>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gold hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-1">
              {siteConfig.contact.schedule}
            </p>
            <p className="text-xs text-gray-400">{siteConfig.contact.address}</p>
          </div>
        </div>
      </div>
    </>
  )

  // Usar Portal para renderizar fuera del header
  return createPortal(menuContent, document.body)
}

export function Header() {
  const pathname = usePathname()
  const locale = useLocale() as 'es' | 'en'
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const tServices = useTranslations('services')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  
  const spanishPath = pathname ? translatePath(pathname, 'es') : '/es'
  const englishPath = pathname ? translatePath(pathname, 'en') : '/en'
  
  const navigationLinks = [
    { label: t('home'), href: getTranslatedRoute('home', locale) },
    { label: t('services'), href: getTranslatedRoute('services', locale) },
    { label: t('about'), href: getTranslatedRoute('about', locale) },
    { label: t('team'), href: getTranslatedRoute('team', locale) },
    { label: t('blog'), href: getTranslatedRoute('blog', locale) },
    { label: t('contact'), href: getTranslatedRoute('contact', locale) },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-md py-3'
            : 'bg-white py-4'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="relative z-50 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt={siteConfig.name}
                width={180}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navigationLinks.map((link) => {
                const isServicesRoute = link.href === getTranslatedRoute('services', locale)
                if (isServicesRoute) {
                  return (
                    <div
                      key={link.href}
                      className="relative group"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link
                        href={getLocalizedPath(link.href, locale)}
                        className="text-charcoal hover:text-gold font-medium text-sm uppercase tracking-wide transition-colors flex items-center gap-1"
                      >
                        {link.label}
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isServicesOpen && "rotate-180"
                        )} />
                      </Link>
                      
                      <div
                        className={cn(
                          "absolute top-full left-0 pt-2 w-72 transition-all duration-200",
                          isServicesOpen 
                            ? "opacity-100 visible translate-y-0" 
                            : "opacity-0 invisible -translate-y-2"
                        )}
                      >
                        <div className="bg-white rounded-sm shadow-xl border border-gray-100 py-3">
                          {siteConfig.services.map((service) => {
                            const servicePath = getTranslatedServiceRoute(service.slug, locale)
                            const serviceSlugMap: Record<string, string> = {
                              'errores-quirurgicos': 'surgical-errors',
                              'errores-diagnostico': 'diagnostic-errors',
                              'negligencia-hospitalaria': 'hospital-negligence',
                              'negligencia-obstetrica': 'obstetric-negligence',
                              'errores-medicacion': 'medication-errors',
                              'consentimiento-informado': 'informed-consent',
                            }
                            const translationKey = serviceSlugMap[service.slug] || service.slug
                            return (
                              <Link
                                key={service.slug}
                                href={getLocalizedPath(servicePath, locale)}
                                className="block px-5 py-3 text-charcoal hover:bg-cream hover:text-gold transition-colors"
                              >
                                <div className="font-medium text-sm">{tServices(`${translationKey}.title`)}</div>
                                <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                                  {tServices(`${translationKey}.description`)}
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={link.href}
                    href={getLocalizedPath(link.href, locale)}
                    className="text-charcoal hover:text-gold font-medium text-sm uppercase tracking-wide transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative group">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-charcoal hover:text-gold transition-colors"
                  aria-label="Select language"
                >
                  <Languages className="w-4 h-4" />
                  <span className="uppercase">{locale}</span>
                </button>
                
                <div className={cn(
                  "absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg transition-all duration-200 z-50",
                  isLangOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}>
                  <div className="py-1">
                    <Link
                      href={spanishPath}
                      onClick={() => setIsLangOpen(false)}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                        locale === 'es' ? 'text-gold font-semibold' : 'text-gray-700'
                      )}
                    >
                      🇪🇸 Español
                    </Link>
                    <Link
                      href={englishPath}
                      onClick={() => setIsLangOpen(false)}
                      className={cn(
                        "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                        locale === 'en' ? 'text-gold font-semibold' : 'text-gray-700'
                      )}
                    >
                      🇬🇧 English
                    </Link>
                  </div>
                </div>
              </div>
              
              <a
                href={siteConfig.contact.phoneHref}
                className="flex items-center gap-2 text-gold font-semibold hover:text-gold-dark transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>{siteConfig.contact.phone}</span>
              </a>
              <Link href={getLocalizedPath(getTranslatedRoute('contact', locale), locale)} className="btn-primary">
                {tCommon('contactUs')}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative p-2 text-charcoal hover:text-gold transition-colors"
              style={{ zIndex: 100000 }}
              aria-label={isMenuOpen ? tCommon('close') : tCommon('menu')}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Renderizado con Portal fuera del header */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        locale={locale}
        navigationLinks={navigationLinks}
        spanishPath={spanishPath}
        englishPath={englishPath}
      />
    </>
  )
}
