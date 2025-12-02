/**
 * Script para importar posts del CSV a Supabase
 * Distribuye las publicaciones desde diciembre 2023 hasta el futuro
 * Una publicación cada 2 semanas
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'
import * as csv from 'csv-parse/sync'

// Configuración de Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Variables de entorno de Supabase no configuradas')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Función para generar slug desde el título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
    .trim()
    .replace(/\s+/g, '-') // Espacios a guiones
    .replace(/-+/g, '-') // Múltiples guiones a uno
    .substring(0, 180) // Limitar longitud
}

// Función para generar excerpt desde el contenido
function generateExcerpt(content: string, maxLength: number = 200): string {
  if (!content) return ''
  
  // Eliminar encabezados markdown
  let text = content.replace(/^#+\s+/gm, '')
  
  // Eliminar líneas con solo guiones
  text = text.replace(/^---+$/gm, '')
  
  // Eliminar múltiples saltos de línea
  text = text.replace(/\n{3,}/g, '\n\n')
  
  // Tomar el primer párrafo significativo
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 50)
  const firstParagraph = paragraphs[0] || text
  
  if (firstParagraph.length <= maxLength) {
    return firstParagraph.trim()
  }
  
  return firstParagraph.substring(0, maxLength).trim() + '...'
}

// Función para calcular tiempo de lectura
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.trim().split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

// Función para generar meta description
function generateMetaDescription(content: string, title: string): string {
  const excerpt = generateExcerpt(content, 160)
  if (excerpt) return excerpt
  return `${title} - Artículo sobre negligencias médicas y derechos del paciente.`
}

// Función para convertir contenido markdown a HTML básico
function convertMarkdownToHTML(markdown: string): string {
  if (!markdown) return ''
  
  let html = markdown
  
  // Encabezados
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // Negrita
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  
  // Cursiva
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Listas desordenadas
  html = html.replace(/^\* (.*$)/gim, '<li>$1</li>')
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
  
  // Listas numeradas
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
  
  // Envolver listas en ul o ol
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  
  // Líneas horizontales
  html = html.replace(/^---+$/gm, '<hr>')
  
  // Párrafos (líneas con contenido)
  const lines = html.split('\n')
  const processedLines = lines.map(line => {
    line = line.trim()
    if (line && !line.startsWith('<') && !line.endsWith('>')) {
      return `<p>${line}</p>`
    }
    return line
  })
  
  html = processedLines.join('\n')
  
  // Limpiar múltiples saltos de línea
  html = html.replace(/\n{3,}/g, '\n\n')
  
  return html
}

async function importPosts() {
  console.log('📚 Iniciando importación de posts desde CSV...\n')
  
  // Leer CSV (está en el directorio padre)
  const csvPath = path.join(process.cwd(), '..', 'Table 1-Grid view (5).csv')
  let fileContent = fs.readFileSync(csvPath, 'utf-8')
  
  // Eliminar BOM si existe
  if (fileContent.charCodeAt(0) === 0xFEFF) {
    fileContent = fileContent.slice(1)
  }
  
  // También eliminar BOM en UTF-8
  fileContent = fileContent.replace(/^\uFEFF/, '')
  
  const records = csv.parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    relax_column_count: true,
  })
  
  console.log(`📄 Total de registros en CSV: ${records.length}`)
  
  // Debug: mostrar las primeras 2 líneas
  if (records.length > 0) {
    console.log('\n🔍 Primeras 2 líneas para debug:')
    records.slice(0, 2).forEach((record: any, index: number) => {
      console.log(`\n${index + 1}. Titulo: "${record.Titulo}"`)
      console.log(`   Texto: ${record.Texto ? record.Texto.substring(0, 50) + '...' : 'vacío'}`)
    })
    console.log()
  }
  
  // Filtrar registros válidos (que tengan título y contenido)
  const validRecords = records.filter((record: any) => {
    const hasTitle = record.Titulo && record.Titulo.trim().length > 0
    const hasContent = record.Texto && record.Texto.trim().length > 10
    return hasTitle && hasContent
  })
  
  console.log(`✅ Registros válidos: ${validRecords.length}\n`)
  
  if (validRecords.length === 0) {
    console.log('⚠️  No hay registros válidos para importar')
    return
  }
  
  // Calcular fechas de publicación
  const startDate = new Date('2023-12-01T10:00:00Z') // Diciembre 2023
  const today = new Date()
  const twoWeeksMs = 14 * 24 * 60 * 60 * 1000 // 2 semanas en milisegundos
  
  const postsToInsert = validRecords.map((record: any, index: number) => {
    const publishDate = new Date(startDate.getTime() + (index * twoWeeksMs))
    const isPublished = publishDate <= today
    
    const title = record.Titulo.trim()
    const slug = generateSlug(title)
    const content = record.Texto.trim()
    const contentHTML = convertMarkdownToHTML(content)
    const excerpt = generateExcerpt(content, 200)
    const metaDescription = generateMetaDescription(content, title)
    const readingTime = calculateReadingTime(content)
    
    return {
      slug,
      title,
      meta_title: title.substring(0, 200), // Limitar a 200 caracteres
      meta_description: metaDescription.substring(0, 500), // Limitar a 500 caracteres
      excerpt,
      content: contentHTML,
      featured_image: null,
      category_id: null, // Se puede asignar después
      author_id: null, // Se puede asignar después
      tags: [],
      reading_time: readingTime,
      is_featured: index < 3, // Los primeros 3 son destacados
      is_published: isPublished,
      published_at: isPublished ? publishDate.toISOString() : publishDate.toISOString(),
      created_at: publishDate.toISOString(),
      updated_at: publishDate.toISOString(),
    }
  })
  
  // Estadísticas
  const publishedCount = postsToInsert.filter(p => p.is_published).length
  const scheduledCount = postsToInsert.length - publishedCount
  const lastPublishedDate = postsToInsert[publishedCount - 1]?.published_at
  const nextScheduledDate = postsToInsert[publishedCount]?.published_at
  
  console.log('📊 Estadísticas:')
  console.log(`   - Total de posts: ${postsToInsert.length}`)
  console.log(`   - Publicados (hasta hoy): ${publishedCount}`)
  console.log(`   - Programados (futuro): ${scheduledCount}`)
  console.log(`   - Última fecha publicada: ${lastPublishedDate ? new Date(lastPublishedDate).toLocaleDateString('es-ES') : 'N/A'}`)
  console.log(`   - Próxima fecha programada: ${nextScheduledDate ? new Date(nextScheduledDate).toLocaleDateString('es-ES') : 'N/A'}`)
  console.log()
  
  // Confirmar antes de insertar
  console.log('⚠️  ATENCIÓN: Esta operación insertará posts en la base de datos.')
  console.log('   Si quieres continuar, descomenta la línea de inserción en el código.\n')
  
  // DESCOMENTA LA SIGUIENTE SECCIÓN PARA HACER LA INSERCIÓN REAL
  /*
  console.log('💾 Insertando posts en Supabase...\n')
  
  let successCount = 0
  let errorCount = 0
  const errors: any[] = []
  
  // Insertar en lotes de 50
  const batchSize = 50
  for (let i = 0; i < postsToInsert.length; i += batchSize) {
    const batch = postsToInsert.slice(i, i + batchSize)
    
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert(batch)
      
      if (error) {
        console.error(`❌ Error en lote ${Math.floor(i / batchSize) + 1}:`, error)
        errorCount += batch.length
        errors.push({ batch: Math.floor(i / batchSize) + 1, error })
      } else {
        successCount += batch.length
        console.log(`✅ Lote ${Math.floor(i / batchSize) + 1} insertado (${batch.length} posts)`)
      }
    } catch (err) {
      console.error(`❌ Excepción en lote ${Math.floor(i / batchSize) + 1}:`, err)
      errorCount += batch.length
      errors.push({ batch: Math.floor(i / batchSize) + 1, error: err })
    }
  }
  
  console.log('\n📊 Resultado de la importación:')
  console.log(`   ✅ Exitosos: ${successCount}`)
  console.log(`   ❌ Errores: ${errorCount}`)
  
  if (errors.length > 0) {
    console.log('\n⚠️  Detalles de errores:')
    errors.forEach(err => {
      console.log(`   - Lote ${err.batch}:`, err.error)
    })
  }
  */
  
  // Mostrar primeros 5 posts como ejemplo
  console.log('📝 Ejemplo de los primeros 5 posts:\n')
  postsToInsert.slice(0, 5).forEach((post, index) => {
    console.log(`${index + 1}. "${post.title}"`)
    console.log(`   Slug: ${post.slug}`)
    console.log(`   Publicado: ${post.is_published ? '✅ Sí' : '⏰ Programado'}`)
    console.log(`   Fecha: ${new Date(post.published_at).toLocaleDateString('es-ES')}`)
    console.log(`   Tiempo de lectura: ${post.reading_time} min`)
    console.log(`   Excerpt: ${post.excerpt.substring(0, 80)}...`)
    console.log()
  })
  
  console.log('✨ Script completado.')
  console.log('💡 Para ejecutar la importación real, descomenta la sección de inserción en el código.')
}

// Ejecutar
importPosts()
  .then(() => {
    console.log('\n✅ Proceso finalizado')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Error fatal:', error)
    process.exit(1)
  })

