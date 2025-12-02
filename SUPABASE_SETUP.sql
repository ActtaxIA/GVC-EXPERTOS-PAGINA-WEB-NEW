-- =====================================================
-- GVC EXPERTOS - CONFIGURACIÓN COMPLETA DE SUPABASE
-- =====================================================
-- Copia y pega este script completo en el SQL Editor de Supabase
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

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);

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

CREATE INDEX IF NOT EXISTS idx_cities_slug ON public.cities(slug);
CREATE INDEX IF NOT EXISTS idx_cities_active ON public.cities(is_active);
CREATE INDEX IF NOT EXISTS idx_cities_province ON public.cities(province);

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

CREATE INDEX IF NOT EXISTS idx_team_slug ON public.team_members(slug);
CREATE INDEX IF NOT EXISTS idx_team_active ON public.team_members(is_active);

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

CREATE INDEX IF NOT EXISTS idx_post_categories_slug ON public.post_categories(slug);

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

CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON public.posts(is_published);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON public.posts(is_featured);
CREATE INDEX IF NOT EXISTS idx_posts_category ON public.posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

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

CREATE INDEX IF NOT EXISTS idx_news_slug ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON public.news(is_published);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);

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

CREATE INDEX IF NOT EXISTS idx_success_cases_slug ON public.success_cases(slug);
CREATE INDEX IF NOT EXISTS idx_success_cases_published ON public.success_cases(is_published);
CREATE INDEX IF NOT EXISTS idx_success_cases_service ON public.success_cases(service_id);

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

CREATE INDEX IF NOT EXISTS idx_testimonials_active ON public.testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_service ON public.testimonials(service_id);

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

CREATE INDEX IF NOT EXISTS idx_faqs_active ON public.faqs(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_service ON public.faqs(service_id);

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

CREATE INDEX IF NOT EXISTS idx_contact_read ON public.contact_submissions(is_read);
CREATE INDEX IF NOT EXISTS idx_contact_created ON public.contact_submissions(created_at DESC);

-- =====================================================
-- TABLA: hospitals (Hospitales y clínicas)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_place_id VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    province VARCHAR(100),
    postal_code VARCHAR(10),
    coordinates JSONB,
    phone VARCHAR(50),
    website VARCHAR(500),
    rating DECIMAL(2, 1),
    total_reviews INTEGER,
    google_maps_url TEXT,
    photo_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hospitals_city ON public.hospitals(city);
CREATE INDEX IF NOT EXISTS idx_hospitals_active ON public.hospitals(is_active);

-- =====================================================
-- TABLA: admin_users (Usuarios administradores)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(200) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users(email);

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
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_services_updated_at') THEN
        CREATE TRIGGER update_services_updated_at
            BEFORE UPDATE ON public.services
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_cities_updated_at') THEN
        CREATE TRIGGER update_cities_updated_at
            BEFORE UPDATE ON public.cities
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_team_members_updated_at') THEN
        CREATE TRIGGER update_team_members_updated_at
            BEFORE UPDATE ON public.team_members
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_posts_updated_at') THEN
        CREATE TRIGGER update_posts_updated_at
            BEFORE UPDATE ON public.posts
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_news_updated_at') THEN
        CREATE TRIGGER update_news_updated_at
            BEFORE UPDATE ON public.news
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_success_cases_updated_at') THEN
        CREATE TRIGGER update_success_cases_updated_at
            BEFORE UPDATE ON public.success_cases
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_contact_submissions_updated_at') THEN
        CREATE TRIGGER update_contact_submissions_updated_at
            BEFORE UPDATE ON public.contact_submissions
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_hospitals_updated_at') THEN
        CREATE TRIGGER update_hospitals_updated_at
            BEFORE UPDATE ON public.hospitals
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_admin_users_updated_at') THEN
        CREATE TRIGGER update_admin_users_updated_at
            BEFORE UPDATE ON public.admin_users
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END;
$$;

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
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes si existen
DROP POLICY IF EXISTS "Services are viewable by everyone" ON public.services;
DROP POLICY IF EXISTS "Cities are viewable by everyone" ON public.cities;
DROP POLICY IF EXISTS "Team members are viewable by everyone" ON public.team_members;
DROP POLICY IF EXISTS "Post categories are viewable by everyone" ON public.post_categories;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.posts;
DROP POLICY IF EXISTS "Published news are viewable by everyone" ON public.news;
DROP POLICY IF EXISTS "Published success cases are viewable by everyone" ON public.success_cases;
DROP POLICY IF EXISTS "Active testimonials are viewable by everyone" ON public.testimonials;
DROP POLICY IF EXISTS "Active FAQs are viewable by everyone" ON public.faqs;
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;
DROP POLICY IF EXISTS "Hospitals are viewable by everyone" ON public.hospitals;

-- Crear políticas de lectura pública
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

CREATE POLICY "Hospitals are viewable by everyone" ON public.hospitals
    FOR SELECT USING (is_active = true);

-- Política para insertar contactos
CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
    FOR INSERT WITH CHECK (true);

-- =====================================================
-- CONFIGURACIÓN DEL BUCKET DE STORAGE
-- =====================================================
-- Nota: Esto se debe hacer desde la UI de Supabase Storage
-- Crear un bucket llamado "images" con política pública de lectura

-- =====================================================
-- ✅ SCRIPT COMPLETADO
-- =====================================================
-- Después de ejecutar este script:
-- 1. Ve a Storage y crea un bucket llamado "images" (público)
-- 2. Ejecuta: npm run create-admin (en tu proyecto local)
-- 3. Ya puedes hacer el deploy en AWS Amplify

