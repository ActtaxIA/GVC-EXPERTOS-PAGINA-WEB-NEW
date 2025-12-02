# 🏛️ GVC Expertos - Abogados Negligencias Médicas

Sitio web profesional completo para despacho de abogados especializado en negligencias médicas. Totalmente **bilingüe (Español/Inglés)**, incluye SEO local avanzado (105 ciudades), panel de administración con traducción IA, blog, noticias, casos de éxito, PWA y más.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8?logo=tailwindcss)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright)
![OpenAI](https://img.shields.io/badge/OpenAI-Translation-412991?logo=openai)

---

## 🚀 Quick Start

```bash
# 1. Clonar e instalar dependencias
git clone [repo]
cd gvc-expertos
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales (Supabase, OpenAI, Google Places, Resend, etc.)

# 3. Ejecutar migraciones en Supabase Dashboard (SQL Editor):
#    - supabase/migrations/001_initial_schema.sql
#    - supabase/migrations/002_seed_data.sql
#    - supabase/migrations/003_hospitals_and_admin.sql
#    - supabase/migrations/004_news_and_cases.sql
#    - supabase/migrations/005_add_translation_columns.sql (Soporte bilingüe)

# 4. Crear bucket "images" en Supabase Storage
#    Dashboard > Storage > New bucket > Name: "images" > Public: Yes
#    Crear carpetas: blog, news, cases, team, general

# 5. Crear usuario administrador
npm run create-admin

# 6. Iniciar servidor de desarrollo
npm run dev

# 7. Abrir http://localhost:3000
```

---

## ✨ Características Principales

### 🌍 Internacionalización (i18n)
- **Bilingüe Completo**: Español (Default) e Inglés.
- **Rutas Localizadas**: `/es/...` y `/en/...`.
- **Detección Automática**: Middleware inteligente basado en `Accept-Language`.
- **SEO Internacional**: Etiquetas `hreflang`, sitemap bilingüe, canonicals correctos.
- **Traducción IA**: Panel de administración integrado con OpenAI para traducir contenido automáticamente.

### 🌐 Frontend Público
| Sección | Descripción |
|---------|-------------|
| **Home** | 8 secciones optimizadas: Hero, Intro, Servicios, CTA, Equipo, Proceso, Galería, CTA Final |
| **6 Servicios** | Errores diagnóstico, quirúrgicos, ginecología, urgencias, infecciones, consentimiento |
| **105 Landings Locales** | SEO optimizado por ciudad con FAQs, hospitales y JSON-LD |
| **Blog** | Artículos dinámicos con categorías, autor, fechas. Contenido traducible. |
| **Noticias** | Agregador de noticias del sector. Contenido traducible. |
| **Casos de Éxito** | Resultados con montos de indemnización. |
| **Institucionales** | Sobre nosotros, Equipo, FAQs, Contacto. |
| **Legales** | Privacidad, Aviso legal, Cookies (con banner GDPR). |

### 🔐 Panel de Administración
| Módulo | Funcionalidades |
|--------|-----------------|
| **Dashboard** | Estadísticas generales, accesos rápidos |
| **Analytics** | Gráficos con Recharts: líneas, barras, pie charts |
| **Blog & Noticias** | CRUD completo, editor WYSIWYG TipTap, **Panel de Traducción IA** |
| **Casos de Éxito** | Gestión de casos con montos y servicios |
| **Hospitales** | Búsqueda Google Places API, gestión por ciudad |
| **Contactos** | CRM de leads, filtros por estado y servicio |
| **Traducción** | Herramientas para gestionar contenido bilingüe |

### 🔍 SEO Completo
| Tipo | Implementación |
|------|----------------|
| **Meta Tags** | Title, description únicos por página e idioma |
| **Open Graph** | og:title, og:description, og:image, og:url, og:locale |
| **Hreflang** | Implementación correcta para ES/EN |
| **JSON-LD** | 12 schemas diferentes (Organization, Service, Article, FAQ, etc.) |
| **Sitemap** | Dinámico con ~240 URLs (todas las variantes de idioma) |
| **Robots.txt** | Configuración optimizada |

### ⚡ Características Técnicas
- **PWA**: Service Worker, manifest.json, modo offline.
- **Email**: Resend con templates HTML responsive.
- **Buscador**: API de búsqueda con debounce.
- **Tests E2E**: Playwright (60+ tests).
- **Base de Datos**: Supabase con tipos TypeScript generados.
- **Validación**: Zod schemas.

---

## 📁 Estructura del Proyecto

```
gvc-expertos/
├── 📂 app/
│   ├── 📂 [locale]/                # Rutas localizadas (es/en)
│   │   ├── 📂 (legal)/             # Páginas legales
│   │   ├── 📂 (marketing)/         # Páginas institucionales
│   │   ├── 📂 blog/
│   │   ├── 📂 noticias/
│   │   ├── 📂 [ciudad]/            # 105 landings dinámicas
│   │   └── page.tsx                # Home
│   ├── 📂 admin/                   # Panel administración (sin locale)
│   ├── 📂 api/                     # API Routes
│   │   └── admin/
│   │       └── translate/          # Endpoint traducción IA
│   └── offline/                    # Página offline PWA
│
├── 📂 components/
│   ├── 📂 admin/
│   │   ├── TranslateButton.tsx     # UI Traducción
│   │   └── TranslationPanel.tsx
│   ├── 📂 home/
│   ├── 📂 ui/
│   │   └── LocalizedLink.tsx       # Link compatible con i18n
│   └── ...
│
├── 📂 lib/
│   ├── translation-utils.ts        # Helpers i18n
│   └── ...
│
├── 📂 messages/                    # Archivos de traducción JSON
│   ├── en.json
│   └── es.json
│
├── 📂 supabase/
│   └── migrations/                 # SQL Migrations
│
├── i18n.ts                         # Config next-intl
├── middleware.ts                   # Middleware i18n
└── ...
```

---

## 🔧 Variables de Entorno

```env
# SUPABASE
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# GOOGLE APIS
GOOGLE_PLACES_API_KEY=...

# OPENAI (Para traducciones)
OPENAI_API_KEY=sk-...

# AUTENTICACIÓN
JWT_SECRET=...

# EMAIL (RESEND)
RESEND_API_KEY=re_...
EMAIL_FROM=...
EMAIL_TO=...

# SITE
NEXT_PUBLIC_SITE_URL=https://gvcexpertos.es

# ANALYTICS
NEXT_PUBLIC_GA_ID=...
```

---

## 🧪 Testing

```bash
npx playwright install
npm run test        # Ejecutar todos los tests
npm run test:ui     # UI interactiva
```

---

## 📝 Scripts

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run start        # Servidor producción
npm run lint         # Linter
npm run create-admin # Crear usuario admin
```

---

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.
