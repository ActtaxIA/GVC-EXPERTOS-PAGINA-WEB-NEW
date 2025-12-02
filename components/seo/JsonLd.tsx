import { siteConfig } from '@/config/site'

// ============================================
// ORGANIZATION - Para toda la web
// ============================================
export function JsonLdOrganization() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      '@type': 'ImageObject',
      url: `${siteConfig.url}/images/logo.png`,
      width: 300,
      height: 60,
    },
    description: siteConfig.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/ Gran Vía, 28',
      addressLocality: 'Madrid',
      postalCode: '28013',
      addressCountry: 'ES',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
        availableLanguage: ['Spanish'],
        areaServed: 'ES',
      },
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'sales',
        availableLanguage: ['Spanish'],
        areaServed: 'ES',
      },
    ],
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
      siteConfig.social.facebook,
    ].filter(Boolean),
    foundingDate: '2003',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: 15,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// LOCAL BUSINESS / LEGAL SERVICE
// ============================================
export function JsonLdLocalBusiness() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${siteConfig.url}/#legalbusiness`,
    name: siteConfig.name,
    image: [
      `${siteConfig.url}/images/og-image.jpg`,
      `${siteConfig.url}/images/logo.png`,
    ],
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: siteConfig.description,
    slogan: 'Más de 20 años defendiendo los derechos de los pacientes',
    priceRange: '€€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/ Gran Vía, 28',
      addressLocality: 'Madrid',
      postalCode: '28013',
      addressRegion: 'Madrid',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4200,
      longitude: -3.7025,
    },
    hasMap: 'https://maps.google.com/?q=Gran+Via+28+Madrid',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      worstRating: '1',
      reviewCount: '127',
      ratingCount: '127',
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: 'María G.',
        },
        reviewBody: 'Excelente equipo de profesionales. Consiguieron una indemnización justa por mi caso de negligencia médica.',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 40.4168,
        longitude: -3.7038,
      },
      geoRadius: '500000',
    },
    knowsAbout: [
      'Negligencias médicas',
      'Errores de diagnóstico',
      'Errores quirúrgicos',
      'Mala praxis médica',
      'Derecho sanitario',
      'Indemnizaciones médicas',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// WEBSITE - Para SEO general
// ============================================
export function JsonLdWebsite() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'es-ES',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// BREADCRUMBS
// ============================================
export function JsonLdBreadcrumbs({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// SERVICE - Para páginas de servicios
// ============================================
export function JsonLdService({
  name,
  description,
  url,
  image,
}: {
  name: string
  description: string
  url: string
  image?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    image: image || `${siteConfig.url}/images/og-image.jpg`,
    provider: {
      '@type': 'LegalService',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    serviceType: 'Legal Service',
    category: 'Negligencias Médicas',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de reclamación por negligencia médica',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Consulta gratuita inicial',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Estudio de viabilidad del caso',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Reclamación judicial',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// FAQ - Para preguntas frecuentes
// ============================================
export function JsonLdFAQ({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// ARTICLE - Para blog posts
// ============================================
export function JsonLdArticle({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
}: {
  title: string
  description: string
  url?: string
  image?: string
  datePublished: string
  dateModified?: string
  author: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: url || siteConfig.url,
    image: image || `${siteConfig.url}/images/og-image.jpg`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      url: `${siteConfig.url}/equipo`,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url || siteConfig.url,
    },
    inLanguage: 'es-ES',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// NEWS ARTICLE - Para noticias
// ============================================
export function JsonLdNewsArticle({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description,
    url,
    image: image || `${siteConfig.url}/images/og-image.jpg`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'es-ES',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// LOCAL BUSINESS para ciudades específicas
// ============================================
export function JsonLdLocalBusinessCity({
  cityName,
  citySlug,
  province,
  latitude,
  longitude,
}: {
  cityName: string
  citySlug: string
  province: string
  latitude?: number
  longitude?: number
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${siteConfig.url}/${citySlug}/#localbusiness`,
    name: `${siteConfig.name} - Abogados Negligencias Médicas en ${cityName}`,
    image: `${siteConfig.url}/images/og-image.jpg`,
    url: `${siteConfig.url}/${citySlug}`,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    description: `Abogados especializados en negligencias médicas en ${cityName}, ${province}. Más de 20 años de experiencia. Consulta gratuita.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: cityName,
      addressRegion: province,
      addressCountry: 'ES',
    },
    geo: latitude && longitude ? {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    } : undefined,
    areaServed: {
      '@type': 'City',
      name: cityName,
    },
    priceRange: '€€€',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      reviewCount: '127',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// PERSON - Para páginas de equipo
// ============================================
export function JsonLdPerson({
  name,
  jobTitle,
  image,
  description,
  sameAs,
}: {
  name: string
  jobTitle: string
  image?: string
  description?: string
  sameAs?: string[]
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    image: image || `${siteConfig.url}/images/team/default.jpg`,
    description,
    worksFor: {
      '@type': 'LegalService',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    sameAs: sameAs || [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// CONTACT PAGE
// ============================================
export function JsonLdContactPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto - GVC Expertos',
    description: 'Contacta con nuestros abogados especializados en negligencias médicas. Consulta gratuita y sin compromiso.',
    url: `${siteConfig.url}/contacto`,
    mainEntity: {
      '@type': 'LegalService',
      name: siteConfig.name,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// ABOUT PAGE
// ============================================
export function JsonLdAboutPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre Nosotros - GVC Expertos',
    description: 'Conoce a GVC Expertos, despacho de abogados especializado en negligencias médicas con más de 20 años de experiencia.',
    url: `${siteConfig.url}/sobre-nosotros`,
    mainEntity: {
      '@id': `${siteConfig.url}/#organization`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ============================================
// PROFESSIONAL SERVICE (alternativa a LegalService)
// ============================================
export function JsonLdProfessionalService() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    image: `${siteConfig.url}/images/og-image.jpg`,
    description: siteConfig.description,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'C/ Gran Vía, 28',
      addressLocality: 'Madrid',
      postalCode: '28013',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.4200',
      longitude: '-3.7025',
    },
    areaServed: 'ES',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios Legales',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Negligencias Médicas',
          itemListElement: siteConfig.services.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.title,
              url: `${siteConfig.url}/negligencias-medicas/${service.slug}`,
            },
          })),
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
