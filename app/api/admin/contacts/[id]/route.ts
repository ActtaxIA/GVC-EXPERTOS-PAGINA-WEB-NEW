import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { requireAuth } from '@/lib/auth'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// PATCH - Actualizar contacto
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()
    const body = await request.json()

    const { data: contact, error } = await supabase
      .from('contact_submissions')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      contact,
    })
  } catch (error) {
    console.error('Error en PATCH /api/admin/contacts/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Error al actualizar contacto' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar contacto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await requireAuth()

    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error en DELETE /api/admin/contacts/[id]:', error)
    return NextResponse.json(
      { success: false, message: 'Error al eliminar contacto' },
      { status: 500 }
    )
  }
}
