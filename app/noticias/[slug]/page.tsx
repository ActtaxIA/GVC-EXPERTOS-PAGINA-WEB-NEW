import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { siteConfig } from '@/config/site'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function getNewsItem(slug: string) {
  try {
    const { data: item } = await supabase
      .from('news')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    return item
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const item = await getNewsItem(params.slug)

  if (!item) {
    return { title: 'Noticia no encontrada' }
  }

  return {
    title: item.meta_title || item.title,
    description: item.meta_description || item.excerpt,
  }
}

export default async function NoticiaPage({
  params,
}: {
  params: { slug: string }
}) {
  const item = await getNewsItem(params.slug)

  if (!item) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Noticias', href: '/noticias' },
              { label: item.title },
            ]}
            className="mb-6 text-gray-400"
          />

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 max-w-4xl">
            {item.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(item.published_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            {item.source_url && (
              <a
                href={item.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gold hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Ver fuente original
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {item.featured_image && (
        <section className="bg-cream">
          <div className="container-custom py-8">
            <div className="relative aspect-video max-h-[400px] overflow-hidden rounded-sm">
              <Image
                src={item.featured_image}
                alt={item.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-charcoal
                prose-p:text-gray-600
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />

            {/* Back */}
            <div className="mt-12 pt-8 border-t">
              <Link
                href="/noticias"
                className="inline-flex items-center gap-2 text-gold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver a noticias
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaDark />
    </>
  )
}
