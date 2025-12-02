import { MetadataRoute } from 'next'
import { siteConfig, services, cities } from '@/config/site'
import { routes, getTranslatedServiceRoute } from '@/lib/routes'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ['es', 'en'] as const
  const now = new Date()
  
  const routesList: MetadataRoute.Sitemap = []

  // Obtener posts del blog publicados
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  // Obtener noticias publicadas
  const { data: news } = await supabase
    .from('news')
    .select('slug, updated_at, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  for (const locale of locales) {
    const localeRoutes = routes[locale]
    const isSpanish = locale === 'es'

    // 1. HOME
    routesList.push({
      url: `${siteConfig.url}/${locale}${localeRoutes.home === '/' ? '' : localeRoutes.home}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    })

    // 2. PÁGINAS PRINCIPALES
    const mainPages = [
      { key: 'about' as const, priority: 0.8 },
      { key: 'team' as const, priority: 0.8 },
      { key: 'faq' as const, priority: 0.7 },
      { key: 'contact' as const, priority: 0.9 },
      { key: 'services' as const, priority: 0.9 },
      { key: 'blog' as const, priority: 0.8 },
    ]

    for (const page of mainPages) {
      routesList.push({
        url: `${siteConfig.url}/${locale}${localeRoutes[page.key]}`,
        lastModified: now,
        changeFrequency: page.key === 'blog' ? 'daily' : 'weekly',
        priority: page.priority,
      })
    }

    // 3. SERVICIOS INDIVIDUALES (6 servicios × 2 idiomas = 12 páginas)
    for (const service of services) {
      const servicePath = getTranslatedServiceRoute(service.slug, locale)
      routesList.push({
        url: `${siteConfig.url}/${locale}${servicePath}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.9,
      })
    }

    // 4. CIUDADES (105 ciudades × 2 idiomas = 210 páginas)
    for (const city of cities) {
      routesList.push({
        url: `${siteConfig.url}/${locale}/${city.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }

    // 5. PÁGINAS LEGALES
    const legalPages = [
      { key: 'notice' as const, route: localeRoutes.legal.notice },
      { key: 'privacy' as const, route: localeRoutes.legal.privacy },
      { key: 'cookies' as const, route: localeRoutes.legal.cookies },
    ]

    for (const page of legalPages) {
      routesList.push({
        url: `${siteConfig.url}/${locale}${page.route}`,
        lastModified: now,
        changeFrequency: 'yearly',
        priority: 0.3,
      })
    }

    // 6. POSTS DEL BLOG (dinámicos desde BD)
    if (posts && posts.length > 0) {
      for (const post of posts) {
        routesList.push({
          url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
          lastModified: post.updated_at ? new Date(post.updated_at) : (post.published_at ? new Date(post.published_at) : now),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      }
    }

    // 7. NOTICIAS (dinámicas desde BD)
    if (news && news.length > 0) {
      for (const item of news) {
        routesList.push({
          url: `${siteConfig.url}/${locale}/noticias/${item.slug}`,
          lastModified: item.updated_at ? new Date(item.updated_at) : (item.published_at ? new Date(item.published_at) : now),
          changeFrequency: 'weekly',
          priority: 0.6,
        })
      }
    }

    // 8. CASOS DE ÉXITO
    routesList.push({
      url: `${siteConfig.url}/${locale}/casos-exito`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return routesList
}
