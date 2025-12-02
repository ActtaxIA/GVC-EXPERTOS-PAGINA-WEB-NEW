/**
 * Script para crear un usuario administrador
 * 
 * Uso:
 *   npx ts-node scripts/create-admin.ts
 * 
 * O desde la consola de Node:
 *   node -e "require('./scripts/create-admin.js')"
 * 
 * Variables de entorno necesarias:
 *   - NEXT_PUBLIC_SUPABASE_URL
 *   - SUPABASE_SERVICE_ROLE_KEY
 *   - ADMIN_EMAIL (opcional, por defecto: admin@gvcexpertos.es)
 *   - ADMIN_PASSWORD (opcional, por defecto genera una aleatoria)
 */

import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// Cargar variables de entorno si no están
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Faltan variables de entorno SUPABASE')
  console.log('   Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@gvcexpertos.es'
  const password = process.env.ADMIN_PASSWORD || generateRandomPassword()
  const name = 'Administrador'

  console.log('\n🔧 Creando usuario administrador...\n')

  try {
    // Verificar si ya existe
    const { data: existing } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      console.log(`⚠️  El usuario ${email} ya existe`)
      
      // Actualizar contraseña si se proporciona
      if (process.env.ADMIN_PASSWORD) {
        const passwordHash = await bcrypt.hash(password, 12)
        await supabase
          .from('admin_users')
          .update({ password_hash: passwordHash })
          .eq('id', existing.id)
        
        console.log('✅ Contraseña actualizada')
      }
      return
    }

    // Hashear contraseña
    const passwordHash = await bcrypt.hash(password, 12)

    // Crear usuario
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        name,
        role: 'admin',
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    console.log('✅ Usuario creado correctamente!\n')
    console.log('📧 Email:', email)
    console.log('🔑 Contraseña:', password)
    console.log('\n⚠️  IMPORTANTE: Guarda esta contraseña en un lugar seguro!')
    console.log('   Puedes cambiarla desde el panel de admin o actualizando ADMIN_PASSWORD\n')

  } catch (error) {
    console.error('❌ Error creando usuario:', error)
    process.exit(1)
  }
}

function generateRandomPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%'
  let password = ''
  for (let i = 0; i < 16; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

createAdmin()
