import { Scale, Shield, Clock, Award } from 'lucide-react'

const features = [
  {
    icon: Scale,
    title: 'Justicia Especializada',
    description:
      'Somos uno de los pocos despachos en España dedicados exclusivamente a negligencias médicas.',
  },
  {
    icon: Shield,
    title: 'Sin Coste Inicial',
    description:
      'No cobramos honorarios hasta ganar tu caso. Solo cobramos si tú cobras.',
  },
  {
    icon: Clock,
    title: 'Respuesta Inmediata',
    description:
      'Analizamos tu caso en 24-48 horas y te informamos de las posibilidades reales.',
  },
  {
    icon: Award,
    title: 'Máxima Indemnización',
    description:
      'Luchamos por conseguir la indemnización más alta posible para compensar el daño sufrido.',
  },
]

export function IntroSection() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-gold text-sm font-semibold uppercase tracking-widest">
            ¿Por qué elegirnos?
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mt-3 mb-5">
            Defendemos tus Derechos con Experiencia y Dedicación
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Cuando sufres una negligencia médica, necesitas abogados que
            entiendan tanto el derecho como la medicina. Nuestro equipo
            multidisciplinar combina experiencia jurídica con conocimiento
            médico para garantizar la mejor defensa de tus intereses.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-sm shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gold/10 rounded-sm flex items-center justify-center mb-5 group-hover:bg-gold transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-gold group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-charcoal mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
