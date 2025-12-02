import type { Metadata } from 'next'
import Image from 'next/image'
import { Scale, Users, Award, Target } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaFinal } from '@/components/home'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Historia y Valores',
  description:
    'Conoce la historia de GVC Expertos: más de 20 años especializados en negligencias médicas, defendiendo los derechos de las víctimas de errores médicos.',
  alternates: {
    canonical: '/sobre-nosotros',
  },
}

const values = [
  {
    icon: Scale,
    title: 'Justicia',
    description: 'Luchamos incansablemente para que cada víctima obtenga la compensación justa que merece.',
  },
  {
    icon: Users,
    title: 'Cercanía',
    description: 'Tratamos cada caso con la atención y empatía que requiere, entendiendo el momento difícil que atraviesas.',
  },
  {
    icon: Award,
    title: 'Excelencia',
    description: 'Nos formamos continuamente para ofrecer la mejor defensa posible con los últimos conocimientos jurídicos.',
  },
  {
    icon: Target,
    title: 'Compromiso',
    description: 'No cobramos hasta ganar tu caso. Tu éxito es nuestro éxito.',
  },
]

export default function SobreNosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Sobre Nosotros' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Sobre <span className="text-gold">Nosotros</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Más de dos décadas dedicados exclusivamente a la defensa de víctimas
            de negligencias médicas nos avalan como referentes en España.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                Nuestra Historia
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-6">
                Pioneros en Derecho Sanitario
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  GVC Expertos nació en 2003 de la mano de Pedro García-Valcárcel
                  y Miguel Cáceres, dos abogados que detectaron una necesidad
                  crucial: las víctimas de negligencias médicas necesitaban
                  representación especializada.
                </p>
                <p>
                  Desde entonces, nos hemos dedicado exclusivamente a este área
                  del derecho, convirtiéndonos en uno de los despachos más
                  reconocidos de España en materia de responsabilidad sanitaria.
                </p>
                <p>
                  Nuestra experiencia acumulada en más de 2.500 casos nos permite
                  abordar cada nueva situación con el conocimiento y la seguridad
                  que solo da la especialización.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-xl">
                <Image
                  src="/images/abogados_negligencias_medicas_negligencia_hospital.jpg"
                  alt="Equipo GVC Expertos"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-gold text-white p-6 rounded-sm shadow-lg">
                <p className="text-4xl font-serif font-bold">20+</p>
                <p className="text-sm uppercase tracking-wide">Años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-gold text-sm font-semibold uppercase tracking-widest">
              Nuestros Valores
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
              Lo Que Nos Define
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Estos principios guían cada una de nuestras acciones y nos
              comprometen a ofrecer siempre el mejor servicio a nuestros clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-sm shadow-md text-center group hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-5 group-hover:bg-gold transition-colors">
                  <value.icon className="w-8 h-8 text-gold group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                Por Qué Elegirnos
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3">
                La Diferencia GVC
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                  Especialización Exclusiva
                </h3>
                <p className="text-gray-600">
                  No somos generalistas. Nos dedicamos única y exclusivamente a
                  negligencias médicas, lo que nos permite conocer cada detalle
                  de esta área del derecho.
                </p>
              </div>
              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                  Equipo Multidisciplinar
                </h3>
                <p className="text-gray-600">
                  Trabajamos con médicos forenses, peritos especializados y
                  profesionales sanitarios que nos permiten entender cada caso
                  desde todas las perspectivas.
                </p>
              </div>
              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                  Sin Coste Inicial
                </h3>
                <p className="text-gray-600">
                  Creemos en nuestro trabajo. Por eso no cobramos honorarios
                  hasta que ganamos tu caso. Si no cobramos, tú no pagas.
                </p>
              </div>
              <div className="border-l-4 border-gold pl-6">
                <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                  Resultados Probados
                </h3>
                <p className="text-gray-600">
                  Con una tasa de éxito del 95% y más de 50 millones de euros
                  recuperados, nuestros resultados hablan por sí solos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
