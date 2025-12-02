import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

/**
 * Helper para crear cliente de Supabase admin de forma lazy
 * Evita errores durante el build cuando las variables de entorno no están disponibles
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Log para debugging en producción
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ SUPABASE CONFIG ERROR:', {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      nodeEnv: process.env.NODE_ENV,
    })
    throw new Error(`Supabase configuration is missing. URL: ${!!supabaseUrl}, Key: ${!!supabaseServiceKey}`)
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
