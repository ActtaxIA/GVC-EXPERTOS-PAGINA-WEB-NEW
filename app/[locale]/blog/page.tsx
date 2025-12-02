import type { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { siteConfig } from '@/config/site'
import { createClient } from '@supabase/supabase-js'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

// Revalidar cada 60 segundos (ISR)
export const revalidate = 60

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog`,
      languages: {
        'es-ES': `${siteConfig.url}/es/blog`,
        'en-US': `${siteConfig.url}/en/blog`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: `${siteConfig.url}/${locale}/blog`,
      title: t('metaTitle'),
      description: t('metaDescription'),
      siteName: siteConfig.name,
    },
  }
}

// Cliente Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function getPosts(locale: string) {
  try {
    const isSpanish = locale === 'es'
    
    const { data: posts, error } = await supabase
      .from('posts')
      .select(`
        id,
        slug,
        title,
        title_en,
        excerpt,
        excerpt_en,
        featured_image,
        reading_time,
        published_at,
        is_featured,
        category:post_categories(
          name,
          name_en,
          slug
        ),
        author:team_members(name, photo_url)
      `)
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching posts:', error)
      return []
    }

    // Mapear los campos según el idioma
    return (posts || []).map((post: any) => ({
      ...post,
      title: isSpanish ? post.title : (post.title_en || post.title),
      excerpt: isSpanish ? post.excerpt : (post.excerpt_en || post.excerpt),
      category: post.category ? {
        ...post.category,
        name: isSpanish ? post.category.name : (post.category.name_en || post.category.name)
      } : null
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

async function getCategories(locale: string) {
  try {
    const isSpanish = locale === 'es'
    
    const { data: categories, error } = await supabase
      .from('post_categories')
      .select(`
        id,
        slug,
        name,
        name_en
      `)
      .order('order')

    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }

    // Mapear los campos según el idioma
    return (categories || []).map((cat: any) => ({
      ...cat,
      name: isSpanish ? cat.name : (cat.name_en || cat.name)
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function BlogPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const posts = await getPosts(locale) as any[]
  const categories = await getCategories(locale) as any[]
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  const featuredPost = posts.find(p => p.is_featured) || posts[0]
  const regularPosts = posts.filter(p => p.id !== featuredPost?.id)

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[{ label: t('title') }]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-cream py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3">
              <LocalizedLink
                href="/blog"
                className="px-4 py-2 bg-gold text-white text-sm font-medium rounded-full"
              >
                {t('allCategories')}
              </LocalizedLink>
              {categories.map((cat: any) => (
                <LocalizedLink
                  key={cat.id}
                  href={`/blog/categoria/${cat.slug}`}
                  className="px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-full hover:bg-gold hover:text-white transition-colors"
                >
                  {cat.name}
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <section className="section-padding bg-cream">
          <div className="container-custom">
            <LocalizedLink href={`/blog/${featuredPost.slug}`} className="group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={featuredPost.featured_image || '/images/blog/default.jpg'}
                    alt={featuredPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gold text-white text-xs font-semibold rounded">
                      {t('featured')}
                    </span>
                  </div>
                </div>
                <div>
                  {featuredPost.category && (
                    <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                      {featuredPost.category?.name}
                    </span>
                  )}
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mt-2 mb-4 group-hover:text-gold transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    {featuredPost.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author?.name}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.published_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    {featuredPost.reading_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.reading_time} {t('minRead')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </LocalizedLink>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post: any) => (
                <LocalizedLink
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-cream rounded-sm overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={post.featured_image || '/images/blog/default.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      {post.category && (
                        <span className="text-gold text-xs font-semibold uppercase tracking-widest">
                          {post.category?.name}
                        </span>
                      )}
                      <h3 className="text-lg font-serif font-bold text-charcoal mt-2 mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.published_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US')}
                        </div>
                        {post.reading_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.reading_time} {t('min')}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </LocalizedLink>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('noPosts')}</p>
              <p className="text-gray-400 text-sm mt-2">{t('comeBackSoon')}</p>
            </div>
          )}
        </div>
      </section>

      <CtaDark />
    </>
  )
}

