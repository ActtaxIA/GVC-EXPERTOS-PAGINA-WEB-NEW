import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { siteConfig } from '@/config/site'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@supabase/supabase-js'

// Revalidar cada 60 segundos
export const revalidate = 60

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

async function getCategory(slug: string, locale: string) {
  const supabase = getSupabase()
  if (!supabase) return null
  
  const { data, error } = await supabase
    .from('post_categories')
    .select('id, slug, name, name_en, description, description_en')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  const isSpanish = locale === 'es'
  return {
    id: data.id,
    slug: data.slug,
    name: isSpanish ? data.name : (data.name_en || data.name),
    description: isSpanish ? data.description : (data.description_en || data.description),
  }
}

async function getPostsByCategory(categoryId: string, locale: string, categorySlug: string) {
  const supabase = getSupabase()
  if (!supabase) return []
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id, slug, title, title_en, excerpt, excerpt_en, featured_image,
      reading_time, published_at,
      category:post_categories(name, name_en, slug)
    `)
    .eq('category_id', categoryId)
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) return []

  const isSpanish = locale === 'es'
  return (posts || []).map((post: any) => ({
    ...post,
    title: isSpanish ? post.title : (post.title_en || post.title),
    excerpt: isSpanish ? post.excerpt : (post.excerpt_en || post.excerpt),
    categorySlug,
  }))
}

async function getAllCategories(locale: string) {
  const supabase = getSupabase()
  if (!supabase) return []
  
  const { data, error } = await supabase
    .from('post_categories')
    .select('id, slug, name, name_en')
    .order('order')

  if (error) return []

  const isSpanish = locale === 'es'
  return (data || []).map((cat: any) => ({
    ...cat,
    name: isSpanish ? cat.name : (cat.name_en || cat.name)
  }))
}

export async function generateMetadata({
  params: { category, locale }
}: {
  params: { category: string; locale: string }
}): Promise<Metadata> {
  const categoryData = await getCategory(category, locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  if (!categoryData) return { title: 'Categoría no encontrada' }

  return {
    title: `${categoryData.name} - ${t('title')}`,
    description: categoryData.description || t('subtitle'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/publicaciones/${category}`,
    },
  }
}

export default async function CategoryPage({
  params: { category, locale }
}: {
  params: { category: string; locale: string }
}) {
  const categoryData = await getCategory(category, locale)
  const t = await getTranslations({ locale, namespace: 'blog' })
  
  if (!categoryData) notFound()

  const posts = await getPostsByCategory(categoryData.id, locale, category)
  const allCategories = await getAllCategories(locale)

  return (
    <>
      <section className="bg-charcoal pt-32 pb-16">
        <div className="container-custom">
          <Breadcrumbs
            items={[
              { label: t('title'), href: '/publicaciones' },
              { label: categoryData.name }
            ]}
            className="mb-6 text-gray-400"
          />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            {categoryData.name}
          </h1>
          {categoryData.description && (
            <p className="text-lg text-gray-300 max-w-2xl">{categoryData.description}</p>
          )}
        </div>
      </section>

      {allCategories.length > 0 && (
        <section className="bg-cream py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3">
              <LocalizedLink
                href="/publicaciones"
                className="px-4 py-2 bg-white text-gray-600 text-sm font-medium rounded-full hover:bg-gold hover:text-white transition-colors"
              >
                {t('allCategories')}
              </LocalizedLink>
              {allCategories.map((cat: any) => (
                <LocalizedLink
                  key={cat.id}
                  href={`/publicaciones/${cat.slug}`}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    cat.slug === category
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

      <section className="section-padding bg-white">
        <div className="container-custom">
          {posts.length > 0 ? (
            <>
              <p className="text-gray-600 mb-8">
                {posts.length} {posts.length === 1 
                  ? (locale === 'es' ? 'artículo' : 'article') 
                  : (locale === 'es' ? 'artículos' : 'articles')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post: any) => (
                  <LocalizedLink
                    key={post.id}
                    href={`/publicaciones/${post.categorySlug}/${post.slug}`}
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
                            {new Date(post.published_at).toLocaleDateString(
                              locale === 'es' ? 'es-ES' : 'en-US',
                              { year: 'numeric', month: 'short', day: 'numeric' }
                            )}
                          </div>
                          {post.reading_time && (
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.reading_time} min
                            </div>
                          )}
                        </div>
                        <h2 className="text-xl font-serif font-semibold text-charcoal mb-3 group-hover:text-gold transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
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
                {locale === 'es' ? 'No hay artículos en esta categoría.' : 'No articles in this category.'}
              </p>
              <LocalizedLink href="/publicaciones" className="btn-secondary">
                {locale === 'es' ? 'Volver' : 'Back'}
              </LocalizedLink>
            </div>
          )}
        </div>
      </section>

      <CtaDark variant="light" />
    </>
  )
}

