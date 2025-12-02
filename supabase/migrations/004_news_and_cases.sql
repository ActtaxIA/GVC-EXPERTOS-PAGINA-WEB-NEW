-- Migración 004: Noticias, Casos de Éxito y mejoras
-- GVC Expertos - Abogados Negligencias Médicas

-- =============================================
-- TABLA: news (Noticias)
-- =============================================
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  source_url TEXT,
  source_name VARCHAR(255),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Estado
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_news_featured ON news(is_featured) WHERE is_featured = true;

-- Trigger para updated_at
CREATE TRIGGER update_news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News public read" ON news
  FOR SELECT
  USING (is_published = true);

-- =============================================
-- TABLA: success_cases (Casos de éxito)
-- =============================================
CREATE TABLE IF NOT EXISTS success_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  
  -- Datos del caso
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  result_amount DECIMAL(12,2), -- Indemnización conseguida
  year INTEGER, -- Año del caso
  duration_months INTEGER, -- Duración del proceso
  
  -- Cliente (anonimizado)
  client_initials VARCHAR(10),
  client_age INTEGER,
  client_province VARCHAR(100),
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Estado
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_cases_slug ON success_cases(slug);
CREATE INDEX IF NOT EXISTS idx_cases_published ON success_cases(is_published);
CREATE INDEX IF NOT EXISTS idx_cases_service ON success_cases(service_id);
CREATE INDEX IF NOT EXISTS idx_cases_amount ON success_cases(result_amount DESC);

-- Trigger para updated_at
CREATE TRIGGER update_success_cases_updated_at
  BEFORE UPDATE ON success_cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE success_cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cases public read" ON success_cases
  FOR SELECT
  USING (is_published = true);

-- =============================================
-- MEJORAS: Añadir campo city a contact_submissions
-- =============================================
ALTER TABLE contact_submissions 
ADD COLUMN IF NOT EXISTS city VARCHAR(100);

-- =============================================
-- STORAGE: Buckets para imágenes
-- =============================================
-- Nota: Ejecutar en Supabase Dashboard > Storage
-- 1. Crear bucket "images" con acceso público
-- 2. Crear carpetas: blog, news, cases, team, general

-- =============================================
-- DATOS SEED: Categorías de noticias (opcional)
-- =============================================
-- Las noticias no tienen categorías separadas, 
-- pero podemos añadir tags en el futuro

-- =============================================
-- DATOS SEED: Ejemplo de noticia
-- =============================================
INSERT INTO news (slug, title, excerpt, content, is_published, published_at) VALUES
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
  NOW()
) ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DATOS SEED: Ejemplo de caso de éxito
-- =============================================
INSERT INTO success_cases (
  slug, title, excerpt, content, result_amount, year, 
  client_initials, client_age, client_province, is_published
) VALUES
(
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
  true
) ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- ACTUALIZAR SITEMAP
-- =============================================
-- Recuerda actualizar app/sitemap.ts para incluir:
-- - /noticias
-- - /noticias/[slug]
-- - /casos-exito
-- - /casos-exito/[slug]
