import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaDark } from '@/components/home'
import { siteConfig } from '@/config/site'
import { getTranslations } from 'next-intl/server'
import { createClient } from '@supabase/supabase-js'
import { PostsGrid } from '@/components/blog/PostsGrid'

// ============================================
// PÁGINA ESTÁTICA - Se genera durante el build
// ============================================

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// Metadata
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
      canonical: `${siteConfig.url}/${locale}/publicaciones`,
    },
  }
}

// Obtener todos los posts
async function getPosts(locale: string) {
  const supabase = getSupabase()
  if (!supabase) return []
  
  console.log('📝 [BUILD] Obteniendo posts para página principal...')
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id, slug, title, title_en, excerpt, excerpt_en, featured_image,
      reading_time, published_at, is_featured,
      category:post_categories(name, name_en, slug),
      author:team_members(name, photo_url)
    `)
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  console.log(`✅ [BUILD] ${posts?.length || 0} posts encontrados`)

  const isSpanish = locale === 'es'
  return (posts || []).map((post: any) => {
    const cat = post.category as any
    return {
      id: post.id,
      slug: post.slug,
      title: isSpanish ? post.title : (post.title_en || post.title),
      excerpt: isSpanish ? post.excerpt : (post.excerpt_en || post.excerpt),
      featured_image: post.featured_image,
      reading_time: post.reading_time,
      published_at: post.published_at,
      is_featured: post.is_featured,
      author: post.author,
      category: cat ? {
        slug: cat.slug,
        name: isSpanish ? cat.name : (cat.name_en || cat.name)
      } : null
    }
  })
}

// Obtener categorías
async function getCategories(locale: string) {
  const supabase = getSupabase()
  if (!supabase) return []
  
  const { data: categories, error } = await supabase
    .from('post_categories')
    .select('id, slug, name, name_en')
    .order('order')

  if (error) return []

  const isSpanish = locale === 'es'
  return (categories || []).map((cat: any) => ({
    id: cat.id,
    slug: cat.slug,
    name: isSpanish ? cat.name : (cat.name_en || cat.name)
  }))
}

// Componente de la página
export default async function PublicacionesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const posts = await getPosts(locale)
  const categories = await getCategories(locale)
  const t = await getTranslations({ locale, namespace: 'blog' })

  // Traducciones para el componente cliente
  const translations = {
    allCategories: t('allCategories'),
    featured: t('featured'),
    minRead: t('minRead'),
    min: t('min'),
    noPosts: t('noPosts'),
    comeBackSoon: t('comeBackSoon'),
  }

  return (
    <>
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

      <PostsGrid 
        posts={posts} 
        categories={categories} 
        locale={locale}
        translations={translations}
      />

      <CtaDark variant="light" />
    </>
  )
}
