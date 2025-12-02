import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ExternalLink, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { createClient } from '@supabase/supabase-js'

export const metadata: Metadata = {
  title: 'Noticias | Actualidad en Negligencias Médicas',
  description:
    'Últimas noticias y actualidad sobre negligencias médicas, sentencias judiciales, cambios legislativos y novedades del sector sanitario.',
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function getNews() {
  try {
    const { data: news } = await supabase
      .from('news')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    return news || []
  } catch {
    return []
  }
}

export default async function NoticiasPage() {
  const news = await getNews()

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: 'Noticias' }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Noticias
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Últimas noticias y actualidad sobre negligencias médicas, sentencias
            judiciales y novedades del sector sanitario.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item: any) => (
                <article
                  key={item.id}
                  className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  {item.featured_image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.featured_image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.published_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <h2 className="text-lg font-serif font-bold text-charcoal mb-3 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/noticias/${item.slug}`}
                        className="text-gold font-medium text-sm hover:underline flex items-center gap-1"
                      >
                        Leer más
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      {item.source_url && (
                        <a
                          href={item.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-gray-600"
                          title="Fuente original"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay noticias publicadas todavía.</p>
            </div>
          )}
        </div>
      </section>

      <CtaDark />
    </>
  )
}
