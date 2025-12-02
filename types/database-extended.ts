// Tipos extendidos para las columnas de traducción añadidas en la migración 005

export interface PostTranslation {
  title_en: string | null
  excerpt_en: string | null
  content_en: string | null
  meta_title_en: string | null
  meta_description_en: string | null
  needs_translation: boolean
}

export interface NewsTranslation {
  title_en: string | null
  excerpt_en: string | null
  content_en: string | null
  meta_title_en: string | null
  meta_description_en: string | null
  needs_translation: boolean
}

export interface SuccessCaseTranslation {
  title_en: string | null
  summary_en: string | null
  challenge_en: string | null
  solution_en: string | null
  result_en: string | null
  meta_title_en: string | null
  meta_description_en: string | null
  needs_translation: boolean
}

export interface TeamMemberTranslation {
  position_en: string | null
  bio_en: string | null
}

export interface PostCategoryTranslation {
  name_en: string | null
  description_en: string | null
}

export interface HospitalTranslation {
  name_en: string | null
  description_en: string | null
}

// Tipos completos con traducciones
export interface PostWithTranslation extends PostTranslation {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string | null
  reading_time: number | null
  published_at: string
  is_published: boolean
  is_featured: boolean
  category_id: string
  author_id: string
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface NewsWithTranslation extends NewsTranslation {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string | null
  source_url: string | null
  source_name: string | null
  published_at: string
  is_published: boolean
  is_featured: boolean
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface SuccessCaseWithTranslation extends SuccessCaseTranslation {
  id: string
  slug: string
  title: string
  summary: string
  challenge: string
  solution: string
  result: string
  amount_recovered: number | null
  date_resolved: string | null
  featured_image: string | null
  is_published: boolean
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export interface TeamMemberWithTranslation extends TeamMemberTranslation {
  id: string
  name: string
  position: string
  bio: string | null
  photo_url: string | null
  email: string | null
  phone: string | null
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Helper types para formularios de admin
export interface PostFormData {
  title: string
  title_en?: string
  excerpt: string
  excerpt_en?: string
  content: string
  content_en?: string
  slug: string
  featured_image?: string
  reading_time?: number
  category_id: string
  author_id: string
  meta_title?: string
  meta_title_en?: string
  meta_description?: string
  meta_description_en?: string
  is_published: boolean
  is_featured: boolean
}

export interface NewsFormData {
  title: string
  title_en?: string
  excerpt: string
  excerpt_en?: string
  content: string
  content_en?: string
  slug: string
  featured_image?: string
  source_url?: string
  source_name?: string
  meta_title?: string
  meta_title_en?: string
  meta_description?: string
  meta_description_en?: string
  is_published: boolean
  is_featured: boolean
}

// Translation status types
export type TranslationStatus = 'none' | 'partial' | 'complete'

export interface TranslationStatusInfo {
  hasTitle: boolean
  hasExcerpt: boolean
  hasContent: boolean
  hasMetadata: boolean
  status: TranslationStatus
  needsTranslation: boolean
}

// Helper function types
export type GetTranslatedField<T> = (
  item: T,
  field: keyof T,
  locale: string
) => string

export type TranslateContent = (
  content: string,
  from: 'es' | 'en',
  to: 'es' | 'en',
  contentType: 'title' | 'excerpt' | 'content' | 'meta_description'
) => Promise<string>

