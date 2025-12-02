import { createClient } from '@supabase/supabase-js'

/**
 * Helper para crear cliente de Supabase admin de forma lazy
 * Evita errores durante el build cuando las variables de entorno no están disponibles
 */
export function getSupabaseAdmin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase configuration is missing. Please check your environment variables.')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}


