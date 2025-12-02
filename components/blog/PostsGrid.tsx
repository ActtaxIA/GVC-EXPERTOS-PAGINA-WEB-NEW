'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, Clock, User } from 'lucide-react'
import { LocalizedLink } from '@/components/ui/LocalizedLink'

// Función para limpiar HTML del excerpt
function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, '') // Eliminar todas las etiquetas HTML
    .replace(/&nbsp;/g, ' ') // Reemplazar &nbsp; por espacio
    .replace(/&amp;/g, '&')  // Reemplazar &amp; por &
    .replace(/&lt;/g, '<')   // Reemplazar &lt; por <
    .replace(/&gt;/g, '>')   // Reemplazar &gt; por >
    .replace(/&quot;/g, '"') // Reemplazar &quot; por "
    .replace(/&#39;/g, "'")  // Reemplazar &#39; por '
    .trim()
}

interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  featured_image: string | null
  reading_time: number | null
  published_at: string
  is_featured: boolean
  author: { name: string; photo_url: string | null } | null
  category: { slug: string; name: string } | null
}

interface Category {
  id: string
  slug: string
  name: string
}

interface PostsGridProps {
  posts: Post[]
  categories: Category[]
  locale: string
  translations: {
    allCategories: string
    featured: string
    minRead: string
    min: string
    noPosts: string
    comeBackSoon: string
  }
}

export function PostsGrid({ posts, categories, locale, translations }: PostsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Filtrar posts por categoría
  const filteredPosts = activeCategory
    ? posts.filter(post => post.category?.slug === activeCategory)
    : posts

  const featuredPost = filteredPosts.find(p => p.is_featured) || filteredPosts[0]
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id)

  return (
    <>
      {/* Filtros de categoría */}
      {categories.length > 0 && (
        <section className="bg-cream py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  activeCategory === null
                    ? 'bg-gold text-white'
                    : 'bg-white text-gray-600 hover:bg-gold hover:text-white'
                }`}
              >
                {translations.allCategories}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === cat.slug
                      ? 'bg-gold text-white'
                      : 'bg-white text-gray-600 hover:bg-gold hover:text-white'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Post destacado */}
      {featuredPost && (
        <section className="section-padding bg-cream">
          <div className="container-custom">
            <LocalizedLink 
              href={`/publicaciones/${featuredPost.slug}`} 
              className="group"
            >
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
                      {translations.featured}
                    </span>
                  </div>
                </div>
                <div>
                  {featuredPost.category && (
                    <span className="text-gold text-sm font-semibold uppercase tracking-widest">
                      {featuredPost.category.name}
                    </span>
                  )}
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mt-2 mb-4 group-hover:text-gold transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {stripHtml(featuredPost.excerpt)}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    {featuredPost.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {featuredPost.author.name}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.published_at).toLocaleDateString(
                        locale === 'es' ? 'es-ES' : 'en-US',
                        { day: 'numeric', month: 'long', year: 'numeric' }
                      )}
                    </div>
                    {featuredPost.reading_time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.reading_time} {translations.minRead}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </LocalizedLink>
          </div>
        </section>
      )}

      {/* Grid de posts */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <LocalizedLink
                  key={post.id}
                  href={`/publicaciones/${post.slug}`}
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
                          {post.category.name}
                        </span>
                      )}
                      <h3 className="text-lg font-serif font-bold text-charcoal mt-2 mb-3 group-hover:text-gold transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {stripHtml(post.excerpt)}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.published_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US')}
                        </div>
                        {post.reading_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.reading_time} {translations.min}
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
              <p className="text-gray-500">{translations.noPosts}</p>
              <p className="text-gray-400 text-sm mt-2">{translations.comeBackSoon}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

