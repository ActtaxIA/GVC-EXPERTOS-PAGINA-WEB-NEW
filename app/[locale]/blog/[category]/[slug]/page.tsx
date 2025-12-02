import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft, Linkedin, Twitter, Facebook } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { siteConfig } from '@/config/site'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@supabase/supabase-js'

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic'

// Cliente Supabase
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!url || !key) {
    console.error('❌ Supabase env vars missing:', { url: !!url, key: !!key })
    return null
  }
  
  return createClient(url, key)
}

async function getPost(slug: string, categorySlug: string, locale: string) {
  const supabase = getSupabase()
  if (!supabase) return null
  
  const { data: post, error } = await supabase
    .from('posts')
    .select(`
      *,
      category:post_categories(id, name, name_en, slug),
      author:team_members(name, photo_url, position, bio)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !post) return null

  // Verificar que la categoría coincide
  if (!post.category || post.category.slug !== categorySlug) {
    return null
  }

  const isSpanish = locale === 'es'
  
  // Mapear campos según idioma
  return {
    ...post,
    title: isSpanish ? post.title : (post.title_en || post.title),
    excerpt: isSpanish ? post.excerpt : (post.excerpt_en || post.excerpt),
    content: isSpanish ? post.content : (post.content_en || post.content),
    meta_title: isSpanish ? post.meta_title : (post.meta_title_en || post.meta_title),
    meta_description: isSpanish ? post.meta_description : (post.meta_description_en || post.meta_description),
    category: {
      ...post.category,
      name: isSpanish ? post.category.name : (post.category.name_en || post.category.name)
    }
  }
}

async function getRelatedPosts(categoryId: string, currentId: string, locale: string, categorySlug: string) {
  const supabase = getSupabase()
  if (!supabase) return []
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, slug, title, title_en, featured_image')
    .eq('category_id', categoryId)
    .eq('is_published', true)
    .neq('id', currentId)
    .limit(3)

  if (error) return []

  const isSpanish = locale === 'es'
  return (posts || []).map((post: any) => ({
    ...post,
    title: isSpanish ? post.title : (post.title_en || post.title),
    categorySlug
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; category: string; locale: string }
}): Promise<Metadata> {
  const post = await getPost(params.slug, params.category, params.locale)
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })

  if (!post) {
    return { title: t('metaTitle') }
  }

  const articleUrl = `${siteConfig.url}/${params.locale}/blog/${params.category}/${post.slug}`

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      locale: params.locale === 'es' ? 'es_ES' : 'en_US',
      url: articleUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at,
      images: post.featured_image ? [{ url: post.featured_image }] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string; category: string; locale: string }
}) {
  const post = await getPost(params.slug, params.category, params.locale)
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })

  if (!post) {
    notFound()
  }

  const relatedPosts = post.category?.id 
    ? await getRelatedPosts(post.category.id, post.id, params.locale, params.category) 
    : []

  const shareUrl = `${siteConfig.url}/${params.locale}/blog/${params.category}/${post.slug}`

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.category?.name || params.category, href: `/blog/${params.category}` },
              { label: post.title },
            ]}
            className="mb-6 text-gray-400"
          />

          {post.category && (
            <LocalizedLink 
              href={`/blog/${params.category}`}
              className="inline-block px-3 py-1 bg-gold/20 text-gold text-sm font-semibold rounded mb-4 hover:bg-gold/30 transition-colors"
            >
              {post.category.name}
            </LocalizedLink>
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
              {new Date(post.published_at).toLocaleDateString(
                params.locale === 'es' ? 'es-ES' : 'en-US',
                { day: 'numeric', month: 'long', year: 'numeric' }
              )}
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
                className="blog-content"
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
                    className="p-3 bg-[#0077B5] text-white rounded-full hover:opacity-90"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1DA1F2] text-white rounded-full hover:opacity-90"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#1877F2] text-white rounded-full hover:opacity-90"
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
                      <p className="font-semibold text-charcoal">{post.author.name}</p>
                      {post.author.position && (
                        <p className="text-sm text-gray-500">{post.author.position}</p>
                      )}
                    </div>
                  </div>
                  {post.author.bio && (
                    <p className="text-sm text-gray-600 line-clamp-4">{post.author.bio}</p>
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
                        href={`/blog/${relPost.categorySlug}/${relPost.slug}`}
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
