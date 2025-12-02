-- =============================================
-- MIGRATION 005: Añadir columnas de traducción
-- =============================================
-- Este script añade columnas para soportar contenido bilingüe (ES/EN)
-- en las tablas de contenido dinámico: posts, news, y casos de éxito

-- =============================================
-- POSTS (Blog) - Añadir columnas en inglés
-- =============================================

ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS meta_title_en TEXT,
ADD COLUMN IF NOT EXISTS meta_description_en TEXT;

COMMENT ON COLUMN posts.title_en IS 'Título del post en inglés';
COMMENT ON COLUMN posts.excerpt_en IS 'Extracto del post en inglés';
COMMENT ON COLUMN posts.content_en IS 'Contenido completo del post en inglés (HTML)';
COMMENT ON COLUMN posts.meta_title_en IS 'Meta título SEO en inglés';
COMMENT ON COLUMN posts.meta_description_en IS 'Meta descripción SEO en inglés';

-- =============================================
-- POST_CATEGORIES - Añadir columnas en inglés
-- =============================================

ALTER TABLE post_categories 
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

COMMENT ON COLUMN post_categories.name_en IS 'Nombre de la categoría en inglés';
COMMENT ON COLUMN post_categories.description_en IS 'Descripción de la categoría en inglés';

-- =============================================
-- NEWS (Noticias) - Añadir columnas en inglés
-- =============================================

ALTER TABLE news 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS excerpt_en TEXT,
ADD COLUMN IF NOT EXISTS content_en TEXT,
ADD COLUMN IF NOT EXISTS meta_title_en TEXT,
ADD COLUMN IF NOT EXISTS meta_description_en TEXT;

COMMENT ON COLUMN news.title_en IS 'Título de la noticia en inglés';
COMMENT ON COLUMN news.excerpt_en IS 'Extracto de la noticia en inglés';
COMMENT ON COLUMN news.content_en IS 'Contenido completo de la noticia en inglés (HTML)';
COMMENT ON COLUMN news.meta_title_en IS 'Meta título SEO en inglés';
COMMENT ON COLUMN news.meta_description_en IS 'Meta descripción SEO en inglés';

-- =============================================
-- SUCCESS_CASES (Casos de Éxito) - Añadir columnas en inglés
-- =============================================

ALTER TABLE success_cases 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS summary_en TEXT,
ADD COLUMN IF NOT EXISTS challenge_en TEXT,
ADD COLUMN IF NOT EXISTS solution_en TEXT,
ADD COLUMN IF NOT EXISTS result_en TEXT,
ADD COLUMN IF NOT EXISTS meta_title_en TEXT,
ADD COLUMN IF NOT EXISTS meta_description_en TEXT;

COMMENT ON COLUMN success_cases.title_en IS 'Título del caso de éxito en inglés';
COMMENT ON COLUMN success_cases.summary_en IS 'Resumen del caso en inglés';
COMMENT ON COLUMN success_cases.challenge_en IS 'Descripción del desafío en inglés';
COMMENT ON COLUMN success_cases.solution_en IS 'Descripción de la solución en inglés';
COMMENT ON COLUMN success_cases.result_en IS 'Descripción del resultado en inglés';
COMMENT ON COLUMN success_cases.meta_title_en IS 'Meta título SEO en inglés';
COMMENT ON COLUMN success_cases.meta_description_en IS 'Meta descripción SEO en inglés';

-- =============================================
-- TEAM_MEMBERS (Equipo) - Añadir columnas en inglés
-- =============================================

ALTER TABLE team_members 
ADD COLUMN IF NOT EXISTS position_en TEXT,
ADD COLUMN IF NOT EXISTS bio_en TEXT;

COMMENT ON COLUMN team_members.position_en IS 'Posición/cargo del miembro en inglés';
COMMENT ON COLUMN team_members.bio_en IS 'Biografía del miembro en inglés';

-- =============================================
-- HOSPITALS - Añadir columnas en inglés (opcional)
-- =============================================

ALTER TABLE hospitals 
ADD COLUMN IF NOT EXISTS name_en TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT;

COMMENT ON COLUMN hospitals.name_en IS 'Nombre del hospital en inglés (si difiere)';
COMMENT ON COLUMN hospitals.description_en IS 'Descripción del hospital en inglés';

-- =============================================
-- FUNCTION: Helper para verificar si existe traducción
-- =============================================

CREATE OR REPLACE FUNCTION has_translation(
  text_es TEXT,
  text_en TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  RETURN text_en IS NOT NULL AND text_en != '';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

COMMENT ON FUNCTION has_translation IS 'Función helper para verificar si existe traducción en inglés';

-- =============================================
-- VIEW: Posts con información de traducción
-- =============================================

CREATE OR REPLACE VIEW posts_with_translation_status AS
SELECT 
  id,
  slug,
  title,
  title_en,
  excerpt,
  excerpt_en,
  is_published,
  has_translation(title, title_en) as has_english_translation,
  CASE 
    WHEN title_en IS NOT NULL AND excerpt_en IS NOT NULL AND content_en IS NOT NULL 
    THEN 'complete'
    WHEN title_en IS NOT NULL OR excerpt_en IS NOT NULL OR content_en IS NOT NULL 
    THEN 'partial'
    ELSE 'none'
  END as translation_status,
  created_at,
  updated_at
FROM posts
ORDER BY created_at DESC;

COMMENT ON VIEW posts_with_translation_status IS 'Vista de posts con estado de traducción';

-- =============================================
-- VIEW: Noticias con información de traducción
-- =============================================

CREATE OR REPLACE VIEW news_with_translation_status AS
SELECT 
  id,
  slug,
  title,
  title_en,
  excerpt,
  excerpt_en,
  is_published,
  has_translation(title, title_en) as has_english_translation,
  CASE 
    WHEN title_en IS NOT NULL AND excerpt_en IS NOT NULL AND content_en IS NOT NULL 
    THEN 'complete'
    WHEN title_en IS NOT NULL OR excerpt_en IS NOT NULL OR content_en IS NOT NULL 
    THEN 'partial'
    ELSE 'none'
  END as translation_status,
  published_at,
  created_at
FROM news
WHERE is_published = true
ORDER BY published_at DESC;

COMMENT ON VIEW news_with_translation_status IS 'Vista de noticias con estado de traducción';

-- =============================================
-- ÍNDICES para mejorar performance en consultas bilingües
-- =============================================

-- Índices para búsqueda de posts en inglés
CREATE INDEX IF NOT EXISTS idx_posts_title_en ON posts USING gin(to_tsvector('english', COALESCE(title_en, '')));
CREATE INDEX IF NOT EXISTS idx_posts_content_en ON posts USING gin(to_tsvector('english', COALESCE(content_en, '')));

-- Índices para búsqueda de noticias en inglés
CREATE INDEX IF NOT EXISTS idx_news_title_en ON news USING gin(to_tsvector('english', COALESCE(title_en, '')));
CREATE INDEX IF NOT EXISTS idx_news_content_en ON news USING gin(to_tsvector('english', COALESCE(content_en, '')));

-- Índices para verificar existencia de traducción
CREATE INDEX IF NOT EXISTS idx_posts_has_translation ON posts ((title_en IS NOT NULL));
CREATE INDEX IF NOT EXISTS idx_news_has_translation ON news ((title_en IS NOT NULL));

-- =============================================
-- FUNCTION: Marcar contenido para traducción
-- =============================================

CREATE OR REPLACE FUNCTION mark_for_translation(
  table_name TEXT,
  record_id UUID
) RETURNS VOID AS $$
BEGIN
  EXECUTE format('UPDATE %I SET needs_translation = true WHERE id = $1', table_name)
  USING record_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION mark_for_translation IS 'Marca un registro para que sea traducido';

-- =============================================
-- TRIGGER: Auto-marcar para traducción cuando se crea contenido nuevo
-- =============================================

-- Añadir columna needs_translation a las tablas
ALTER TABLE posts ADD COLUMN IF NOT EXISTS needs_translation BOOLEAN DEFAULT false;
ALTER TABLE news ADD COLUMN IF NOT EXISTS needs_translation BOOLEAN DEFAULT false;
ALTER TABLE success_cases ADD COLUMN IF NOT EXISTS needs_translation BOOLEAN DEFAULT false;

-- Trigger para posts
CREATE OR REPLACE FUNCTION auto_mark_post_for_translation()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND (
    OLD.title != NEW.title OR 
    OLD.content != NEW.content OR 
    OLD.excerpt != NEW.excerpt
  ))) AND NEW.is_published = true THEN
    NEW.needs_translation = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_mark_post_for_translation ON posts;
CREATE TRIGGER trigger_mark_post_for_translation
  BEFORE INSERT OR UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION auto_mark_post_for_translation();

-- Trigger para news
CREATE OR REPLACE FUNCTION auto_mark_news_for_translation()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND (
    OLD.title != NEW.title OR 
    OLD.content != NEW.content OR 
    OLD.excerpt != NEW.excerpt
  ))) AND NEW.is_published = true THEN
    NEW.needs_translation = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_mark_news_for_translation ON news;
CREATE TRIGGER trigger_mark_news_for_translation
  BEFORE INSERT OR UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION auto_mark_news_for_translation();

-- =============================================
-- DATOS DE EJEMPLO (Opcional - descomentar si quieres testear)
-- =============================================

/*
-- Ejemplo de actualización con traducción en un post
UPDATE posts 
SET 
  title_en = 'Understanding Medical Negligence: Your Rights as a Patient',
  excerpt_en = 'Learn about your rights as a patient and how to recognize medical negligence.',
  content_en = '<h2>What is Medical Negligence?</h2><p>Medical negligence occurs when...</p>',
  meta_title_en = 'Medical Negligence Guide | Your Patient Rights',
  meta_description_en = 'Complete guide to understanding medical negligence and your rights as a patient in Spain.',
  needs_translation = false
WHERE slug = 'negligencias-medicas-guia-completa'
LIMIT 1;
*/

-- =============================================
-- GRANTS (Permisos)
-- =============================================

-- Asegurar que los roles apropiados tienen acceso
GRANT SELECT ON posts_with_translation_status TO anon, authenticated;
GRANT SELECT ON news_with_translation_status TO anon, authenticated;

-- =============================================
-- RESUMEN
-- =============================================

DO $$ 
BEGIN
  RAISE NOTICE '✅ Migration 005 completada exitosamente';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Columnas añadidas:';
  RAISE NOTICE '  - posts: title_en, excerpt_en, content_en, meta_title_en, meta_description_en, needs_translation';
  RAISE NOTICE '  - news: title_en, excerpt_en, content_en, meta_title_en, meta_description_en, needs_translation';
  RAISE NOTICE '  - success_cases: title_en, summary_en, challenge_en, solution_en, result_en, meta_title_en, meta_description_en, needs_translation';
  RAISE NOTICE '  - team_members: position_en, bio_en';
  RAISE NOTICE '  - post_categories: name_en, description_en';
  RAISE NOTICE '  - hospitals: name_en, description_en';
  RAISE NOTICE '';
  RAISE NOTICE '📊 Vistas creadas:';
  RAISE NOTICE '  - posts_with_translation_status';
  RAISE NOTICE '  - news_with_translation_status';
  RAISE NOTICE '';
  RAISE NOTICE '🔧 Funciones creadas:';
  RAISE NOTICE '  - has_translation()';
  RAISE NOTICE '  - mark_for_translation()';
  RAISE NOTICE '  - auto_mark_post_for_translation()';
  RAISE NOTICE '  - auto_mark_news_for_translation()';
  RAISE NOTICE '';
  RAISE NOTICE '🎯 Próximos pasos:';
  RAISE NOTICE '  1. Ejecutar esta migración en Supabase';
  RAISE NOTICE '  2. Implementar UI de traducción en el panel admin';
  RAISE NOTICE '  3. Integrar OpenAI API para traducciones automáticas';
  RAISE NOTICE '  4. Migrar páginas de blog/noticias a [locale]';
END $$;



