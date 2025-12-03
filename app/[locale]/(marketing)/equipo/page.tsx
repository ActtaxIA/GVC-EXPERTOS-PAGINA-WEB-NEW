import type { Metadata } from 'next'
import Image from 'next/image'
import { Linkedin, Mail } from 'lucide-react'
import { teamMembers, siteConfig } from '@/config/site'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaFinal } from '@/components/home'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isSpanish = locale === 'es'
  
  return {
    title: isSpanish
      ? 'Nuestro Equipo | Abogados Especializados'
      : 'Our Team | Specialized Lawyers',
    description: isSpanish
      ? 'Conoce al equipo de abogados de GVC Expertos: profesionales especializados en negligencias médicas con amplia experiencia en derecho sanitario.'
      : 'Meet the GVC Expertos legal team: professionals specialized in medical negligence with extensive experience in health law.',
    alternates: {
      canonical: `/${locale}/equipo`,
    },
  }
}

// Bios extendidas para cada miembro - Español
const teamBiosEs: Record<string, string> = {
  'pedro-alfonso-garcia-valcarcel':
    'Socio fundador de GVC Expertos y referente nacional en derecho sanitario. Licenciado en Derecho por la Universidad Complutense de Madrid, ha dedicado más de 25 años a la defensa de víctimas de negligencias médicas. Autor de numerosas publicaciones especializadas y ponente habitual en congresos de responsabilidad sanitaria.',
  'raquel-garcia-valcarcel':
    'Socia directora y experta en negligencias obstétricas y ginecológicas. Licenciada en Derecho por la Universidad Autónoma de Madrid. Dirige el departamento de reclamaciones médicas del despacho. Su dedicación a los casos de daños durante el parto la ha convertido en una de las mayores expertas en esta área específica.',
  'miguel-caceres-sanchez':
    'Socio especialista en errores de diagnóstico y tratamiento. Máster en Derecho Sanitario por la Universidad CEU San Pablo. Ha llevado algunos de los casos más importantes de negligencia médica en España, obteniendo indemnizaciones millonarias para sus clientes. Amplia experiencia en litigios contra hospitales.',
  'olga-martinez-martinez':
    'Abogada especializada en negligencias quirúrgicas y hospitalarias. Grado en Derecho por la Universidad de Valencia. Coordinadora del área de atención al cliente. Su meticulosidad en el análisis de historiales clínicos y su capacidad para trabajar con peritos médicos son fundamentales en el éxito de sus casos.',
  'carmen-martinez-ramon':
    'Administración del despacho. Graduada en Administración y Dirección de Empresas. Gestiona la coordinación administrativa de expedientes y asegura una atención personalizada a cada cliente. Su organización y eficiencia son clave en el funcionamiento del despacho.',
}

// Bios extendidas para cada miembro - Inglés
const teamBiosEn: Record<string, string> = {
  'pedro-alfonso-garcia-valcarcel':
    'Founding partner of GVC Expertos and national reference in health law. Law degree from Complutense University of Madrid, he has dedicated more than 25 years to defending victims of medical negligence. Author of numerous specialized publications and regular speaker at healthcare liability conferences.',
  'raquel-garcia-valcarcel':
    'Managing partner and expert in obstetric and gynecological negligence. Law degree from Autonomous University of Madrid. Heads the medical claims department of the firm. Her dedication to birth injury cases has made her one of the leading experts in this specific area.',
  'miguel-caceres-sanchez':
    'Partner specializing in diagnostic and treatment errors. Master\'s in Health Law from CEU San Pablo University. He has handled some of the most important medical negligence cases in Spain, obtaining million-dollar compensation for his clients. Extensive experience in hospital litigation.',
  'olga-martinez-martinez':
    'Lawyer specialized in surgical and hospital negligence. Law degree from University of Valencia. Coordinator of the client care area. Her meticulousness in analyzing clinical records and her ability to work with medical experts are fundamental to the success of her cases.',
  'carmen-martinez-ramon':
    'Firm administration. Graduate in Business Administration and Management. Manages the administrative coordination of files and ensures personalized attention to each client. Her organization and efficiency are key to the firm\'s operation.',
}

export default function EquipoPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const isSpanish = locale === 'es'
  const teamBios = isSpanish ? teamBiosEs : teamBiosEn
  
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: isSpanish ? 'Equipo' : 'Team' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            {isSpanish ? (
              <>
                Nuestro <span className="text-gold">Equipo</span>
              </>
            ) : (
              <>
                Our <span className="text-gold">Team</span>
              </>
            )}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            {isSpanish
              ? 'Un equipo de profesionales altamente cualificados y especializados en derecho sanitario, comprometidos con la defensa de tus derechos.'
              : 'A team of highly qualified professionals specialized in health law, committed to defending your rights.'}
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.slug}
                className="bg-white rounded-sm shadow-md overflow-hidden group"
              >
                {/* Photo */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {/* Info */}
                <div className="p-6">
                  <h2 className="text-xl font-serif font-semibold text-charcoal mb-1">
                    {member.name}
                  </h2>
                  <span className="text-gold text-sm uppercase tracking-wider font-medium block mb-4">
                    {member.position}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {teamBios[member.slug] || (isSpanish 
                      ? 'Profesional especializado en negligencias médicas.'
                      : 'Professional specialized in medical negligence.')}
                  </p>
                  
                  {/* Social */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <a
                      href="#"
                      className="w-9 h-9 bg-cream rounded-full flex items-center justify-center hover:bg-gold group/icon transition-colors"
                      aria-label={`LinkedIn ${isSpanish ? 'de' : 'of'} ${member.name}`}
                    >
                      <Linkedin className="w-4 h-4 text-charcoal group-hover/icon:text-white transition-colors" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 bg-cream rounded-full flex items-center justify-center hover:bg-gold group/icon transition-colors"
                      aria-label={`Email ${isSpanish ? 'de' : 'of'} ${member.name}`}
                    >
                      <Mail className="w-4 h-4 text-charcoal group-hover/icon:text-white transition-colors" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">
              {isSpanish ? 'Únete a Nuestro Equipo' : 'Join Our Team'}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {isSpanish ? (
                <>
                  Si eres abogado especializado en derecho sanitario y compartes
                  nuestra pasión por defender los derechos de los pacientes, nos
                  encantaría conocerte. Envíanos tu CV a{' '}
                  <a href="mailto:contacto@gvcabogados.com" className="text-gold hover:underline">
                    contacto@gvcabogados.com
                  </a>
                </>
              ) : (
                <>
                  If you are a lawyer specialized in health law and share
                  our passion for defending patients' rights, we would love to meet you. Send us your CV to{' '}
                  <a href="mailto:contacto@gvcabogados.com" className="text-gold hover:underline">
                    contacto@gvcabogados.com
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
