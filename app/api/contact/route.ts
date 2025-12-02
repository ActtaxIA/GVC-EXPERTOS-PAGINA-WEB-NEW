import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseAdmin } from '@/lib/supabase/admin'
import { 
  sendEmail, 
  getContactNotificationTemplate, 
  getContactConfirmationTemplate 
} from '@/lib/email'

const contactSchema = z.object({
  name: z.string().min(2, 'Nombre demasiado corto'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Mensaje demasiado corto'),
  privacy: z.boolean().refine((val) => val === true, 'Debes aceptar la política de privacidad'),
  source_url: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // Buscar service_id si se proporcionó nombre de servicio
    let serviceId = null
    let serviceName = validatedData.service
    if (validatedData.service) {
      const { data: service } = await supabase
        .from('services')
        .select('id, title')
        .eq('slug', validatedData.service)
        .single()
      
      if (service) {
        serviceId = service.id
        serviceName = service.title
      }
    }

    // Guardar en Supabase
    const { data: contact, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        service_id: serviceId,
        message: validatedData.message,
        source_url: validatedData.source_url || null,
        utm_source: validatedData.utm_source || null,
        utm_medium: validatedData.utm_medium || null,
        utm_campaign: validatedData.utm_campaign || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error guardando contacto:', error)
      throw error
    }

    // Enviar email de notificación al equipo
    const notificationEmail = process.env.EMAIL_TO || 'info@gvcexpertos.es'
    await sendEmail({
      to: notificationEmail,
      subject: `Nueva consulta de ${validatedData.name}`,
      html: getContactNotificationTemplate({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        service: serviceName,
        message: validatedData.message,
      }),
      replyTo: validatedData.email,
    })

    // Enviar email de confirmación al usuario
    await sendEmail({
      to: validatedData.email,
      subject: 'Hemos recibido tu consulta - GVC Expertos',
      html: getContactConfirmationTemplate({
        name: validatedData.name,
      }),
    })

    return NextResponse.json({
      success: true,
      message: 'Mensaje enviado correctamente',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      )
    }

    console.error('Error en /api/contact:', error)
    return NextResponse.json(
      { success: false, message: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}
