-- =====================================================
-- GVC EXPERTOS - TABLAS ADICIONALES PARA HOSPITALES
-- =====================================================

-- =====================================================
-- TABLA: hospitals (Hospitales y centros sanitarios)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_place_id VARCHAR(200) UNIQUE NOT NULL,
    name VARCHAR(300) NOT NULL,
    address VARCHAR(500),
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,
    city_name VARCHAR(100),
    province VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    phone VARCHAR(50),
    website VARCHAR(500),
    rating DECIMAL(2, 1),
    total_ratings INTEGER DEFAULT 0,
    types JSONB DEFAULT '[]'::jsonb,
    opening_hours JSONB,
    photo_reference VARCHAR(500),
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_hospitals_place_id ON public.hospitals(google_place_id);
CREATE INDEX idx_hospitals_city ON public.hospitals(city_id);
CREATE INDEX idx_hospitals_city_name ON public.hospitals(city_name);
CREATE INDEX idx_hospitals_active ON public.hospitals(is_active);
CREATE INDEX idx_hospitals_location ON public.hospitals(latitude, longitude);

-- Trigger updated_at
CREATE TRIGGER update_hospitals_updated_at
    BEFORE UPDATE ON public.hospitals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active hospitals are viewable by everyone" ON public.hospitals
    FOR SELECT USING (is_active = true);

-- =====================================================
-- TABLA: city_content (Contenido específico por ciudad)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.city_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES public.cities(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL, -- 'intro', 'hospitals', 'statistics', 'legal_info'
    title VARCHAR(200),
    content TEXT,
    data JSONB,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_city_content_city ON public.city_content(city_id);
CREATE INDEX idx_city_content_type ON public.city_content(section_type);

-- Trigger updated_at
CREATE TRIGGER update_city_content_updated_at
    BEFORE UPDATE ON public.city_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.city_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "City content is viewable by everyone" ON public.city_content
    FOR SELECT USING (is_active = true);

-- =====================================================
-- TABLA: service_content (Contenido específico por servicio)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.service_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL, -- 'cases', 'statistics', 'legal_framework', 'process'
    title VARCHAR(200),
    content TEXT,
    data JSONB,
    "order" INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices
CREATE INDEX idx_service_content_service ON public.service_content(service_id);
CREATE INDEX idx_service_content_type ON public.service_content(section_type);

-- Trigger updated_at
CREATE TRIGGER update_service_content_updated_at
    BEFORE UPDATE ON public.service_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS
ALTER TABLE public.service_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service content is viewable by everyone" ON public.service_content
    FOR SELECT USING (is_active = true);

-- =====================================================
-- TABLA: admin_users (Usuarios administradores)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(200) UNIQUE NOT NULL,
    password_hash VARCHAR(200) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice
CREATE INDEX idx_admin_users_email ON public.admin_users(email);

-- Trigger updated_at
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON public.admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS - Solo lectura autenticada
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- COMENTARIOS
-- =====================================================
COMMENT ON TABLE public.hospitals IS 'Hospitales y centros sanitarios obtenidos de Google Places';
COMMENT ON TABLE public.city_content IS 'Contenido dinámico específico por ciudad';
COMMENT ON TABLE public.service_content IS 'Contenido dinámico específico por servicio';
COMMENT ON TABLE public.admin_users IS 'Usuarios del panel de administración';
