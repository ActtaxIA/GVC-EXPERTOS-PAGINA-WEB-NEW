import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft, Linkedin, Twitter, Facebook } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { JsonLdArticle, JsonLdBreadcrumbs } from '@/components/seo/JsonLd'
import { siteConfig } from '@/config/site'
import { createClient } from '@supabase/supabase-js'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { getTranslations } from 'next-intl/server'

// Revalidar cada 60 segundos (ISR)
export const revalidate = 60

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function getPost(slug: string, locale: string) {
  try {
    const isSpanish = locale === 'es'
    
    const { data: post, error } = await supabase
      .from('posts')
      .select(`
        *,
        category:post_categories(
          name,
          name_en,
          slug
        ),
        author:team_members(name, photo_url, position, bio)
      `)
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (error || !post) return null

    const postAny = post as any
    
    // Usar versión en inglés si existe y el locale es 'en'
    if (!isSpanish) {
      postAny.title = postAny.title_en || postAny.title
      postAny.excerpt = postAny.excerpt_en || postAny.excerpt
      postAny.content = postAny.content_en || postAny.content
      postAny.meta_title = postAny.meta_title_en || postAny.meta_title
      postAny.meta_description = postAny.meta_description_en || postAny.meta_description
    }
    
    // Mapear nombre de categoría según idioma
    if (postAny.category) {
      postAny.category.name = isSpanish 
        ? postAny.category.name 
        : (postAny.category.name_en || postAny.category.name)
    }

    return postAny
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getRelatedPosts(categoryId: string, currentId: string, locale: string) {
  try {
    const isSpanish = locale === 'es'
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        slug,
        title,
        title_en,
        featured_image
      `)
      .eq('category_id', categoryId)
      .eq('is_published', true)
      .neq('id', currentId)
      .limit(3)

    if (error) return []

    // Mapear título según idioma
    return (posts || []).map((post: any) => ({
      ...post,
      title: isSpanish ? post.title : (post.title_en || post.title)
    }))
  } catch {
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug, params.locale) as any
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })

  if (!post) {
    return { title: t('metaTitle') }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/${params.locale}/blog/${post.slug}`,
      languages: {
        'es-ES': `${siteConfig.url}/es/blog/${post.slug}`,
        'en-US': `${siteConfig.url}/en/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: params.locale === 'es' ? 'es_ES' : 'en_US',
      url: `${siteConfig.url}/${params.locale}/blog/${post.slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.featured_image ? [{ url: post.featured_image, width: 1200, height: 630 }] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; locale: string }
}) {
  const post = await getPost(params.slug, params.locale) as any
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })

  if (!post) {
    notFound()
  }

  const relatedPosts = post.category?.id 
    ? await getRelatedPosts(post.category.id, post.id, params.locale) 
    : []

  const shareUrl = `${siteConfig.url}/${params.locale}/blog/${post.slug}`

  return (
    <>
      <JsonLdArticle
        title={post.title}
        description={post.excerpt}
        image={post.featured_image}
        url={shareUrl}
        datePublished={post.published_at}
        dateModified={post.updated_at}
        author={post.author?.name || siteConfig.name}
      />
      <JsonLdBreadcrumbs
        items={[
          { name: params.locale === 'es' ? 'Inicio' : 'Home', url: `${siteConfig.url}/${params.locale}` },
          { name: 'Blog', url: `${siteConfig.url}/${params.locale}/blog` },
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
              {post.category.name}
            </span>
          )}

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.photo_url && (
                  <Image
                    src={post.author.photo_url}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.published_at).toLocaleDateString(params.locale === 'es' ? 'es-ES' : 'en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </div>
            {post.reading_time && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.reading_time} {t('minRead')}
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
                  {t('shareArticle')}
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
                <LocalizedLink
                  href="/blog"
                  className="inline-flex items-center gap-2 text-gold hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('backToBlog')}
                </LocalizedLink>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author Card */}
              {post.author && (
                <div className="bg-white p-6 rounded-sm shadow-sm">
                  <h3 className="font-serif font-semibold text-charcoal mb-4">
                    {t('aboutAuthor')}
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    {post.author.photo_url && (
                      <Image
                        src={post.author.photo_url}
                        alt={post.author.name}
                        width={64}
                        height={64}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-charcoal">
                        {post.author.name}
                      </p>
                      {post.author.position && (
                        <p className="text-sm text-gray-500">
                          {post.author.position}
                        </p>
                      )}
                    </div>
                  </div>
                  {post.author.bio && (
                    <p className="text-sm text-gray-600 line-clamp-4">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="bg-charcoal p-6 rounded-sm text-center">
                <h3 className="font-serif font-semibold text-white mb-3">
                  {t('needHelp')}
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  {t('needHelpText')}
                </p>
                <LocalizedLink href="/contacto" className="btn-primary w-full">
                  {t('contact')}
                </LocalizedLink>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white p-6 rounded-sm shadow-sm">
                  <h3 className="font-serif font-semibold text-charcoal mb-4">
                    {t('relatedPosts')}
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relPost: any) => (
                      <LocalizedLink
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
                      </LocalizedLink>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CtaDark variant="light" />
    </>
  )
}

