import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Cargar variables de entorno
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function deleteAllPosts() {
  console.log('🗑️  Eliminando todos los posts...\n')
  
  // Obtener todos los posts
  const { data: posts, error: fetchError } = await supabase
    .from('posts')
    .select('id')
  
  if (fetchError) {
    console.error('❌ Error obteniendo posts:', fetchError.message)
    return
  }
  
  console.log(`📊 Total de posts encontrados: ${posts?.length || 0}`)
  
  if (!posts || posts.length === 0) {
    console.log('ℹ️  No hay posts para eliminar')
    return
  }
  
  // Eliminar todos los posts
  const { error: deleteError } = await supabase
    .from('posts')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000') // Eliminar todos
  
  if (deleteError) {
    console.error('❌ Error eliminando posts:', deleteError.message)
    return
  }
  
  console.log('✅ Todos los posts han sido eliminados correctamente')
}

deleteAllPosts().catch(console.error)

