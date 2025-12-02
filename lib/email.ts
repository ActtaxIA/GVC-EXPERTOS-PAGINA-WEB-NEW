import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailOptions {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailOptions) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'GVC Expertos <noreply@gvcexpertos.es>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      reply_to: replyTo,
    })

    if (error) {
      console.error('Error enviando email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error en sendEmail:', error)
    return { success: false, error }
  }
}

// Templates de email

export function getContactNotificationTemplate({
  name,
  email,
  phone,
  service,
  message,
}: {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
        <h1 style="color: #b8860b; margin: 0; font-size: 24px;">GVC Expertos</h1>
      </div>
      
      <div style="padding: 30px 20px; background-color: #f5f5f5;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Nueva solicitud de contacto</h2>
        
        <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${phone ? `<p><strong>Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
          ${service ? `<p><strong>Servicio:</strong> ${service}</p>` : ''}
        </div>
        
        <div style="background-color: white; padding: 20px; border-radius: 5px;">
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      </div>
      
      <div style="padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>Este email fue enviado automáticamente desde el formulario de contacto de gvcexpertos.es</p>
      </div>
    </body>
    </html>
  `
}

export function getContactConfirmationTemplate({ name }: { name: string }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
        <h1 style="color: #b8860b; margin: 0; font-size: 24px;">GVC Expertos</h1>
      </div>
      
      <div style="padding: 30px 20px;">
        <h2 style="color: #1a1a1a; margin-top: 0;">Hemos recibido tu consulta</h2>
        
        <p>Estimado/a ${name},</p>
        
        <p>Gracias por contactar con GVC Expertos. Hemos recibido tu consulta y un abogado especializado se pondrá en contacto contigo en las próximas 24 horas.</p>
        
        <p>Si tu caso es urgente, puedes llamarnos directamente al:</p>
        
        <p style="text-align: center; font-size: 24px; color: #b8860b; font-weight: bold;">
          <a href="tel:+34900123456" style="color: #b8860b; text-decoration: none;">900 123 456</a>
        </p>
        
        <p>Atentamente,<br>El equipo de GVC Expertos</p>
      </div>
      
      <div style="padding: 20px; background-color: #f5f5f5; text-align: center; color: #666; font-size: 12px;">
        <p>GVC Expertos - Abogados Especialistas en Negligencias Médicas</p>
        <p>Calle Gran Vía, 28, 28013 Madrid</p>
      </div>
    </body>
    </html>
  `
}
