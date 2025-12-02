import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase/admin'

// GET - Listar contactos
export async function GET() {
  try {
    await requireAuth()
    const supabase = getSupabaseAdmin()

    const { data: contacts, error } = await supabase
      .from('contact_submissions')
      .select(`
        *,
        service:services(id, title)
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      success: true,
      contacts: contacts || [],
    })
  } catch (error) {
    console.error('Error en GET /api/admin/contacts:', error)
    return NextResponse.json(
      { success: false, message: 'Error al obtener contactos' },
      { status: 500 }
    )
  }
}
