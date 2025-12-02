import type { Metadata } from 'next'
import Image from 'next/image'
import { Linkedin, Mail } from 'lucide-react'
import { teamMembers } from '@/config/site'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaFinal } from '@/components/home'

export const metadata: Metadata = {
  title: 'Nuestro Equipo | Abogados Especializados',
  description:
    'Conoce al equipo de abogados de GVC Expertos: profesionales especializados en negligencias médicas con amplia experiencia en derecho sanitario.',
  alternates: {
    canonical: '/equipo',
  },
}

// Bios extendidas para cada miembro
const teamBios: Record<string, string> = {
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

export default function EquipoPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Equipo' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Nuestro <span className="text-gold">Equipo</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Un equipo de profesionales altamente cualificados y especializados
            en derecho sanitario, comprometidos con la defensa de tus derechos.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    {teamBios[member.slug] || 'Profesional especializado en negligencias médicas.'}
                  </p>
                  
                  {/* Social */}
                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <a
                      href="#"
                      className="w-9 h-9 bg-cream rounded-full flex items-center justify-center hover:bg-gold group/icon transition-colors"
                      aria-label={`LinkedIn de ${member.name}`}
                    >
                      <Linkedin className="w-4 h-4 text-charcoal group-hover/icon:text-white transition-colors" />
                    </a>
                    <a
                      href="#"
                      className="w-9 h-9 bg-cream rounded-full flex items-center justify-center hover:bg-gold group/icon transition-colors"
                      aria-label={`Email de ${member.name}`}
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
              Únete a Nuestro Equipo
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Si eres abogado especializado en derecho sanitario y compartes
              nuestra pasión por defender los derechos de los pacientes, nos
              encantaría conocerte. Envíanos tu CV a{' '}
              <a href="mailto:rrhh@gvcexpertos.es" className="text-gold hover:underline">
                rrhh@gvcexpertos.es
              </a>
            </p>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
