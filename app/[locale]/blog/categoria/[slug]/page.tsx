import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
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

async function getCategory(slug: string, locale: string) {
  try {
    const isSpanish = locale === 'es'
    
    const { data: category, error } = await supabase
      .from('post_categories')
      .select(`
        id,
        slug,
        name,
        name_en,
        description,
        description_en
      `)
      .eq('slug', slug)
      .single()

    if (error || !category) return null

    // Mapear campos según idioma
    return {
      ...category,
      name: isSpanish ? category.name : (category.name_en || category.name),
      description: isSpanish ? category.description : (category.description_en || category.description)
    }
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

async function getPostsByCategory(categoryId: string, locale: string) {
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
        )
      `)
      .eq('category_id', categoryId)
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) return []

    // Mapear campos según idioma
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

async function getAllCategories(locale: string) {
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
      .order('order', { ascending: true })

    if (error) return []

    // Mapear campos según idioma
    return (categories || []).map((cat: any) => ({
      ...cat,
      name: isSpanish ? cat.name : (cat.name_en || cat.name)
    }))
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function generateMetadata({
  params: { slug, locale }
}: {
  params: { slug: string; locale: string }
}): Promise<Metadata> {
  const category = await getCategory(slug, locale) as any
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  if (!category) {
    return {
      title: 'Categoría no encontrada',
    }
  }

  return {
    title: `${category.name} - ${t('title')}`,
    description: category.description || t('subtitle'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/blog/categoria/${slug}`,
      languages: {
        'es-ES': `${siteConfig.url}/es/blog/categoria/${slug}`,
        'en-US': `${siteConfig.url}/en/blog/categoria/${slug}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      url: `${siteConfig.url}/${locale}/blog/categoria/${slug}`,
      title: `${category.name} - ${t('title')}`,
      description: category.description || t('subtitle'),
      siteName: siteConfig.name,
    },
  }
}

export default async function CategoryPage({
  params: { slug, locale }
}: {
  params: { slug: string; locale: string }
}) {
  const category = await getCategory(slug, locale) as any
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id, locale) as any[]
  const allCategories = await getAllCategories(locale) as any[]

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: t('title'), href: '/blog' },
              { label: category.name }
            ]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-300 max-w-2xl">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Categories */}
      {allCategories.length > 0 && (
        <section className="bg-cream py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3">
              <LocalizedLink
                href="/blog"
                className="px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-full hover:bg-gold hover:text-white transition-colors"
              >
                {t('allCategories')}
              </LocalizedLink>
              {allCategories.map((cat: any) => (
                <LocalizedLink
                  key={cat.id}
                  href={`/blog/categoria/${cat.slug}`}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    cat.slug === slug
                      ? 'bg-gold text-white'
                      : 'bg-white text-gray-600 hover:bg-gold hover:text-white'
                  }`}
                >
                  {cat.name}
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {posts.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-gray-600">
                  {posts.length} {posts.length === 1 ? (locale === 'es' ? 'artículo encontrado' : 'article found') : (locale === 'es' ? 'artículos encontrados' : 'articles found')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
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
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.published_at}>
                              {new Date(post.published_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                          {post.reading_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.reading_time} min</span>
                            </div>
                          )}
                        </div>
                        <h2 className="text-xl font-serif font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-gold text-sm font-medium">
                          {locale === 'es' ? 'Leer más' : 'Read more'}
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </LocalizedLink>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg mb-4">
                {locale === 'es' 
                  ? 'No hay artículos en esta categoría todavía.' 
                  : 'No articles in this category yet.'}
              </p>
              <LocalizedLink href="/blog" className="btn-secondary">
                {t('backToBlog') || (locale === 'es' ? 'Volver al blog' : 'Back to blog')}
              </LocalizedLink>
            </div>
          )}
        </div>
      </section>

      <CtaDark variant="light" />
    </>
  )
}

