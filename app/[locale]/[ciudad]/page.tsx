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

// Generar rutas estáticas para todas las ciudades y locales
export function generateStaticParams() {
  const params: { locale: string; ciudad: string }[] = []
  cities.forEach((city) => {
    params.push({ locale: 'es', ciudad: city.slug })
    params.push({ locale: 'en', ciudad: city.slug })
  })
  return params
}

// Generar metadata dinámica
export function generateMetadata({
  params,
}: {
  params: { locale: string; ciudad: string }
}): Metadata {
  const city = cities.find((c) => c.slug === params.ciudad)

  if (!city) {
    return { title: 'Página no encontrada' }
  }

  const isSpanish = params.locale === 'es'
  const title = isSpanish
    ? `Abogados Negligencias Médicas ${city.name} | ${siteConfig.name}`
    : `Medical Negligence Lawyers ${city.name} | ${siteConfig.name}`
  const description = isSpanish
    ? `Despacho de abogados especializado en negligencias médicas en ${city.name}, ${city.province}. ✓ Más de 20 años de experiencia ✓ 95% de casos ganados ✓ Primera consulta gratuita ☎ ${siteConfig.contact.phone}`
    : `Law firm specialized in medical negligence in ${city.name}, ${city.province}. ✓ Over 20 years of experience ✓ 95% success rate ✓ Free first consultation ☎ ${siteConfig.contact.phone}`
  const url = `${siteConfig.url}/${params.locale}/${city.slug}`

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
      locale: isSpanish ? 'es_ES' : 'en_US',
      images: [
        {
          url: `${siteConfig.url}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isSpanish ? `Abogados negligencias médicas ${city.name}` : `Medical negligence lawyers ${city.name}`,
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
  params: { locale: string; ciudad: string }
}) {
  const city = cities.find((c) => c.slug === params.ciudad)

  if (!city) {
    notFound()
  }

  // Obtener hospitales y coordenadas
  const hospitals = await getHospitalsForCity(city.name)
  const coords = getCityCoordinates(city.slug)

  const isSpanish = params.locale === 'es'
  
  const benefits = isSpanish
    ? [
        `Especialistas en negligencias médicas en ${city.name}`,
        'Primera consulta gratuita y sin compromiso',
        'Solo cobramos si ganamos tu caso',
        'Más de 20 años de experiencia',
        'Tasa de éxito del 95%',
        `Atención personalizada en toda ${city.province}`,
      ]
    : [
        `Medical negligence specialists in ${city.name}`,
        'Free first consultation with no obligation',
        'We only charge if we win your case',
        'Over 20 years of experience',
        '95% success rate',
        `Personalized attention throughout ${city.province}`,
      ]

  // FAQs específicas de la ciudad para JSON-LD
  const cityFaqs = isSpanish
    ? [
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
    : [
        {
          question: `How much does a medical negligence lawyer cost in ${city.name}?`,
          answer: `At GVC Expertos the first consultation is completely free. In addition, we work on a success fee basis, which means we only charge if we win your case. You don't have to advance any money.`,
        },
        {
          question: `How do I know if I have a medical negligence case in ${city.name}?`,
          answer: `If you have suffered harm due to a medical error, late diagnosis or inadequate treatment in ${city.name}, you could have a case. Request a free consultation and our specialized lawyers will evaluate your situation without obligation.`,
        },
        {
          question: `How long do I have to claim for medical negligence in ${city.name}?`,
          answer: `The general term is 1 year from when you know about the damage or from when treatment ends. However, each case is different. We recommend consulting us as soon as possible so as not to lose your rights.`,
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
          { name: isSpanish ? 'Inicio' : 'Home', url: siteConfig.url },
          { 
            name: isSpanish 
              ? `Abogados Negligencias Médicas ${city.name}` 
              : `Medical Negligence Lawyers ${city.name}`, 
            url: `${siteConfig.url}/${params.locale}/${city.slug}` 
          },
        ]}
      />
      <JsonLdFAQ faqs={cityFaqs} />

      {/* Hero */}
      <section className="relative min-h-[500px] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/error-medico-1408x704.jpg"
            alt={isSpanish ? `Abogados negligencias médicas ${city.name}` : `Medical negligence lawyers ${city.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/85 to-charcoal/75" />
        </div>

        <div className="container-custom relative z-10 py-12">
          <Breadcrumbs
            items={[{ 
              label: isSpanish 
                ? `Abogados Negligencias Médicas ${city.name}` 
                : `Medical Negligence Lawyers ${city.name}` 
            }]}
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
              {isSpanish ? (
                <>
                  Abogados Negligencias Médicas en{' '}
                  <span className="text-gold">{city.name}</span>
                </>
              ) : (
                <>
                  Medical Negligence Lawyers in{' '}
                  <span className="text-gold">{city.name}</span>
                </>
              )}
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {isSpanish
                ? `Somos el despacho de referencia en ${city.name} para casos de negligencias médicas. Con más de 20 años de experiencia y una tasa de éxito del 95%, luchamos por conseguir la indemnización que mereces.`
                : `We are the reference law firm in ${city.name} for medical negligence cases. With over 20 years of experience and a 95% success rate, we fight to get you the compensation you deserve.`}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href={`/${params.locale}/contacto`} className="btn-primary text-center">
                {isSpanish ? 'Consulta Gratuita' : 'Free Consultation'}
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
                  {isSpanish ? 'Éxito' : 'Success'}
                </p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gold">+2.500</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {isSpanish ? 'Casos' : 'Cases'}
                </p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gold">+50M€</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {isSpanish ? 'Recuperados' : 'Recovered'}
                </p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-gold">20+</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {isSpanish ? 'Años' : 'Years'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resto del contenido - simplificado por ahora */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-8">
              {isSpanish 
                ? `Tu Despacho de Confianza en ${city.name}`
                : `Your Trusted Law Firm in ${city.name}`}
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 justify-center">
                  <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href={`/${params.locale}/contacto`} className="btn-primary">
                {isSpanish ? 'Solicitar Consulta Gratuita' : 'Request Free Consultation'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}

