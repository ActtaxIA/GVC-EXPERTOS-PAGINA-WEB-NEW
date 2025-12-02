import type { Metadata } from 'next'
import Image from 'next/image'
import { Scale, Users, Award, Target } from 'lucide-react'
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
      ? 'Sobre Nosotros | Historia y Valores'
      : 'About Us | History and Values',
    description: isSpanish
      ? 'Conoce la historia de GVC Expertos: más de 20 años especializados en negligencias médicas, defendiendo los derechos de las víctimas de errores médicos.'
      : 'Learn about GVC Expertos history: more than 20 years specialized in medical negligence, defending the rights of victims of medical errors.',
    alternates: {
      canonical: `/${locale}/sobre-nosotros`,
    },
  }
}

const valuesEs = [
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

const valuesEn = [
  {
    icon: Scale,
    title: 'Justice',
    description: 'We fight tirelessly so that each victim obtains the fair compensation they deserve.',
  },
  {
    icon: Users,
    title: 'Closeness',
    description: 'We treat each case with the attention and empathy it requires, understanding the difficult moment you are going through.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We continuously train to offer the best possible defense with the latest legal knowledge.',
  },
  {
    icon: Target,
    title: 'Commitment',
    description: 'We don\'t charge until we win your case. Your success is our success.',
  },
]

export default function SobreNosotrosPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const isSpanish = locale === 'es'
  const values = isSpanish ? valuesEs : valuesEn
  
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: isSpanish ? 'Sobre Nosotros' : 'About Us' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            {isSpanish ? (
              <>
                Sobre <span className="text-gold">Nosotros</span>
              </>
            ) : (
              <>
                About <span className="text-gold">Us</span>
              </>
            )}
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            {isSpanish
              ? 'Más de dos décadas dedicados exclusivamente a la defensa de víctimas de negligencias médicas nos avalan como referentes en España.'
              : 'More than two decades dedicated exclusively to defending victims of medical negligence make us a reference in Spain.'}
          </p>
        </div>
      </section>

      {/* History */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                {isSpanish ? 'Nuestra Historia' : 'Our History'}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-6">
                {isSpanish ? 'Pioneros en Derecho Sanitario' : 'Pioneers in Health Law'}
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {isSpanish ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <p>
                      GVC Expertos was born in 2003 at the hands of Pedro García-Valcárcel
                      and Miguel Cáceres, two lawyers who detected a crucial need:
                      victims of medical negligence needed specialized representation.
                    </p>
                    <p>
                      Since then, we have dedicated ourselves exclusively to this area
                      of law, becoming one of the most recognized law firms in Spain
                      in healthcare liability.
                    </p>
                    <p>
                      Our accumulated experience in more than 2,500 cases allows us to
                      approach each new situation with the knowledge and security that
                      only specialization provides.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] relative rounded-sm overflow-hidden shadow-xl">
                <Image
                  src="/images/abogados_negligencias_medicas_negligencia_hospital.jpg"
                  alt={isSpanish ? 'Equipo GVC Expertos' : 'GVC Expertos Team'}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-6 -left-6 bg-gold text-white p-6 rounded-sm shadow-lg">
                <p className="text-4xl font-serif font-bold">20+</p>
                <p className="text-sm uppercase tracking-wide">
                  {isSpanish ? 'Años de experiencia' : 'Years of experience'}
                </p>
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
              {isSpanish ? 'Nuestros Valores' : 'Our Values'}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
              {isSpanish ? 'Lo Que Nos Define' : 'What Defines Us'}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {isSpanish
                ? 'Estos principios guían cada una de nuestras acciones y nos comprometen a ofrecer siempre el mejor servicio a nuestros clientes.'
                : 'These principles guide each of our actions and commit us to always offer the best service to our clients.'}
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
                {isSpanish ? 'Por Qué Elegirnos' : 'Why Choose Us'}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3">
                {isSpanish ? 'La Diferencia GVC' : 'The GVC Difference'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {isSpanish ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                      Exclusive Specialization
                    </h3>
                    <p className="text-gray-600">
                      We are not generalists. We dedicate ourselves exclusively to
                      medical negligence, which allows us to know every detail of
                      this area of law.
                    </p>
                  </div>
                  <div className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                      Multidisciplinary Team
                    </h3>
                    <p className="text-gray-600">
                      We work with forensic doctors, specialized experts and
                      healthcare professionals who allow us to understand each case
                      from all perspectives.
                    </p>
                  </div>
                  <div className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                      No Initial Cost
                    </h3>
                    <p className="text-gray-600">
                      We believe in our work. That's why we don't charge fees until
                      we win your case. If we don't charge, you don't pay.
                    </p>
                  </div>
                  <div className="border-l-4 border-gold pl-6">
                    <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                      Proven Results
                    </h3>
                    <p className="text-gray-600">
                      With a 95% success rate and more than 50 million euros
                      recovered, our results speak for themselves.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
