# 🏛️ GVC Expertos - Abogados Negligencias Médicas

Sitio web profesional completo para despacho de abogados especializado en negligencias médicas. Incluye SEO local avanzado (105 ciudades), panel de administración, blog, noticias, casos de éxito, PWA y más.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8?logo=tailwindcss)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2EAD33?logo=playwright)

---

## 🚀 Quick Start

```bash
# 1. Clonar e instalar dependencias
git clone [repo]
cd gvc-expertos
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales (ver sección Variables de Entorno)

# 3. Ejecutar migraciones en Supabase Dashboard (SQL Editor):
#    - supabase/migrations/001_initial_schema.sql
#    - supabase/migrations/002_seed_data.sql
#    - supabase/migrations/003_hospitals_and_admin.sql
#    - supabase/migrations/004_news_and_cases.sql

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

## ✨ Características Completas

### 🌐 Frontend Público

| Sección | Descripción |
|---------|-------------|
| **Home** | 8 secciones optimizadas: Hero, Intro, Servicios, CTA, Equipo, Proceso, Galería, CTA Final |
| **6 Servicios** | Errores diagnóstico, quirúrgicos, ginecología, urgencias, infecciones, consentimiento |
| **105 Landings Locales** | SEO optimizado por ciudad con FAQs, hospitales y JSON-LD |
| **Blog** | Artículos dinámicos con categorías, autor, fechas |
| **Noticias** | Agregador de noticias del sector con fuentes externas |
| **Casos de Éxito** | Resultados con montos de indemnización |
| **Institucionales** | Sobre nosotros, Equipo, FAQs, Contacto |
| **Legales** | Privacidad, Aviso legal, Cookies |

### 🔐 Panel de Administración

| Módulo | Funcionalidades |
|--------|-----------------|
| **Dashboard** | Estadísticas generales, accesos rápidos |
| **Analytics** | Gráficos con Recharts: líneas, barras, pie charts |
| **Blog** | CRUD completo, editor WYSIWYG TipTap, subida imágenes |
| **Noticias** | Gestión de noticias, estados publicado/borrador |
| **Casos de Éxito** | Gestión de casos con montos y servicios |
| **Hospitales** | Búsqueda Google Places API, gestión por ciudad |
| **Contactos** | CRM de leads, filtros por estado y servicio |
| **Configuración** | Ajustes generales (pendiente) |

### 🔍 SEO Completo

| Tipo | Implementación |
|------|----------------|
| **Meta Tags** | Title, description únicos por página |
| **Open Graph** | og:title, og:description, og:image, og:url, og:type |
| **Twitter Cards** | summary_large_image |
| **Canonical URLs** | En todas las páginas |
| **JSON-LD** | 12 schemas diferentes (ver abajo) |
| **Sitemap** | Dinámico con ~130 URLs |
| **robots.txt** | Configuración optimizada |

#### JSON-LD Schemas Implementados
1. Organization
2. LocalBusiness / LegalService
3. WebSite (con SearchAction)
4. ProfessionalService
5. Service
6. Article
7. NewsArticle
8. FAQPage
9. BreadcrumbList
10. ContactPage
11. AboutPage
12. Person

### ⚡ Características Técnicas

| Feature | Tecnología |
|---------|------------|
| **PWA** | Service Worker, manifest.json, modo offline |
| **Email** | Resend con templates HTML responsive |
| **Buscador** | API de búsqueda con debounce |
| **Tests E2E** | Playwright (60+ tests) |
| **Editor WYSIWYG** | TipTap con 15+ extensiones |
| **Subida imágenes** | Supabase Storage con drag & drop |
| **Autenticación** | JWT con bcrypt |
| **Validación** | Zod schemas |
| **UI Components** | Back to Top, Cookie Banner GDPR, Acordeón |

---

## 📁 Estructura del Proyecto

```
gvc-expertos/
├── 📂 app/
│   ├── 📂 (legal)/                 # Páginas legales
│   │   ├── aviso-legal/
│   │   ├── politica-cookies/
│   │   └── politica-privacidad/
│   ├── 📂 (marketing)/             # Páginas institucionales
│   │   ├── casos-exito/
│   │   ├── contacto/
│   │   ├── equipo/
│   │   ├── preguntas-frecuentes/
│   │   └── sobre-nosotros/
│   ├── 📂 admin/                   # Panel administración
│   │   ├── analytics/
│   │   ├── blog/
│   │   │   └── nuevo/
│   │   ├── contactos/
│   │   ├── hospitales/
│   │   ├── login/
│   │   └── noticias/
│   ├── 📂 api/                     # API Routes
│   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── hospitals/
│   │   │   ├── news/
│   │   │   ├── posts/
│   │   │   ├── stats/
│   │   │   └── upload/
│   │   ├── contact/
│   │   └── search/
│   ├── 📂 blog/
│   │   └── [slug]/
│   ├── 📂 casos-exito/
│   ├── 📂 negligencias-medicas/
│   │   └── [servicio]/
│   ├── 📂 noticias/
│   │   └── [slug]/
│   ├── 📂 offline/
│   ├── 📂 [ciudad]/                # 105 landings dinámicas
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
│
├── 📂 components/
│   ├── 📂 editor/                  # TipTap WYSIWYG
│   │   ├── ImageUploader.tsx
│   │   ├── RichTextEditor.tsx
│   │   └── index.ts
│   ├── 📂 forms/
│   │   └── ContactForm.tsx
│   ├── 📂 home/                    # 8 secciones Home
│   │   ├── Hero.tsx
│   │   ├── IntroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── CtaDark.tsx
│   │   ├── TeamSection.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── CtaFinal.tsx
│   │   └── index.ts
│   ├── 📂 layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumbs.tsx
│   ├── 📂 seo/
│   │   └── JsonLd.tsx              # 12 schemas
│   └── 📂 ui/
│       ├── Accordion.tsx
│       ├── BackToTop.tsx
│       ├── Button.tsx
│       ├── CookieBanner.tsx
│       ├── Icons.tsx
│       └── SearchBar.tsx
│
├── 📂 config/
│   └── site.ts                     # Configuración + 105 ciudades
│
├── 📂 lib/
│   ├── auth.ts                     # JWT + bcrypt
│   ├── email.ts                    # Resend templates
│   ├── google-places.ts            # Google Places API
│   ├── supabase.ts
│   └── utils.ts
│
├── 📂 public/
│   ├── images/
│   ├── manifest.json               # PWA
│   └── sw.js                       # Service Worker
│
├── 📂 supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql
│       ├── 002_seed_data.sql
│       ├── 003_hospitals_and_admin.sql
│       └── 004_news_and_cases.sql
│
├── 📂 tests/
│   ├── admin.spec.ts
│   └── main.spec.ts                # 60+ tests
│
├── 📂 types/
│   └── index.ts
│
├── .env.example
├── package.json
├── playwright.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── README.md
└── SEO-AUDIT.md
```

---

## 🗺️ URLs del Sitio (~130 total)

### Públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/sobre-nosotros` | Sobre la empresa |
| `/equipo` | Equipo de abogados |
| `/contacto` | Formulario de contacto |
| `/preguntas-frecuentes` | 13 FAQs en 4 categorías |
| `/blog` | Listado de artículos |
| `/blog/[slug]` | Artículo individual |
| `/noticias` | Listado de noticias |
| `/noticias/[slug]` | Noticia individual |
| `/casos-exito` | Resultados obtenidos |
| `/negligencias-medicas` | Página principal servicios |
| `/negligencias-medicas/errores-diagnostico` | Servicio 1 |
| `/negligencias-medicas/errores-quirurgicos` | Servicio 2 |
| `/negligencias-medicas/negligencias-ginecologia-obstetricia` | Servicio 3 |
| `/negligencias-medicas/negligencias-urgencias` | Servicio 4 |
| `/negligencias-medicas/infecciones-hospitalarias` | Servicio 5 |
| `/negligencias-medicas/consentimiento-informado` | Servicio 6 |
| `/abogados-negligencias-medicas-madrid` | Landing Madrid |
| `/abogados-negligencias-medicas-barcelona` | Landing Barcelona |
| `/abogados-negligencias-medicas-[ciudad]` | **105 landings locales** |
| `/politica-privacidad` | Política de privacidad |
| `/aviso-legal` | Aviso legal |
| `/politica-cookies` | Política de cookies |
| `/offline` | Página offline (PWA) |

### Admin (protegidas con JWT)

| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Login |
| `/admin` | Dashboard |
| `/admin/analytics` | Estadísticas con gráficos |
| `/admin/blog` | Gestión artículos |
| `/admin/blog/nuevo` | Crear artículo (WYSIWYG) |
| `/admin/blog/[id]` | Editar artículo |
| `/admin/noticias` | Gestión noticias |
| `/admin/hospitales` | Gestión hospitales |
| `/admin/contactos` | CRM de leads |

---

## 🗄️ Base de Datos

### Tablas (17)

| Tabla | Descripción | Registros iniciales |
|-------|-------------|---------------------|
| `services` | Servicios legales | 6 |
| `cities` | Ciudades | 105 |
| `team_members` | Equipo | 4 |
| `testimonials` | Testimonios | 6 |
| `faqs` | Preguntas frecuentes | 13 |
| `post_categories` | Categorías blog | 6 |
| `posts` | Artículos blog | 3 |
| `news` | Noticias | 1 |
| `success_cases` | Casos de éxito | 1 |
| `contact_submissions` | Leads/Contactos | 0 |
| `hospitals` | Hospitales | 0 (se cargan via API) |
| `admin_users` | Usuarios admin | 1 |
| `city_content` | Contenido por ciudad | 0 |
| `service_content` | Contenido por servicio | 0 |
| `settings` | Configuración | 0 |
| `media` | Archivos subidos | 0 |
| `audit_log` | Log de acciones | 0 |

### Diagrama ER simplificado

```
posts ──────┬──► post_categories
            └──► admin_users (author)

news ──────────► admin_users (created_by)

success_cases ──► services

contact_submissions ──► services

hospitals ──────► cities
```

---

## 🎨 Diseño

### Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| **Gold** | `#b8860b` | Primary, CTAs, acentos |
| **Charcoal** | `#1a1a1a` | Textos, fondos oscuros |
| **Cream** | `#f5f3f0` | Fondos claros |
| **White** | `#ffffff` | Cards, fondos |
| **Gray** | `#6b7280` | Textos secundarios |

### Tipografías

| Fuente | Uso | Weights |
|--------|-----|---------|
| **Playfair Display** | Títulos, headings | 400, 500, 600, 700 |
| **Source Sans 3** | Cuerpo, UI | 300, 400, 500, 600, 700 |

---

## 📦 Dependencias

### Core

```json
{
  "next": "14.0.4",
  "react": "18.2.0",
  "typescript": "5.3.3",
  "tailwindcss": "3.3.6"
}
```

### Base de Datos & Auth

```json
{
  "@supabase/supabase-js": "^2.39.0",
  "jose": "^5.2.0",
  "bcryptjs": "^2.4.3"
}
```

### Editor & UI

```json
{
  "@tiptap/react": "^2.1.13",
  "@tiptap/starter-kit": "^2.1.13",
  "@tiptap/extension-image": "^2.1.13",
  "@tiptap/extension-link": "^2.1.13",
  "react-dropzone": "^14.2.3",
  "recharts": "^2.10.3",
  "lucide-react": "^0.294.0"
}
```

### Utilidades

```json
{
  "resend": "^2.1.0",
  "zod": "^3.22.4",
  "clsx": "^2.0.0"
}
```

### Testing

```json
{
  "@playwright/test": "^1.40.1"
}
```

---

## 🔧 Variables de Entorno

```env
# ===================
# SUPABASE
# ===================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===================
# GOOGLE APIS
# ===================
GOOGLE_PLACES_API_KEY=AIza...

# ===================
# AUTENTICACIÓN
# ===================
JWT_SECRET=tu-secreto-super-seguro-de-32-caracteres-minimo

# ===================
# EMAIL (RESEND)
# ===================
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=GVC Expertos <noreply@gvcexpertos.es>
EMAIL_TO=info@gvcexpertos.es

# ===================
# SITE
# ===================
NEXT_PUBLIC_SITE_URL=https://gvcexpertos.es

# ===================
# ANALYTICS (opcional)
# ===================
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Primera vez: instalar navegadores
npx playwright install

# Ejecutar todos los tests
npm run test

# Ejecutar con UI interactiva
npm run test:ui

# Ejecutar solo un archivo
npx playwright test tests/main.spec.ts

# Ver reporte HTML
npx playwright show-report
```

### Cobertura de Tests (60+)

| Categoría | Tests |
|-----------|-------|
| Homepage | ✅ Heading, navigation, CTA, footer |
| Servicios | ✅ 6 páginas de servicios |
| Landings | ✅ 5 ciudades (Madrid, Barcelona, Valencia, Sevilla, Murcia) |
| Contacto | ✅ Formulario, validación |
| Blog | ✅ Listado visible |
| Legales | ✅ 3 páginas legales |
| Mobile | ✅ Menú responsive |
| SEO | ✅ Meta description, OG tags, canonical |
| Performance | ✅ Carga < 5 segundos |
| Admin | ✅ Login, redirects, auth |

---

## 🚀 Deploy

### Vercel (Recomendado)

1. Conectar repositorio en [vercel.com](https://vercel.com)
2. Configurar variables de entorno
3. Deploy automático en cada push

### Manual

```bash
# Build de producción
npm run build

# Iniciar servidor
npm start
```

### Checklist Pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] Migraciones SQL ejecutadas
- [ ] Bucket "images" creado en Supabase
- [ ] Usuario admin creado
- [ ] Dominio configurado
- [ ] SSL activo
- [ ] Google Analytics (opcional)
- [ ] Google Search Console configurado

---

## 📊 Métricas del Proyecto

| Métrica | Valor |
|---------|-------|
| **Archivos** | 90+ |
| **Páginas públicas** | ~130 |
| **Componentes** | 25+ |
| **API Routes** | 15+ |
| **Tablas DB** | 17 |
| **Tests E2E** | 60+ |
| **JSON-LD Schemas** | 12 |
| **Landings locales** | 105 |

---

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo (localhost:3000)
npm run build        # Build producción
npm run start        # Servidor producción
npm run lint         # Linter ESLint
npm run lint:fix     # Linter con auto-fix
npm run test         # Tests Playwright
npm run test:ui      # Tests con UI interactiva
npm run test:headed  # Tests con navegador visible
npm run test:debug   # Tests en modo debug
npm run create-admin # Crear usuario admin
npm run check        # Verificar estado del proyecto
npm run clean        # Limpiar caché de Next.js
```

---

## 📁 Archivos Adicionales

| Archivo | Descripción |
|---------|-------------|
| `CHANGELOG.md` | Historial de versiones |
| `SEO-AUDIT.md` | Auditoría SEO completa |
| `.nvmrc` | Versión de Node.js |
| `scripts/check-project.js` | Script de verificación |

---

## 🤝 Contribución

Este es un proyecto privado para GVC Expertos.

---

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.

---

<div align="center">

**Desarrollado con ❤️**

Next.js 14 • TypeScript • Supabase • TailwindCSS • TipTap • Recharts • Playwright

</div>
