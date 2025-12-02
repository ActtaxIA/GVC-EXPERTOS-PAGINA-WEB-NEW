-- =====================================================
-- Script 004 CORREGIDO - Noticias y Casos de Éxito
-- =====================================================

-- =============================================
-- MEJORAS: Añadir columnas faltantes a news
-- =============================================
ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

ALTER TABLE public.news 
ADD COLUMN IF NOT EXISTS source_name VARCHAR(255);

-- Crear índice solo si no existe
CREATE INDEX IF NOT EXISTS idx_news_featured ON public.news(is_featured) WHERE is_featured = true;

-- =============================================
-- TABLA: success_cases (Casos de éxito)
-- =============================================
-- La tabla ya existe del script 001, solo añadimos columnas nuevas si no existen
ALTER TABLE public.success_cases
ADD COLUMN IF NOT EXISTS duration_months INTEGER;

ALTER TABLE public.success_cases
ADD COLUMN IF NOT EXISTS client_initials VARCHAR(10);

ALTER TABLE public.success_cases
ADD COLUMN IF NOT EXISTS client_age INTEGER;

ALTER TABLE public.success_cases
ADD COLUMN IF NOT EXISTS client_province VARCHAR(100);

ALTER TABLE public.success_cases
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;

-- Índices adicionales
CREATE INDEX IF NOT EXISTS idx_cases_amount ON public.success_cases(result_amount DESC);
CREATE INDEX IF NOT EXISTS idx_cases_featured ON public.success_cases(is_featured) WHERE is_featured = true;

-- =============================================
-- MEJORAS: Añadir campo city a contact_submissions
-- =============================================
-- Ya debería existir, pero por si acaso
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS city VARCHAR(100);

-- =============================================
-- DATOS SEED: Ejemplo de noticia
-- =============================================
INSERT INTO public.news (slug, title, excerpt, content, is_published, is_featured, published_at, source_name) VALUES
(
  'sentencia-negligencia-medica-tribunal-supremo-2024',
  'El Tribunal Supremo fija nuevos criterios para indemnizaciones por negligencia médica',
  'La reciente sentencia establece importantes precedentes para la cuantificación de daños en casos de mala praxis sanitaria.',
  '<h2>Nueva doctrina del Tribunal Supremo</h2>
<p>El Tribunal Supremo ha dictado una importante sentencia que modifica los criterios de valoración del daño en casos de negligencia médica.</p>
<p>Esta resolución tendrá un impacto significativo en futuros casos, estableciendo parámetros más claros para la determinación de indemnizaciones.</p>
<h3>Puntos clave de la sentencia</h3>
<ul>
<li>Reconocimiento expreso del daño moral</li>
<li>Nuevos baremos para secuelas permanentes</li>
<li>Criterios de pérdida de oportunidad</li>
</ul>
<p>Los abogados especializados en negligencias médicas consideran esta sentencia como un avance importante en la protección de los derechos de los pacientes.</p>',
  true,
  true,
  NOW(),
  'Tribunal Supremo'
) ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DATOS SEED: Ejemplo de caso de éxito
-- =============================================
INSERT INTO public.success_cases (
  slug, title, excerpt, content, result_amount, year, 
  client_initials, client_age, client_province, is_published, is_featured,
  service_id
) 
SELECT
  'indemnizacion-error-diagnostico-cancer',
  'Indemnización de 450.000€ por retraso en diagnóstico de cáncer',
  'Conseguimos una indemnización histórica para un paciente cuyo diagnóstico de cáncer se retrasó 18 meses debido a errores médicos.',
  '<h2>El caso</h2>
<p>Nuestro cliente, un hombre de 52 años, acudió en múltiples ocasiones a su médico de cabecera con síntomas que sugerían una patología grave. A pesar de las señales de alarma, no se realizaron las pruebas diagnósticas apropiadas.</p>
<h3>El problema</h3>
<p>El retraso de 18 meses en el diagnóstico permitió que el cáncer avanzara significativamente, requiriendo tratamientos más agresivos y reduciendo las probabilidades de supervivencia.</p>
<h3>Nuestra intervención</h3>
<p>Tras estudiar exhaustivamente el caso y contar con informes periciales de oncólogos de prestigio, presentamos una reclamación que demostró claramente la negligencia médica.</p>
<h3>El resultado</h3>
<p>Tras la negociación, conseguimos una indemnización de 450.000€ que incluye compensación por daño moral, gastos médicos futuros y pérdida de calidad de vida.</p>',
  450000,
  2024,
  'J.M.',
  52,
  'Madrid',
  true,
  true,
  (SELECT id FROM public.services WHERE slug = 'error-diagnostico' LIMIT 1)
WHERE NOT EXISTS (
  SELECT 1 FROM public.success_cases WHERE slug = 'indemnizacion-error-diagnostico-cancer'
);

-- =====================================================
-- ✅ SCRIPT 004 COMPLETADO
-- =====================================================
-- Las tablas ya existían del script 001
-- Solo añadimos las columnas faltantes y datos de ejemplo

