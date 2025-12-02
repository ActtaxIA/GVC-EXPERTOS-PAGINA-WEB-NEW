import { NextRequest, NextResponse } from 'next/server'

/**
 * Webhook para disparar rebuild en AWS Amplify
 * 
 * Cuando Supabase detecta cambios en la tabla 'posts', 'news', etc.,
 * envía una petición a este endpoint que dispara un nuevo build en Amplify.
 * 
 * Uso:
 * 1. Configurar webhook en Supabase Database → Webhooks
 * 2. Apuntar a: https://tu-dominio.com/api/webhook/rebuild
 * 3. Configurar el WEBHOOK_SECRET en las variables de entorno
 */

const AMPLIFY_WEBHOOK_URL = process.env.AMPLIFY_WEBHOOK_URL
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Verificar el secret para seguridad
    const authHeader = request.headers.get('authorization')
    const providedSecret = authHeader?.replace('Bearer ', '')
    
    if (WEBHOOK_SECRET && providedSecret !== WEBHOOK_SECRET) {
      console.error('❌ [WEBHOOK] Unauthorized request')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Obtener información del cambio
    const body = await request.json().catch(() => ({}))
    console.log('📥 [WEBHOOK] Received:', JSON.stringify(body, null, 2))

    // Verificar que tenemos la URL del webhook de Amplify
    if (!AMPLIFY_WEBHOOK_URL) {
      console.error('❌ [WEBHOOK] AMPLIFY_WEBHOOK_URL not configured')
      return NextResponse.json(
        { error: 'Amplify webhook URL not configured' },
        { status: 500 }
      )
    }

    // Disparar el rebuild en Amplify
    console.log('🚀 [WEBHOOK] Triggering Amplify rebuild...')
    
    const amplifyResponse = await fetch(AMPLIFY_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trigger: 'supabase-webhook',
        table: body.table || 'unknown',
        type: body.type || 'unknown',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!amplifyResponse.ok) {
      const errorText = await amplifyResponse.text()
      console.error('❌ [WEBHOOK] Amplify error:', errorText)
      return NextResponse.json(
        { error: 'Failed to trigger Amplify rebuild', details: errorText },
        { status: 500 }
      )
    }

    console.log('✅ [WEBHOOK] Amplify rebuild triggered successfully')
    
    return NextResponse.json({
      success: true,
      message: 'Rebuild triggered',
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('❌ [WEBHOOK] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// También permitir GET para verificar que el endpoint existe
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    endpoint: 'rebuild-webhook',
    message: 'Send POST request to trigger rebuild',
  })
}

