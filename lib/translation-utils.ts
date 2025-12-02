/**
 * Utilidades para manejar traducciones en la aplicación
 */

import type { TranslationStatus, TranslationStatusInfo } from '@/types/database-extended'

/**
 * Obtiene el campo traducido según el idioma
 */
export function getTranslatedField<T extends Record<string, any>>(
  item: T,
  field: keyof T,
  locale: string
): string {
  const isSpanish = locale === 'es'
  
  if (isSpanish) {
    return item[field] as string
  }

  // Intentar obtener la versión en inglés
  const enField = `${String(field)}_en` as keyof T
  const translatedValue = item[enField]

  // Fallback al español si no hay traducción
  return (translatedValue || item[field]) as string
}

/**
 * Verifica el estado de traducción de un item
 */
export function getTranslationStatus(item: {
  title_en?: string | null
  excerpt_en?: string | null
  content_en?: string | null
  meta_title_en?: string | null
  meta_description_en?: string | null
}): TranslationStatusInfo {
  const hasTitle = !!(item.title_en && item.title_en.trim())
  const hasExcerpt = !!(item.excerpt_en && item.excerpt_en.trim())
  const hasContent = !!(item.content_en && item.content_en.trim())
  const hasMetadata = !!((item.meta_title_en || item.meta_description_en))

  let status: TranslationStatus = 'none'
  
  if (hasTitle && hasExcerpt && hasContent) {
    status = 'complete'
  } else if (hasTitle || hasExcerpt || hasContent) {
    status = 'partial'
  }

  return {
    hasTitle,
    hasExcerpt,
    hasContent,
    hasMetadata,
    status,
    needsTranslation: status !== 'complete',
  }
}

/**
 * Construye la consulta SQL para obtener campos traducidos
 */
export function buildTranslatedSelect(
  fields: string[],
  locale: string
): string {
  const isSpanish = locale === 'es'
  
  if (isSpanish) {
    return fields.join(', ')
  }

  return fields
    .map((field) => {
      // Si el campo puede tener traducción, usar COALESCE
      if (['title', 'excerpt', 'content', 'name', 'description', 'summary', 'challenge', 'solution', 'result', 'position', 'bio'].includes(field)) {
        return `COALESCE(${field}_en, ${field}) as ${field}`
      }
      return field
    })
    .join(', ')
}

/**
 * Prepara los datos del formulario para inserción/actualización en Supabase
 */
export function prepareTranslationData<T extends Record<string, any>>(
  data: T,
  translatedFields: string[]
): T {
  const prepared = { ...data }

  // Limpiar campos vacíos de traducción (null en lugar de '')
  translatedFields.forEach((field) => {
    const enField = `${field}_en`
    if (enField in prepared && !prepared[enField]) {
      prepared[enField] = null
    }
  })

  return prepared
}

/**
 * Badge component helper para mostrar estado de traducción
 */
export function getTranslationBadge(status: TranslationStatus): {
  label: string
  className: string
} {
  switch (status) {
    case 'complete':
      return {
        label: '✓ Traducido',
        className: 'bg-green-100 text-green-800',
      }
    case 'partial':
      return {
        label: '⚠ Parcial',
        className: 'bg-yellow-100 text-yellow-800',
      }
    case 'none':
    default:
      return {
        label: '○ Sin traducir',
        className: 'bg-gray-100 text-gray-800',
      }
  }
}

/**
 * Valida que el contenido HTML sea seguro antes de guardarlo
 */
export function sanitizeHtmlContent(html: string): string {
  // Implementación básica - en producción usar una librería como DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
}

/**
 * Cuenta palabras en un texto (útil para reading_time)
 */
export function countWords(text: string): number {
  // Eliminar HTML tags
  const plainText = text.replace(/<[^>]*>/g, '')
  // Contar palabras
  return plainText.trim().split(/\s+/).length
}

/**
 * Calcula el tiempo de lectura estimado
 */
export function calculateReadingTime(text: string): number {
  const words = countWords(text)
  const wordsPerMinute = 200
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Genera un slug desde un título
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .replace(/[^a-z0-9]+/g, '-') // Reemplazar caracteres especiales por guiones
    .replace(/^-+|-+$/g, '') // Eliminar guiones al inicio/final
}

/**
 * Trunca texto a una longitud máxima
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

