import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { 
  searchHospitalsByText, 
  searchHospitalsNearby,
  getPlaceDetails,
  getCityCoordinates,
  isPublicHospital 
} from '@/lib/google-places'

// GET - Listar hospitales guardados o buscar en Google Places
export async function GET(request: NextRequest) {
  try {
    await requireAuth()
    const supabase = getSupabaseAdmin()

    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const citySlug = searchParams.get('city') // Slug completo: abogados-negligencias-medicas-madrid
    const cityId = searchParams.get('cityId')

    // Buscar en Google Places
    if (action === 'search' && citySlug) {
      // Extraer nombre de ciudad del slug
      const cityKey = citySlug.replace('abogados-negligencias-medicas-', '')
      const coords = getCityCoordinates(citySlug)
      
      let results
      if (coords) {
        // Buscar por coordenadas (más preciso)
        results = await searchHospitalsNearby(coords.lat, coords.lng, 25000)
      } else {
        // Buscar por texto - convertir slug a nombre legible
        const cityName = cityKey
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        results = await searchHospitalsByText(cityName)
      }

      if (results.status !== 'OK' && results.status !== 'ZERO_RESULTS') {
        return NextResponse.json(
          { success: false, message: `Error de Google Places: ${results.status}` },
          { status: 400 }
        )
      }

      // Mapear resultados
      const hospitals = (results.results || []).map(place => ({
        google_place_id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        rating: place.rating || null,
        total_ratings: place.user_ratings_total || 0,
        types: place.types || [],
        is_public: isPublicHospital(place.name),
      }))

      return NextResponse.json({
        success: true,
        hospitals,
        total: hospitals.length,
      })
    }

    // Listar hospitales guardados
    let query = supabase
      .from('hospitals')
      .select('*')
      .order('name')

    if (cityId) {
      query = query.eq('city_id', cityId)
    }

    const { data: hospitals, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      hospitals: hospitals || [],
    })
  } catch (error) {
    console.error('Error en GET /api/admin/hospitals:', error)
    return NextResponse.json(
      { success: false, message: 'Error al obtener hospitales' },
      { status: 500 }
    )
  }
}

// POST - Guardar hospital de Google Places
export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const supabase = getSupabaseAdmin()

    const body = await request.json()
    const { google_place_id, city_id, city_name } = body

    if (!google_place_id) {
      return NextResponse.json(
        { success: false, message: 'place_id requerido' },
        { status: 400 }
      )
    }

    // Verificar si ya existe
    const { data: existing } = await supabase
      .from('hospitals')
      .select('id')
      .eq('google_place_id', google_place_id)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Este hospital ya está guardado' },
        { status: 400 }
      )
    }

    // Obtener detalles completos de Google Places
    const details = await getPlaceDetails(google_place_id)

    if (details.status !== 'OK') {
      return NextResponse.json(
        { success: false, message: `Error obteniendo detalles: ${details.status}` },
        { status: 400 }
      )
    }

    const place = details.result

    // Guardar en la base de datos
    const { data: hospital, error } = await supabase
      .from('hospitals')
      .insert({
        google_place_id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        city_id: city_id || null,
        city_name: city_name || null,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        phone: place.formatted_phone_number || null,
        website: place.website || null,
        rating: place.rating || null,
        total_ratings: place.user_ratings_total || 0,
        types: place.types || [],
        opening_hours: place.opening_hours?.weekday_text || null,
        photo_reference: place.photos?.[0]?.photo_reference || null,
        is_public: isPublicHospital(place.name),
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      hospital,
    })
  } catch (error) {
    console.error('Error en POST /api/admin/hospitals:', error)
    return NextResponse.json(
      { success: false, message: 'Error al guardar hospital' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar hospital
export async function DELETE(request: NextRequest) {
  try {
    await requireAuth()
    const supabase = getSupabaseAdmin()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID requerido' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('hospitals')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en DELETE /api/admin/hospitals:', error)
    return NextResponse.json(
      { success: false, message: 'Error al eliminar hospital' },
      { status: 500 }
    )
  }
}
