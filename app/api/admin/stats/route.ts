import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  try {
    await requireAuth()
    const supabase = getSupabaseAdmin()

    // Fechas para filtros
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Total contactos
    const { count: totalContacts } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })

    // Contactos este mes
    const { count: contactsThisMonth } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfMonth.toISOString())

    // Contactos mes anterior
    const { count: contactsLastMonth } = await supabase
      .from('contact_submissions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', startOfLastMonth.toISOString())
      .lt('created_at', startOfMonth.toISOString())

    // Total posts
    const { count: totalPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })

    // Posts publicados
    const { count: publishedPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    // Total hospitales
    const { count: totalHospitals } = await supabase
      .from('hospitals')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true)

    // Ciudades con hospitales
    const { data: citiesWithHospitals } = await supabase
      .from('hospitals')
      .select('city_name')
      .eq('is_active', true)
    
    const uniqueCities = new Set(citiesWithHospitals?.map(h => h.city_name).filter(Boolean))

    // Contactos por mes (últimos 6 meses)
    const months = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const nextDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1)
      
      const { count } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', date.toISOString())
        .lt('created_at', nextDate.toISOString())

      months.push({
        month: date.toLocaleDateString('es-ES', { month: 'short' }),
        count: count || 0,
      })
    }

    // Contactos por servicio
    const { data: contactsByServiceRaw } = await supabase
      .from('contact_submissions')
      .select('service:services(title)')
    
    const serviceCount: Record<string, number> = {}
    contactsByServiceRaw?.forEach(c => {
      const name = (c.service as any)?.title || 'Sin especificar'
      serviceCount[name] = (serviceCount[name] || 0) + 1
    })
    
    const contactsByService = Object.entries(serviceCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Contactos por ciudad
    const { data: contactsByCityRaw } = await supabase
      .from('contact_submissions')
      .select('city')
    
    const cityCount: Record<string, number> = {}
    contactsByCityRaw?.forEach(c => {
      if (c.city) {
        cityCount[c.city] = (cityCount[c.city] || 0) + 1
      }
    })
    
    const contactsByCity = Object.entries(cityCount)
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return NextResponse.json({
      success: true,
      stats: {
        totalContacts: totalContacts || 0,
        contactsThisMonth: contactsThisMonth || 0,
        contactsLastMonth: contactsLastMonth || 0,
        totalPosts: totalPosts || 0,
        publishedPosts: publishedPosts || 0,
        totalHospitals: totalHospitals || 0,
        totalCities: uniqueCities.size,
        contactsByMonth: months,
        contactsByService,
        contactsByCity,
      },
    })
  } catch (error) {
    console.error('Error en /api/admin/stats:', error)
    return NextResponse.json(
      { success: false, message: 'Error obteniendo estadísticas' },
      { status: 500 }
    )
  }
}
