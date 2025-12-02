'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { siteConfig, navigationLinks } from '@/config/site'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú al hacer resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
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
          <Link href="/" className="relative z-50 flex-shrink-0">
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
              // Menú especial para Servicios con dropdown
              if (link.label === 'Servicios') {
                return (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="text-charcoal hover:text-gold font-medium text-sm uppercase tracking-wide transition-colors flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isServicesOpen && "rotate-180"
                      )} />
                    </Link>
                    
                    {/* Dropdown */}
                    <div
                      className={cn(
                        "absolute top-full left-0 pt-2 w-72 transition-all duration-200",
                        isServicesOpen 
                          ? "opacity-100 visible translate-y-0" 
                          : "opacity-0 invisible -translate-y-2"
                      )}
                    >
                      <div className="bg-white rounded-sm shadow-xl border border-gray-100 py-3">
                        {siteConfig.services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/negligencias-medicas/${service.slug}`}
                            className="block px-5 py-3 text-charcoal hover:bg-cream hover:text-gold transition-colors"
                          >
                            <div className="font-medium text-sm">{service.title}</div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {service.shortDescription}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              
              // Enlaces normales
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-charcoal hover:text-gold font-medium text-sm uppercase tracking-wide transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-2 text-gold font-semibold hover:text-gold-dark transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <Link href="/contacto" className="btn-primary">
              Consulta Gratis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-50 p-2 text-charcoal hover:text-gold transition-colors"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 lg:hidden transition-opacity duration-300 z-40',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-sm bg-white lg:hidden transition-transform duration-300 ease-in-out z-40 overflow-y-auto',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="pt-24 pb-8 px-6">
          <nav className="flex flex-col gap-1">
            {navigationLinks.map((link) => {
              // Menú especial para Servicios con dropdown en móvil
              if (link.label === 'Servicios') {
                return (
                  <div key={link.href} className="flex flex-col">
                    <button
                      onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                      className="py-3 px-4 text-charcoal hover:text-gold hover:bg-cream rounded-sm font-medium text-lg transition-colors flex items-center justify-between w-full text-left"
                    >
                      {link.label}
                      <ChevronDown className={cn(
                        "w-5 h-5 transition-transform duration-200",
                        isMobileServicesOpen && "rotate-180"
                      )} />
                    </button>
                    
                    {/* Submenú móvil */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        isMobileServicesOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="pl-4 pt-2 pb-2 space-y-1">
                        {siteConfig.services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/negligencias-medicas/${service.slug}`}
                            onClick={() => {
                              setIsMenuOpen(false)
                              setIsMobileServicesOpen(false)
                            }}
                            className="block py-2 px-4 text-gray-600 hover:text-gold hover:bg-cream rounded-sm text-sm transition-colors"
                          >
                            {service.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }
              
              // Enlaces normales
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 text-charcoal hover:text-gold hover:bg-cream rounded-sm font-medium text-lg transition-colors"
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <hr className="my-6 border-gray-200" />

          {/* Mobile Contact */}
          <div className="space-y-4">
            <a
              href={siteConfig.contact.phoneHref}
              className="flex items-center gap-3 py-3 px-4 text-gold font-semibold text-lg hover:bg-cream rounded-sm transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <Link
              href="/contacto"
              onClick={() => setIsMenuOpen(false)}
              className="btn-primary w-full text-center"
            >
              Consulta Gratuita
            </Link>
          </div>

          {/* Mobile Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              {siteConfig.contact.schedule}
            </p>
            <p className="text-sm text-gray-500">{siteConfig.contact.address}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
