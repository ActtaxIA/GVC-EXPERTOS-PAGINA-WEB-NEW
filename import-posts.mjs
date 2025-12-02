import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import { parse } from 'csv-parse/sync'
import { config } from 'dotenv'

// Cargar variables de entorno
config({ path: '.env.local' })

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas')
  console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '✗')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Función para generar slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Función para calcular tiempo de lectura
function calculateReadingTime(text) {
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Función para generar excerpt
function generateExcerpt(text, maxLength = 200) {
  if (!text) return ''
  const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim()
  if (cleanText.length <= maxLength) return cleanText
  return cleanText.substring(0, cleanText.lastIndexOf(' ', maxLength)) + '...'
}

// Convertir Markdown básico a HTML
function convertMarkdownToHtml(markdown) {
  if (!markdown) return ''
  
  let html = markdown
  
  // Encabezados
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // Negrita
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')
  
  // Cursiva
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>')
  
  // Enlaces
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
  
  // Listas
  html = html.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
  
  // Líneas horizontales
  html = html.replace(/^---+$/gm, '<hr>')
  
  // Párrafos (líneas no vacías que no sean otros elementos HTML)
  html = html.split('\n').map(line => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('<')) return line
    return `<p>${trimmed}</p>`
  }).join('\n')
  
  // Limpiar párrafos vacíos
  html = html.replace(/<p>\s*<\/p>/g, '')
  
  return html
}

async function importPosts() {
  console.log('📚 Iniciando importación de posts desde CSV...\n')
  
  // Leer CSV
  const csvContent = fs.readFileSync('Table 1-Grid view (5).csv', 'utf-8')
  
  // Parsear CSV
  const records = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true, // Manejar BOM
  })
  
  console.log(`📄 Total de registros en CSV: ${records.length}\n`)
  
  const postsToInsert = []
  const processedSlugs = new Set()
  
  // Fechas de publicación: empezar en diciembre 2023, cada 2 semanas
  const startDate = new Date('2023-12-01T00:00:00Z')
  const twoWeeksMs = 14 * 24 * 60 * 60 * 1000
  let currentPublishedAt = startDate
  const now = new Date()
  
  for (let i = 0; i < records.length; i++) {
    const row = records[i]
    const title = row.Titulo?.trim()
    let content = row.Articulo?.trim()
    
    if (!title || !content) {
      continue
    }
    
    // Generar slug único
    let slug = generateSlug(title)
    let slugAttempt = 1
    while (processedSlugs.has(slug)) {
      slug = `${generateSlug(title)}-${slugAttempt}`
      slugAttempt++
    }
    processedSlugs.add(slug)
    
    // Convertir Markdown a HTML
    content = convertMarkdownToHtml(content)
    
    // Calcular tiempo de lectura
    const readingTime = calculateReadingTime(content)
    
    // Generar excerpt y meta description
    const excerpt = generateExcerpt(content, 200)
    const metaDescription = generateExcerpt(content, 160)
    
    // Determinar si está publicado
    const isPublished = currentPublishedAt <= now
    const publishedAt = currentPublishedAt.toISOString()
    
    postsToInsert.push({
      slug,
      title,
      excerpt,
      content,
      meta_title: title,
      meta_description: metaDescription,
      reading_time: readingTime,
      is_featured: i < 3, // Primeros 3 como destacados
      is_published: isPublished,
      published_at: publishedAt,
    })
    
    // Incrementar fecha para el siguiente post
    currentPublishedAt = new Date(currentPublishedAt.getTime() + twoWeeksMs)
  }
  
  console.log(`✅ Posts válidos procesados: ${postsToInsert.length}`)
  console.log(`📊 Publicados: ${postsToInsert.filter(p => p.is_published).length}`)
  console.log(`⏰ Programados: ${postsToInsert.filter(p => !p.is_published).length}\n`)
  
  // Mostrar ejemplos
  console.log('📝 Primeros 3 posts de ejemplo:')
  postsToInsert.slice(0, 3).forEach((post, index) => {
    console.log(`${index + 1}. "${post.title}"`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Publicado: ${post.is_published ? '✅ Sí' : '⏰ No'}`)
    console.log(`   Fecha: ${new Date(post.published_at).toLocaleDateString('es-ES')}`)
    console.log(`   Tiempo de lectura: ${post.reading_time} min\n`)
  })
  
  // Insertar en Supabase en lotes
  console.log('🚀 Iniciando inserción en Supabase...\n')
  const batchSize = 50
  let insertedCount = 0
  let errorCount = 0
  
  for (let i = 0; i < postsToInsert.length; i += batchSize) {
    const batch = postsToInsert.slice(i, i + batchSize)
    const batchNum = Math.floor(i / batchSize) + 1
    const totalBatches = Math.ceil(postsToInsert.length / batchSize)
    
    console.log(`   Insertando lote ${batchNum}/${totalBatches} (${batch.length} posts)...`)
    
    const { error } = await supabase.from('posts').insert(batch)
    
    if (error) {
      console.error(`   ❌ Error en lote ${batchNum}:`, error.message)
      errorCount += batch.length
    } else {
      console.log(`   ✅ Lote ${batchNum} insertado correctamente`)
      insertedCount += batch.length
    }
  }
  
  console.log('\n🎉 Importación completada!')
  console.log(`   ✅ Posts insertados: ${insertedCount}`)
  if (errorCount > 0) {
    console.log(`   ❌ Posts con error: ${errorCount}`)
  }
}

// Ejecutar
importPosts().catch(console.error)


