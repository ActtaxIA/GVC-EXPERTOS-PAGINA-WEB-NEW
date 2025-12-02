import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal y condiciones de uso del sitio web de GVC Expertos.',
  alternates: {
    canonical: '/aviso-legal',
  },
}

export default function AvisoLegalPage() {
  return (
    <>
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Aviso Legal' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Aviso <span className="text-gold">Legal</span>
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Datos identificativos</h2>
            <p>
              En cumplimiento del deber de información recogido en el artículo 10
              de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de
              la Información y del Comercio Electrónico, se detallan los
              siguientes datos:
            </p>
            <ul>
              <li>
                <strong>Denominación social:</strong> {siteConfig.legal.company}
              </li>
              <li>
                <strong>CIF:</strong> {siteConfig.legal.cif}
              </li>
              <li>
                <strong>Domicilio social:</strong> {siteConfig.contact.address}
              </li>
              <li>
                <strong>Email:</strong> {siteConfig.contact.email}
              </li>
              <li>
                <strong>Teléfono:</strong> {siteConfig.contact.phone}
              </li>
              <li>
                <strong>Inscripción:</strong> {siteConfig.legal.registro}
              </li>
            </ul>

            <h2>2. Objeto</h2>
            <p>
              El presente sitio web tiene por objeto facilitar información sobre
              los servicios profesionales de asesoramiento jurídico especializado
              en negligencias médicas que presta {siteConfig.legal.company}.
            </p>

            <h2>3. Propiedad intelectual</h2>
            <p>
              Todos los contenidos de este sitio web (incluyendo, sin limitación,
              textos, fotografías, gráficos, imágenes, iconos, tecnología,
              software, links y demás contenidos audiovisuales) son propiedad de{' '}
              {siteConfig.legal.company} o de terceros que han autorizado su uso.
            </p>
            <p>
              Queda prohibida cualquier forma de reproducción, distribución,
              comunicación pública, transformación o cualquier otra actividad que
              se pueda realizar con los contenidos de este sitio web sin la
              autorización expresa de {siteConfig.legal.company}.
            </p>

            <h2>4. Responsabilidades</h2>
            <p>
              {siteConfig.legal.company} no garantiza la inexistencia de errores
              en el acceso al sitio web, en su contenido, ni que éste se
              encuentre actualizado, aunque se compromete a realizar todos los
              esfuerzos necesarios para evitar, subsanar o actualizar dichos
              errores.
            </p>
            <p>
              {siteConfig.legal.company} no se hace responsable de los posibles
              daños o perjuicios que se pudieran derivar de interferencias,
              omisiones, interrupciones, virus informáticos, averías telefónicas
              o desconexiones en el funcionamiento de este sistema electrónico.
            </p>

            <h2>5. Modificaciones</h2>
            <p>
              {siteConfig.legal.company} se reserva el derecho de efectuar las
              modificaciones que considere oportunas en su sitio web, pudiendo
              cambiar, suprimir o añadir tanto los contenidos como los servicios
              que se presten a través del mismo.
            </p>

            <h2>6. Enlaces</h2>
            <p>
              Este sitio web puede contener enlaces a páginas externas sobre las
              cuales {siteConfig.legal.company} no tiene control ni
              responsabilidad sobre su contenido o disponibilidad.
            </p>

            <h2>7. Legislación aplicable</h2>
            <p>
              La relación entre {siteConfig.legal.company} y el usuario se regirá
              por la normativa española vigente. Para la resolución de cualquier
              controversia, las partes se someten a los Juzgados y Tribunales de
              Madrid.
            </p>

            <p className="text-sm text-gray-500 mt-8">
              Última actualización: Diciembre 2024
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
