#!/usr/bin/env node

/**
 * Script para verificar todas las conexiones de APIs en el proyecto
 * Uso: node scripts/check-api-connections.js
 */

const { createClient } = require('@supabase/supabase-js')

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
}

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`)
}

function logSection(title) {
  console.log('\n' + '='.repeat(60))
  log(title, colors.bright + colors.blue)
  console.log('='.repeat(60))
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green)
}

function logError(message) {
  log(`❌ ${message}`, colors.red)
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow)
}

async function checkEnvironmentVariables() {
  logSection('1. VERIFICACIÓN DE VARIABLES DE ENTORNO')

  const requiredVars = [
    { name: 'NEXT_PUBLIC_SUPABASE_URL', description: 'URL de Supabase' },
    { name: 'SUPABASE_SERVICE_ROLE_KEY', description: 'Service Role Key de Supabase' },
  ]

  const optionalVars = [
    { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', description: 'Anon Key de Supabase' },
    { name: 'OPENAI_API_KEY', description: 'API Key de OpenAI' },
  ]

  let allPresent = true

  // Variables requeridas
  log('\nVariables REQUERIDAS:', colors.bright)
  for (const varInfo of requiredVars) {
    const value = process.env[varInfo.name]
    if (value) {
      logSuccess(`${varInfo.name}: ${varInfo.description}`)
      log(`   Valor: ${value.substring(0, 30)}...`, colors.reset)
    } else {
      logError(`${varInfo.name}: ${varInfo.description} - FALTA`)
      allPresent = false
    }
  }

  // Variables opcionales
  log('\nVariables OPCIONALES:', colors.bright)
  for (const varInfo of optionalVars) {
    const value = process.env[varInfo.name]
    if (value) {
      logSuccess(`${varInfo.name}: ${varInfo.description}`)
    } else {
      logWarning(`${varInfo.name}: ${varInfo.description} - NO CONFIGURADA`)
    }
  }

  return allPresent
}

async function checkSupabaseConnection() {
  logSection('2. VERIFICACIÓN DE CONEXIÓN A SUPABASE')

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    logError('No se pueden verificar las credenciales de Supabase (faltan variables)')
    return false
  }

  try {
    log('\nConectando a Supabase...', colors.yellow)
    const supabase = createClient(url, key)

    // Test 1: Verificar posts
    log('\n📝 Verificando tabla "posts"...', colors.bright)
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, title, slug, is_published')
      .limit(5)

    if (postsError) {
      logError(`Error al consultar posts: ${postsError.message}`)
      return false
    }

    logSuccess(`Tabla "posts" accesible: ${posts?.length || 0} artículos encontrados`)
    if (posts && posts.length > 0) {
      posts.forEach((post, i) => {
        log(`   ${i + 1}. ${post.title} (${post.slug}) - Publicado: ${post.is_published}`)
      })
    }

    // Test 2: Verificar categorías
    log('\n📁 Verificando tabla "post_categories"...', colors.bright)
    const { data: categories, error: catError } = await supabase
      .from('post_categories')
      .select('id, name, slug')
      .limit(10)

    if (catError) {
      logError(`Error al consultar categorías: ${catError.message}`)
      return false
    }

    logSuccess(`Tabla "post_categories" accesible: ${categories?.length || 0} categorías encontradas`)
    if (categories && categories.length > 0) {
      categories.forEach((cat, i) => {
        log(`   ${i + 1}. ${cat.name} (${cat.slug})`)
      })
    }

    // Test 3: Verificar team members
    log('\n👥 Verificando tabla "team_members"...', colors.bright)
    const { data: team, error: teamError } = await supabase
      .from('team_members')
      .select('id, name, position')
      .limit(5)

    if (teamError) {
      logError(`Error al consultar team_members: ${teamError.message}`)
    } else {
      logSuccess(`Tabla "team_members" accesible: ${team?.length || 0} miembros encontrados`)
    }

    // Test 4: Verificar servicios
    log('\n🏥 Verificando tabla "services"...', colors.bright)
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('id, title_es, slug')
      .limit(5)

    if (servicesError) {
      logError(`Error al consultar services: ${servicesError.message}`)
    } else {
      logSuccess(`Tabla "services" accesible: ${services?.length || 0} servicios encontrados`)
    }

    return true
  } catch (error) {
    logError(`Error de conexión: ${error.message}`)
    return false
  }
}

async function checkOpenAIConnection() {
  logSection('3. VERIFICACIÓN DE OPENAI API')

  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    logWarning('OPENAI_API_KEY no configurada - Traducción automática no disponible')
    return true // No es crítico
  }

  try {
    log('\nVerificando API Key de OpenAI...', colors.yellow)
    
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    })

    if (response.ok) {
      logSuccess('Conexión a OpenAI API exitosa')
      return true
    } else {
      logError(`Error en OpenAI API: ${response.status} ${response.statusText}`)
      return false
    }
  } catch (error) {
    logError(`Error al conectar con OpenAI: ${error.message}`)
    return false
  }
}

async function generateReport(results) {
  logSection('RESUMEN DE VERIFICACIÓN')

  const totalChecks = Object.keys(results).length
  const successChecks = Object.values(results).filter(Boolean).length

  console.log('\nResultados:')
  log(`Total de verificaciones: ${totalChecks}`, colors.bright)
  log(`Exitosas: ${successChecks}`, colors.green)
  log(`Fallidas: ${totalChecks - successChecks}`, colors.red)

  console.log('\nDetalle:')
  for (const [check, success] of Object.entries(results)) {
    if (success) {
      logSuccess(check)
    } else {
      logError(check)
    }
  }

  console.log('\n' + '='.repeat(60))
  
  if (successChecks === totalChecks) {
    log('\n🎉 TODAS LAS CONEXIONES FUNCIONAN CORRECTAMENTE', colors.green + colors.bright)
  } else if (successChecks > 0) {
    log('\n⚠️  ALGUNAS CONEXIONES TIENEN PROBLEMAS', colors.yellow + colors.bright)
  } else {
    log('\n🚨 ERROR CRÍTICO: NINGUNA CONEXIÓN FUNCIONA', colors.red + colors.bright)
  }
  
  console.log('='.repeat(60) + '\n')

  // Código de salida
  process.exit(successChecks === totalChecks ? 0 : 1)
}

async function main() {
  log('\n🔍 VERIFICADOR DE CONEXIONES DE API - GVCEXPERTOS', colors.bright + colors.blue)
  log(`Fecha: ${new Date().toLocaleString('es-ES')}`, colors.reset)

  const results = {}

  // 1. Variables de entorno
  results['Variables de Entorno'] = await checkEnvironmentVariables()

  // 2. Supabase
  results['Conexión a Supabase'] = await checkSupabaseConnection()

  // 3. OpenAI
  results['Conexión a OpenAI'] = await checkOpenAIConnection()

  // Generar reporte
  await generateReport(results)
}

// Ejecutar
main().catch((error) => {
  logError(`Error fatal: ${error.message}`)
  console.error(error)
  process.exit(1)})

