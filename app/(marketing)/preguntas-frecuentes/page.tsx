import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Accordion } from '@/components/ui/Accordion'
import { CtaFinal } from '@/components/home'
import { JsonLdFAQ } from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Negligencias Médicas',
  description:
    'Resolvemos tus dudas sobre negligencias médicas: plazos de reclamación, indemnizaciones, proceso legal y más. Consulta nuestras FAQ.',
  alternates: {
    canonical: '/preguntas-frecuentes',
  },
}

const faqCategories = [
  {
    title: 'Sobre Negligencias Médicas',
    faqs: [
      {
        id: 'q1',
        title: '¿Qué es una negligencia médica?',
        content:
          'Una negligencia médica se produce cuando un profesional sanitario actúa de manera imprudente o negligente, apartándose de lo que se considera buena práctica médica (lex artis), y como consecuencia causa un daño al paciente que podría haberse evitado.',
      },
      {
        id: 'q2',
        title: '¿Cómo sé si he sufrido una negligencia médica?',
        content:
          'Para determinar si has sufrido una negligencia médica es necesario analizar si la actuación del profesional sanitario se ajustó a los protocolos establecidos. Te recomendamos solicitar una valoración gratuita de tu caso por nuestros abogados especializados.',
      },
      {
        id: 'q3',
        title: '¿Qué diferencia hay entre una complicación y una negligencia?',
        content:
          'Una complicación es un resultado adverso que puede producirse incluso con una actuación médica correcta. Una negligencia implica que el daño se produjo por una actuación incorrecta o imprudente del profesional. Esta distinción es clave y requiere análisis pericial especializado.',
      },
    ],
  },
  {
    title: 'Sobre el Proceso de Reclamación',
    faqs: [
      {
        id: 'q4',
        title: '¿Cuánto tiempo tengo para reclamar una negligencia médica?',
        content:
          'El plazo general es de 1 año desde que se conoce el daño o sus consecuencias. Sin embargo, este plazo puede variar según el tipo de responsabilidad (pública o privada) y las circunstancias del caso. Es fundamental actuar cuanto antes para no perder tu derecho.',
      },
      {
        id: 'q5',
        title: '¿Qué documentación necesito para iniciar una reclamación?',
        content:
          'Necesitarás tu historia clínica completa, informes médicos, pruebas diagnósticas, recetas y cualquier documento relacionado con tu atención sanitaria. Nosotros te ayudamos a solicitar toda la documentación necesaria.',
      },
      {
        id: 'q6',
        title: '¿Es necesario ir a juicio?',
        content:
          'No siempre. Muchos casos se resuelven mediante acuerdo extrajudicial con la aseguradora del centro o profesional. Solo recurrimos a la vía judicial cuando no es posible alcanzar un acuerdo satisfactorio para el cliente.',
      },
      {
        id: 'q7',
        title: '¿Cuánto dura el proceso de reclamación?',
        content:
          'La duración depende de cada caso. Un acuerdo extrajudicial puede resolverse en 6-12 meses. Si es necesario acudir a juicio, el proceso puede durar entre 2 y 4 años. Te mantendremos informado en cada fase.',
      },
    ],
  },
  {
    title: 'Sobre Indemnizaciones',
    faqs: [
      {
        id: 'q8',
        title: '¿Qué indemnización puedo recibir por una negligencia médica?',
        content:
          'La indemnización se calcula según el baremo de accidentes y puede incluir: gastos médicos y de tratamiento, pérdida de ingresos, daño moral, secuelas permanentes y necesidad de ayuda de terceras personas. Cada caso se valora individualmente.',
      },
      {
        id: 'q9',
        title: '¿Cuánto cuesta contratar vuestros servicios?',
        content:
          'La primera consulta es completamente gratuita. Solo cobramos honorarios si ganamos tu caso, mediante un porcentaje sobre la indemnización obtenida. Si no cobramos, no pagas nada.',
      },
      {
        id: 'q10',
        title: '¿Quién paga la indemnización?',
        content:
          'Generalmente es la compañía de seguros del profesional o centro sanitario la que abona la indemnización. Todos los profesionales sanitarios están obligados a tener un seguro de responsabilidad civil.',
      },
    ],
  },
  {
    title: 'Sobre Nuestro Despacho',
    faqs: [
      {
        id: 'q11',
        title: '¿Por qué elegir GVC Expertos?',
        content:
          'Somos uno de los pocos despachos en España dedicados exclusivamente a negligencias médicas. Con más de 20 años de experiencia y un 95% de casos ganados, contamos con el conocimiento especializado y los peritos médicos necesarios para defender tu caso con éxito.',
      },
      {
        id: 'q12',
        title: '¿Trabajáis en toda España?',
        content:
          'Sí, atendemos casos en toda España. Tenemos sede en Madrid pero contamos con colaboradores en las principales ciudades y podemos gestionar tu caso independientemente de dónde te encuentres.',
      },
      {
        id: 'q13',
        title: '¿Cómo puedo contactar con vosotros?',
        content:
          'Puedes llamarnos al 900 123 456 (llamada gratuita), enviarnos un email a info@gvcexpertos.es o completar el formulario de contacto de nuestra web. Te responderemos en menos de 24 horas.',
      },
    ],
  },
]

// Flatten FAQs for Schema
const allFaqs = faqCategories.flatMap((cat) =>
  cat.faqs.map((faq) => ({
    question: faq.title,
    answer: faq.content,
  }))
)

export default function PreguntasFrecuentesPage() {
  return (
    <>
      <JsonLdFAQ faqs={allFaqs} />

      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Preguntas Frecuentes' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            Preguntas <span className="text-gold">Frecuentes</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl leading-relaxed">
            Resolvemos las dudas más comunes sobre negligencias médicas,
            reclamaciones e indemnizaciones. Si no encuentras respuesta a tu
            pregunta, contáctanos.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((category, index) => (
              <div key={index}>
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6 pb-3 border-b-2 border-gold">
                  {category.title}
                </h2>
                <Accordion items={category.faqs} allowMultiple />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}
