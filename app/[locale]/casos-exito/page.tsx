import type { Metadata } from 'next'
import { Award, Euro, Calendar, ArrowRight } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { CtaFinal } from '@/components/home'
import { createClient } from '@supabase/supabase-js'
import { LocalizedLink } from '@/components/ui/LocalizedLink'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from '@/config/site'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cases' })
  
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/casos-exito`,
      languages: {
        'es-ES': `${siteConfig.url}/es/casos-exito`,
        'en-US': `${siteConfig.url}/en/casos-exito`,
      },
    },
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

async function getCases() {
  try {
    const { data: cases } = await supabase
      .from('success_cases')
      .select(`
        *,
        service:services(title, slug)
      `)
      .eq('is_published', true)
      .order('result_amount', { ascending: false })

    return cases || []
  } catch {
    return []
  }
}

function formatAmount(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M€`
  }
  return `${(amount / 1000).toFixed(0)}K€`
}

export default async function CasosExitoPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const cases = await getCases() as any[]
  const t = await getTranslations({ locale, namespace: 'cases' })

  // Calcular estadísticas
  const totalAmount = cases.reduce((sum, c) => sum + (c.result_amount || 0), 0)
  const avgAmount = cases.length > 0 ? totalAmount / cases.length : 0

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
          <p className="text-lg text-gray-300 max-w-2xl mb-8">
            {t('subtitle')}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl">
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gold">
                {cases.length}
              </p>
              <p className="text-sm text-gray-400">{t('casesPublished')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gold">
                {formatAmount(totalAmount)}
              </p>
              <p className="text-sm text-gray-400">{t('totalRecovered')}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-serif font-bold text-gold">
                {formatAmount(avgAmount)}
              </p>
              <p className="text-sm text-gray-400">{t('averagePerCase')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          {cases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cases.map((caseItem: any) => (
                <article
                  key={caseItem.id}
                  className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    {/* Amount Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-gold" />
                        {caseItem.service && (
                          <span className="text-sm text-gray-500">
                            {caseItem.service.title}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-2xl font-serif font-bold text-gold">
                        <Euro className="w-5 h-5" />
                        {caseItem.result_amount?.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')}
                      </div>
                    </div>

                    <h2 className="text-xl font-serif font-bold text-charcoal mb-3">
                      {caseItem.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {caseItem.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {caseItem.year}
                      </div>
                      <LocalizedLink
                        href={`/casos-exito/${caseItem.slug}`}
                        className="text-gold font-medium text-sm hover:underline flex items-center gap-1"
                      >
                        {t('viewCase')}
                        <ArrowRight className="w-4 h-4" />
                      </LocalizedLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">
                {t('comingSoon')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="container-custom">
          <p className="text-sm text-gray-500 text-center max-w-3xl mx-auto">
            <strong>{t('note')}:</strong> {t('disclaimer')}
          </p>
        </div>
      </section>

      <CtaFinal />
    </>
  )
}


