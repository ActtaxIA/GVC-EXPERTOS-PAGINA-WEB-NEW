import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

// GET - Listar categorías
export async function GET() {
  try {
    await requireAuth()
    const supabase = getSupabaseAdmin()

    const { data: categories, error } = await supabase
      .from('post_categories')
      .select('*')
      .order('order')

    if (error) throw error

    return NextResponse.json({
      success: true,
      categories: categories || [],
    })
  } catch (error) {
    console.error('Error en GET /api/admin/categories:', error)
    return NextResponse.json(
      { success: false, message: 'Error al obtener categorías' },
      { status: 500 }
    )
  }
}

// POST - Crear categoría
export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const supabase = getSupabaseAdmin()
    const body = await request.json()

    const { data: category, error } = await supabase
      .from('post_categories')
      .insert({
        name: body.name,
        slug: body.slug,
        description: body.description || null,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      category,
    })
  } catch (error) {
    console.error('Error en POST /api/admin/categories:', error)
    return NextResponse.json(
      { success: false, message: 'Error al crear categoría' },
      { status: 500 }
    )
  }
}
