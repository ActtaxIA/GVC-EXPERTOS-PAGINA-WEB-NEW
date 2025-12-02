import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '@/lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET - Obtener noticia por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()

    const { data: newsItem, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error || !newsItem) {
      return NextResponse.json(
        { success: false, message: 'Noticia no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      news: newsItem,
    })
  } catch (error) {
    console.error('Error en GET /api/admin/news/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Error al obtener noticia' },
      { status: 500 }
    )
  }
}

// PATCH - Actualizar noticia
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()
    const body = await request.json()

    const { data: newsItem, error } = await supabase
      .from('news')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      news: newsItem,
    })
  } catch (error) {
    console.error('Error en PATCH /api/admin/news/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Error al actualizar noticia' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar noticia
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()

    const { error } = await supabase
      .from('news')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en DELETE /api/admin/news/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Error al eliminar noticia' },
      { status: 500 }
    )
  }
}
