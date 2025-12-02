import Link from 'next/link'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function CtaDark() {
  return (
    <section className="bg-charcoal py-16 md:py-20">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              ¿Has sufrido una{' '}
              <span className="text-gold">negligencia médica</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-xl">
              Te ayudamos a conseguir la indemnización que mereces. Primera
              consulta gratuita y sin compromiso.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contacto" className="btn-primary text-center">
              Consulta Gratuita
            </Link>
            <a
              href={siteConfig.contact.phoneHref}
              className="btn-outline-white text-center"
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
