import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '@/lib/auth'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const newsSchema = z.object({
  title: z.string().min(1, 'Título requerido'),
  slug: z.string().min(1, 'Slug requerido'),
  excerpt: z.string().optional(),
  content: z.string().min(1, 'Contenido requerido'),
  featured_image: z.string().optional(),
  source_url: z.string().optional(),
  source_name: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  is_published: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  published_at: z.string().optional().nullable(),
})

// GET - Listar noticias
export async function GET() {
  try {
    await requireAuth()

    const { data: news, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      success: true,
      news: news || [],
    })
  } catch (error) {
    console.error('Error en GET /api/admin/news:', error)
    return NextResponse.json(
      { success: false, message: 'Error al obtener noticias' },
      { status: 500 }
    )
  }
}

// POST - Crear noticia
export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()

    const validatedData = newsSchema.parse(body)

    // Verificar slug único
    const { data: existing } = await supabase
      .from('news')
      .select('id')
      .eq('slug', validatedData.slug)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Ya existe una noticia con ese slug' },
        { status: 400 }
      )
    }

    const { data: newsItem, error } = await supabase
      .from('news')
      .insert(validatedData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      news: newsItem,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Error en POST /api/admin/news:', error)
    return NextResponse.json(
      { success: false, message: 'Error al crear noticia' },
      { status: 500 }
    )
  }
}
