import {
  Hero,
  IntroSection,
  ServicesSection,
  CtaDark,
  TeamSection,
  ProcessSection,
  GallerySection,
  CtaFinal,
} from '@/components/home'
import { 
  JsonLdOrganization, 
  JsonLdLocalBusiness,
  JsonLdWebsite,
  JsonLdProfessionalService 
} from '@/components/seo/JsonLd'

export default function HomePage() {
  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <JsonLdOrganization />
      <JsonLdLocalBusiness />
      <JsonLdWebsite />
      <JsonLdProfessionalService />
      
      {/* Contenido */}
      <Hero />
      <IntroSection />
      <ServicesSection />
      <CtaDark />
      <TeamSection />
      <ProcessSection />
      <GallerySection />
      <CtaFinal />
    </>
  )
}
