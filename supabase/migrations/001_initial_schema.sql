-- =====================================================
-- GVC EXPERTOS - SCHEMA SQL PARA SUPABASE
-- =====================================================
-- Ejecutar este script en el SQL Editor de Supabase
-- =====================================================

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLA: services (Tipos de negligencias médicas)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    icon_name VARCHAR(50),
    short_description TEXT,
    content TEXT,
    faqs JSONB DEFAULT '[]'::jsonb,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_services_slug ON public.services(slug);
CREATE INDEX idx_services_active ON public.services(is_active);

-- =====================================================
-- TABLA: cities (Landings locales)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    province VARCHAR(100),
    community VARCHAR(100),
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    h1_title VARCHAR(200),
    intro_text TEXT,
    local_content TEXT,
    coordinates JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_cities_slug ON public.cities(slug);
CREATE INDEX idx_cities_active ON public.cities(is_active);
CREATE INDEX idx_cities_province ON public.cities(province);

-- =====================================================
-- TABLA: team_members (Equipo de abogados)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    position VARCHAR(100) NOT NULL,
    bio TEXT,
    photo_url VARCHAR(500),
    email VARCHAR(200),
    linkedin_url VARCHAR(500),
    specialties JSONB DEFAULT '[]'::jsonb,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_team_slug ON public.team_members(slug);
CREATE INDEX idx_team_active ON public.team_members(is_active);

-- =====================================================
-- TABLA: post_categories (Categorías del blog)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.post_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_post_categories_slug ON public.post_categories(slug);

-- =====================================================
-- TABLA: posts (Artículos del blog)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(300) NOT NULL,
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    excerpt TEXT,
    content TEXT,
    featured_image VARCHAR(500),
    category_id UUID REFERENCES public.post_categories(id) ON DELETE SET NULL,
    author_id UUID REFERENCES public.team_members(id) ON DELETE SET NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    reading_time INTEGER,
    is_featured BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_published ON public.posts(is_published);
CREATE INDEX idx_posts_featured ON public.posts(is_featured);
CREATE INDEX idx_posts_category ON public.posts(category_id);
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC);

-- =====================================================
-- TABLA: news (Noticias)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(300) NOT NULL,
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    excerpt TEXT,
    content TEXT,
    featured_image VARCHAR(500),
    source_url VARCHAR(500),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_published ON public.news(is_published);
CREATE INDEX idx_news_published_at ON public.news(published_at DESC);

-- =====================================================
-- TABLA: success_cases (Casos de éxito)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.success_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(300) NOT NULL,
    meta_title VARCHAR(200),
    meta_description VARCHAR(500),
    excerpt TEXT,
    content TEXT,
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    result_amount DECIMAL(12, 2),
    year INTEGER,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_success_cases_slug ON public.success_cases(slug);
CREATE INDEX idx_success_cases_published ON public.success_cases(is_published);
CREATE INDEX idx_success_cases_service ON public.success_cases(service_id);

-- =====================================================
-- TABLA: testimonials (Testimonios de clientes)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_testimonials_active ON public.testimonials(is_active);
CREATE INDEX idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX idx_testimonials_service ON public.testimonials(service_id);

-- =====================================================
-- TABLA: faqs (Preguntas frecuentes)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50),
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_faqs_active ON public.faqs(is_active);
CREATE INDEX idx_faqs_category ON public.faqs(category);
CREATE INDEX idx_faqs_service ON public.faqs(service_id);

-- =====================================================
-- TABLA: contact_submissions (Formularios de contacto)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    phone VARCHAR(50),
    city VARCHAR(100),
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    message TEXT,
    source_url VARCHAR(500),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    is_read BOOLEAN DEFAULT false,
    is_contacted BOOLEAN DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_contact_read ON public.contact_submissions(is_read);
CREATE INDEX idx_contact_created ON public.contact_submissions(created_at DESC);

-- =====================================================
-- FUNCIÓN: Actualizar updated_at automáticamente
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cities_updated_at
    BEFORE UPDATE ON public.cities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_team_members_updated_at
    BEFORE UPDATE ON public.team_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON public.news
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_success_cases_updated_at
    BEFORE UPDATE ON public.success_cases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON public.contact_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.success_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (para contenido publicado)
CREATE POLICY "Services are viewable by everyone" ON public.services
    FOR SELECT USING (is_active = true);

CREATE POLICY "Cities are viewable by everyone" ON public.cities
    FOR SELECT USING (is_active = true);

CREATE POLICY "Team members are viewable by everyone" ON public.team_members
    FOR SELECT USING (is_active = true);

CREATE POLICY "Post categories are viewable by everyone" ON public.post_categories
    FOR SELECT USING (true);

CREATE POLICY "Published posts are viewable by everyone" ON public.posts
    FOR SELECT USING (is_published = true);

CREATE POLICY "Published news are viewable by everyone" ON public.news
    FOR SELECT USING (is_published = true);

CREATE POLICY "Published success cases are viewable by everyone" ON public.success_cases
    FOR SELECT USING (is_published = true);

CREATE POLICY "Active testimonials are viewable by everyone" ON public.testimonials
    FOR SELECT USING (is_active = true);

CREATE POLICY "Active FAQs are viewable by everyone" ON public.faqs
    FOR SELECT USING (is_active = true);

-- Política para insertar contactos (cualquier usuario anónimo puede enviar)
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- COMENTARIOS EN TABLAS
-- =====================================================
COMMENT ON TABLE public.services IS 'Tipos de negligencias médicas (servicios del despacho)';
COMMENT ON TABLE public.cities IS 'Ciudades para landings locales SEO';
COMMENT ON TABLE public.team_members IS 'Miembros del equipo de abogados';
COMMENT ON TABLE public.post_categories IS 'Categorías de artículos del blog';
COMMENT ON TABLE public.posts IS 'Artículos del blog';
COMMENT ON TABLE public.news IS 'Noticias y actualidad jurídica';
COMMENT ON TABLE public.success_cases IS 'Casos de éxito / Sentencias ganadas';
COMMENT ON TABLE public.testimonials IS 'Testimonios de clientes';
COMMENT ON TABLE public.faqs IS 'Preguntas frecuentes';
COMMENT ON TABLE public.contact_submissions IS 'Envíos del formulario de contacto (leads)';
