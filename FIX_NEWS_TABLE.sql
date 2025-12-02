-- =====================================================
-- FIX: Agregar columna is_featured a la tabla news
-- =====================================================

-- Agregar la columna que falta
ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Agregar columnas adicionales que también pueden ser útiles
ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS source_name VARCHAR(255);

-- Crear el índice que faltaba
CREATE INDEX IF NOT EXISTS idx_news_featured ON public.news(is_featured) WHERE is_featured = true;

-- =====================================================
-- LISTO: Ahora puedes ejecutar el script 004
-- =====================================================

