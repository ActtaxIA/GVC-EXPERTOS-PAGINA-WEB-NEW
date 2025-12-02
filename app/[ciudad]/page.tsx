import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, ArrowRight, MapPin, CheckCircle, Star, Building2 } from 'lucide-react'
import { cities, services, siteConfig } from '@/config/site'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ServiceIcon } from '@/components/ui/Icons'
import { CtaFinal } from '@/components/home'
import { JsonLdLocalBusinessCity, JsonLdBreadcrumbs, JsonLdFAQ } from '@/components/seo/JsonLd'
import { createClient } from '@supabase/supabase-js'
import { CITY_COORDINATES } from '@/lib/google-places'

// Cliente Supabase para server components
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// Generar rutas estáticas para todas las ciudades
export function generateStaticParams() {
  return cities.map((city) => ({
    ciudad: city.slug,
  }))
}

// Generar metadata dinámica
export function generateMetadata({
  params,
}: {
  params: { ciudad: string }
}): Metadata {
  const city = cities.find((c) => c.slug === params.ciudad)

  if (!city) {
    return { title: 'Página no encontrada' }
  }

  const title = `Abogados Negligencias Médicas ${city.name} | ${siteConfig.name}`
  const description = `Despacho de abogados especializado en negligencias médicas en ${city.name}, ${city.province}. ✓ Más de 20 años de experiencia ✓ 95% de casos ganados ✓ Primera consulta gratuita ☎ ${siteConfig.contact.phone}`
  const url = `${siteConfig.url}/${city.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      locale: 'es_ES',
      images: [
        {
          url: `${siteConfig.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `Abogados negligencias médicas ${city.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteConfig.url}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}

// Obtener hospitales de la ciudad
async function getHospitalsForCity(cityName: string) {
  try {
    const { data: hospitals } = await supabase
      .from('hospitals')
      .select('*')
      .eq('city_name', cityName)
      .eq('is_active', true)
      .order('is_public', { ascending: false })
      .order('rating', { ascending: false, nullsFirst: false })
      .limit(8)

    return hospitals || []
  } catch {
    return []
  }
}

// Obtener coordenadas de la ciudad
function getCityCoordinates(citySlug: string) {
  const cityKey = citySlug.replace('abogados-negligencias-medicas-', '')
  return CITY_COORDINATES[cityKey] || null
}

export default async function CiudadPage({
  params,
}: {
  params: { ciudad: string }
}) {
  const city = cities.find((c) => c.slug === params.ciudad)

  if (!city) {
    notFound()
  }

  // Obtener hospitales y coordenadas
  const hospitals = await getHospitalsForCity(city.name)
  const coords = getCityCoordinates(city.slug)

  const benefits = [
    `Especialistas en negligencias médicas en ${city.name}`,
    'Primera consulta gratuita y sin compromiso',
    'Solo cobramos si ganamos tu caso',
    'Más de 20 años de experiencia',
    'Tasa de éxito del 95%',
    `Atención personalizada en toda ${city.province}`,
  ]

  // FAQs específicas de la ciudad para JSON-LD
  const cityFaqs = [
    {
      question: `¿Cuánto cuesta un abogado de negligencias médicas en ${city.name}?`,
      answer: `En GVC Expertos la primera consulta es totalmente gratuita. Además, trabajamos con honorarios a éxito, lo que significa que solo cobramos si ganamos tu caso. No tienes que adelantar ningún dinero.`,
    },
    {
      question: `¿Cómo sé si tengo un caso de negligencia médica en ${city.name}?`,
      answer: `Si has sufrido un daño debido a un error médico, diagnóstico tardío o tratamiento inadecuado en ${city.name}, podrías tener un caso. Solicita una consulta gratuita y nuestros abogados especializados evaluarán tu situación sin compromiso.`,
    },
    {
      question: `¿Cuánto tiempo tengo para reclamar por negligencia médica en ${city.name}?`,
      answer: `El plazo general es de 1 año desde que conoces el daño o desde que finaliza el tratamiento. Sin embargo, cada caso es diferente. Te recomendamos consultarnos lo antes posible para no perder tus derechos.`,
    },
  ]

  return (
    <>
      {/* JSON-LD estructurado para SEO local */}
      <JsonLdLocalBusinessCity
        cityName={city.name}
        citySlug={city.slug}
        province={city.province}
        latitude={coords?.lat}
        longitude={coords?.lng}
      />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Inicio', url: siteConfig.url },
          { name: `Abogados Negligencias Médicas ${city.name}`, url: `${siteConfig.url}/${city.slug}` },
        ]}
      />
      <JsonLdFAQ faqs={cityFaqs} />

      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/error-medico-1408x704.jpg"
            alt={`Abogados negligencias médicas ${city.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/75" />
        </div>

        <div className="container-custom relative z-10 py-12">
          <Breadcrumbs
            items={[{ label: `Abogados Negligencias Médicas ${city.name}` }]}
            className="mb-6 text-gray-400"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/30 rounded-full px-4 py-2 mb-6">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium">
                {city.name}, {city.community}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
              Abogados Negligencias Médicas en{' '}
              <span className="text-gold">{city.name}</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Somos el despacho de referencia en {city.name} para casos de
              negligencias médicas. Con más de 20 años de experiencia y una tasa
              de éxito del 95%, luchamos por conseguir la indemnización que
              mereces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/contacto" className="btn-primary text-center">
                Consulta Gratuita
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
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
              <div>
                <p className="text-3xl font-serif font-bold text-gold">95%</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Éxito
                </p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gold">+2.500</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Casos
                </p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gold">+50M€</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Recuperados
                </p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gold">20+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Años
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                ¿Por qué elegirnos?
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-8">
                Tu Despacho de Confianza en {city.name}
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contacto" className="btn-primary">
                  Solicitar Consulta Gratuita
                </Link>
              </div>
            </div>

            <div className="bg-white p-8 rounded-sm shadow-lg">
              <h3 className="text-xl font-serif font-bold text-charcoal mb-4">
                Contacta con nosotros en {city.name}
              </h3>
              <p className="text-gray-600 mb-6">
                Rellena el formulario y un abogado especializado te contactará
                en menos de 24 horas.
              </p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="input-field"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input-field"
                />
                <textarea
                  placeholder="Describe brevemente tu caso..."
                  rows={3}
                  className="input-field resize-none"
                />
                <div className="flex items-start gap-2">
                  <input type="checkbox" id="privacy-local" className="mt-1" />
                  <label
                    htmlFor="privacy-local"
                    className="text-xs text-gray-600"
                  >
                    Acepto la{' '}
                    <Link
                      href="/politica-privacidad"
                      className="text-gold hover:underline"
                    >
                      política de privacidad
                    </Link>
                  </label>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Enviar Consulta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Hospitales de la ciudad */}
      {hospitals.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                Centros Sanitarios
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
                Hospitales en {city.name}
              </h2>
              <p className="text-gray-600">
                Estos son algunos de los principales hospitales y centros sanitarios
                de {city.name} donde atendemos casos de negligencias médicas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hospitals.map((hospital: any) => (
                <div
                  key={hospital.id}
                  className="bg-cream rounded-sm p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Building2 className="w-8 h-8 text-gold" />
                    <span className={`text-xs px-2 py-1 rounded ${
                      hospital.is_public 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {hospital.is_public ? 'Público' : 'Privado'}
                    </span>
                  </div>
                  
                  <h3 className="font-serif font-semibold text-charcoal mb-2 line-clamp-2">
                    {hospital.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    <MapPin className="w-3 h-3 inline mr-1" />
                    {hospital.address}
                  </p>

                  {hospital.rating && (
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{hospital.rating}</span>
                      <span className="text-gray-400">
                        ({hospital.total_ratings} reseñas)
                      </span>
                    </div>
                  )}

                  {hospital.phone && (
                    <a
                      href={`tel:${hospital.phone}`}
                      className="text-sm text-gold hover:underline flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      {hospital.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-gray-600 text-sm">
                ¿Has sufrido una negligencia en alguno de estos centros?{' '}
                <Link href="/contacto" className="text-gold font-semibold hover:underline">
                  Contacta con nosotros
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className={`section-padding ${hospitals.length > 0 ? 'bg-cream' : 'bg-white'}`}>
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
              Negligencias Médicas que Atendemos en {city.name}
            </h2>
            <p className="text-gray-600">
              Estamos especializados en todo tipo de negligencias médicas.
              Contamos con peritos médicos colaboradores en {city.community}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/negligencias-medicas/${service.slug}`}
                className="flex items-start gap-4 p-6 bg-white rounded-sm hover:bg-charcoal group transition-colors shadow-sm"
              >
                <div className="text-gold flex-shrink-0">
                  <ServiceIcon name={service.icon} className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-charcoal group-hover:text-white transition-colors mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300 transition-colors">
                    {service.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-8 text-center">
              Preguntas Frecuentes sobre Negligencias Médicas en {city.name}
            </h2>
            
            <div className="space-y-4">
              {cityFaqs.map((faq, index) => (
                <details key={index} className="bg-cream rounded-sm p-6 group">
                  <summary className="font-serif font-semibold text-charcoal cursor-pointer list-none flex justify-between items-center">
                    {faq.question}
                    <span className="text-gold group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-600">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Info / SEO Text */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-6 text-center">
              Abogados de Negligencias Médicas en {city.name}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Si has sufrido una <strong>negligencia médica en {city.name}</strong> o en
                cualquier hospital o centro sanitario de {city.province},
                nuestro equipo de abogados especializados puede ayudarte a
                obtener la indemnización que mereces.
              </p>
              <p>
                Atendemos casos de todo tipo de negligencias médicas: <strong>errores
                quirúrgicos</strong>, diagnósticos incorrectos o tardíos, negligencias
                durante el parto, errores de medicación y cualquier otra mala
                praxis médica que haya causado daños al paciente.
              </p>
              <p>
                Nuestro despacho ofrece la <strong>primera consulta totalmente gratuita</strong> y sin compromiso. Analizamos tu caso y te informamos de las
                posibilidades reales de éxito antes de iniciar cualquier
                procedimiento. Además, <strong>solo cobramos si ganamos tu caso</strong>.
              </p>
              <p>
                Con más de 20 años de experiencia y una tasa de éxito del 95% en
                nuestros casos, somos el despacho de referencia para
                <strong> negligencias médicas en {city.name}</strong> y toda {city.community}.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
