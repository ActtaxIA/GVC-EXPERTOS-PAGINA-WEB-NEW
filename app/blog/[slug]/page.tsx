import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft, Linkedin, Twitter, Facebook } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { JsonLdArticle, JsonLdBreadcrumbs } from '@/components/seo/JsonLd'
import { siteConfig } from '@/config/site'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function getPost(slug: string) {
  try {
    const { data: post } = await supabase
      .from('posts')
      .select(`
        *,
        category:post_categories(name, slug),
        author:team_members(name, photo_url, position, bio)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    return post
  } catch {
    return null
  }
}

async function getRelatedPosts(categoryId: string, currentId: string) {
  try {
    const { data: posts } = await supabase
      .from('posts')
      .select('id, slug, title, featured_image')
      .eq('category_id', categoryId)
      .eq('is_published', true)
      .neq('id', currentId)
      .limit(3)

    return posts || []
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug)

  if (!post) {
    return { title: 'Artículo no encontrado' }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.published_at,
      authors: (post.author as any)?.name ? [(post.author as any).name] : undefined,
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = (post.category as any)?.id 
    ? await getRelatedPosts((post.category as any).id, post.id) 
    : []

  const shareUrl = `${siteConfig.url}/blog/${post.slug}`

  return (
    <>
      <JsonLdArticle
        title={post.title}
        description={post.excerpt}
        image={post.featured_image}
        datePublished={post.published_at}
        dateModified={post.updated_at}
        author={post.author?.name || 'GVC Expertos'}
      />
      <JsonLdBreadcrumbs
        items={[
          { name: 'Inicio', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog` },
          { name: post.title, url: shareUrl },
        ]}
      />

      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
            className="mb-6 text-gray-400"
          />

          {post.category && (
            <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm font-semibold rounded mb-4">
              {(post.category as any).name}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            {post.author && (
              <div className="flex items-center gap-2">
                {(post.author as any).photo_url && (
                  <Image
                    src={(post.author as any).photo_url}
                    alt={(post.author as any).name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span>{(post.author as any).name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.published_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            {post.reading_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.reading_time} min de lectura
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="bg-cream">
          <div className="container-custom py-8">
            <div className="relative aspect-video max-h-[500px] overflow-hidden rounded-sm">
              <Image
                src={post.featured_image}
                alt={post.title}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:font-serif prose-headings:text-charcoal
                  prose-p:text-gray-600
                  prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-charcoal
                  prose-ul:text-gray-600 prose-ol:text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="mt-12 pt-8 border-t">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Compartir artículo
                </p>
                <div className="flex gap-3">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#0077B5] text-white rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Compartir en LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1DA1F2] text-white rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Compartir en Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity"
                    aria-label="Compartir en Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Back to blog */}
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-gold hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author Card */}
              {post.author && (
                <div className="bg-white p-6 rounded-sm shadow-sm">
                  <h3 className="font-serif font-semibold text-charcoal mb-4">
                    Sobre el autor
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    {(post.author as any).photo_url && (
                      <Image
                        src={(post.author as any).photo_url}
                        alt={(post.author as any).name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-charcoal">
                        {(post.author as any).name}
                      </p>
                      {(post.author as any).position && (
                        <p className="text-sm text-gray-500">
                          {(post.author as any).position}
                        </p>
                      )}
                    </div>
                  </div>
                  {(post.author as any).bio && (
                    <p className="text-sm text-gray-600 line-clamp-4">
                      {(post.author as any).bio}
                    </p>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="bg-charcoal p-6 rounded-sm text-center">
                <h3 className="font-serif font-semibold text-white mb-3">
                  ¿Necesitas ayuda?
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Consulta gratuita con nuestros abogados especializados.
                </p>
                <Link href="/contacto" className="btn-primary w-full">
                  Contactar
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white p-6 rounded-sm shadow-sm">
                  <h3 className="font-serif font-semibold text-charcoal mb-4">
                    Artículos relacionados
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relPost: any) => (
                      <Link
                        key={relPost.id}
                        href={`/blog/${relPost.slug}`}
                        className="flex gap-3 group"
                      >
                        {relPost.featured_image && (
                          <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded">
                            <Image
                              src={relPost.featured_image}
                              alt={relPost.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-sm text-gray-700 group-hover:text-gold transition-colors line-clamp-2">
                          {relPost.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CtaDark />
    </>
  )
}
