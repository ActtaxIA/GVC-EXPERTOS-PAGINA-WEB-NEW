import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies del sitio web de GVC Expertos.',
  alternates: {
    canonical: '/politica-cookies',
  },
}

export default function PoliticaCookiesPage() {
  return (
    <>
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Política de Cookies' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
            Política de <span className="text-gold">Cookies</span>
          </h1>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>¿Qué son las cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que los sitios web
              almacenan en tu dispositivo cuando los visitas. Se utilizan
              ampliamente para hacer que los sitios web funcionen de manera más
              eficiente y proporcionar información a los propietarios del sitio.
            </p>

            <h2>Tipos de cookies que utilizamos</h2>

            <h3>Cookies técnicas (necesarias)</h3>
            <p>
              Son esenciales para el funcionamiento del sitio web. Permiten
              navegar por la página y utilizar sus funciones básicas.
            </p>

            <h3>Cookies analíticas</h3>
            <p>
              Nos ayudan a entender cómo los visitantes interactúan con el sitio
              web, recopilando información de forma anónima. Utilizamos Google
              Analytics para este fin.
            </p>

            <h3>Cookies de preferencias</h3>
            <p>
              Permiten recordar tus preferencias (como el idioma o la región) y
              proporcionar funciones mejoradas y más personalizadas.
            </p>

            <h2>Cookies de terceros</h2>
            <p>Este sitio web puede utilizar cookies de terceros:</p>
            <ul>
              <li>
                <strong>Google Analytics:</strong> Para analizar el tráfico del
                sitio web
              </li>
              <li>
                <strong>Google Maps:</strong> Si mostramos mapas de ubicación
              </li>
            </ul>

            <h2>Gestión de cookies</h2>
            <p>
              Puedes gestionar las cookies a través de la configuración de tu
              navegador. A continuación, te indicamos cómo hacerlo en los
              navegadores más comunes:
            </p>
            <ul>
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2>Actualización de la política</h2>
            <p>
              Esta política de cookies puede ser actualizada periódicamente para
              reflejar cambios en las cookies que utilizamos o por otras razones
              operativas, legales o regulatorias.
            </p>

            <h2>Contacto</h2>
            <p>
              Si tienes alguna pregunta sobre nuestra política de cookies, puedes
              contactarnos en{' '}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
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
