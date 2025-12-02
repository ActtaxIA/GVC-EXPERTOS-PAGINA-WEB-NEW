# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-12-02

### 🐛 Bug Fixes

- **Estilos**: Corregida clase `hover:bg-charcoal-light` a `hover:bg-charcoal-700` en `globals.css` y `Button.tsx`.
- **TypeScript**: Corregidos errores de tipado en objetos complejos de Supabase con relaciones (`posts`, `news`, `success_cases`) usando `as any` en `app/[locale]/blog/[slug]/page.tsx`, `app/[locale]/noticias/[slug]/page.tsx` y `app/[locale]/blog/page.tsx`.
- **Componentes**: Corregida prop `icon` a `name` en `ServiceIcon` dentro de `ServicesSection.tsx`.
- **Utilidades**: Corregido error de indexación genérica en `lib/translation-utils.ts`.
- **Runtime**: Convertido `app/offline/page.tsx` a Client Component (`'use client'`) para permitir interactividad (`onClick`).

## [1.0.0] - 2024-12-02

### 🎉 Release Inicial

Primera versión completa del sitio web GVC Expertos.

### Añadido

#### Frontend Público
- Home con 8 secciones optimizadas
- 6 páginas de servicios de negligencias médicas
- 105 landings locales con SEO optimizado
- Blog dinámico con categorías
- Sistema de noticias con fuentes externas
- Página de casos de éxito
- Páginas institucionales (Sobre nosotros, Equipo, FAQs, Contacto)
- Páginas legales (Privacidad, Aviso legal, Cookies)
- Página 404 mejorada con sugerencias
- Página offline para PWA

#### Panel de Administración
- Dashboard con estadísticas
- Analytics con gráficos (Recharts)
- Gestión de Blog con editor WYSIWYG (TipTap)
- Gestión de Noticias
- Gestión de Hospitales con Google Places API
- Gestión de Contactos/Leads
- Sistema de autenticación JWT
- Subida de imágenes a Supabase Storage

#### SEO
- Meta tags dinámicos por página
- Open Graph completo
- Twitter Cards
- JSON-LD (12 schemas diferentes)
- Sitemap dinámico (~130 URLs)
- robots.txt optimizado
- Canonical URLs
- Breadcrumbs estructurados

#### Técnico
- PWA completa (Service Worker, manifest, offline)
- Email transaccional con Resend
- Tests E2E con Playwright (60+ tests)
- Buscador integrado con debounce
- Cookie Banner GDPR
- Back to Top
- Headers de seguridad
- Optimización de imágenes (WebP, AVIF)
- Loading skeletons

#### Base de Datos
- 17 tablas en Supabase
- 4 migraciones SQL
- Datos seed iniciales
- RLS (Row Level Security)

### Stack Tecnológico
- Next.js 14
- TypeScript 5.3
- TailwindCSS 3.3
- Supabase
- TipTap
- Recharts
- Playwright

---

## [Próximas Versiones]

### Planificado
- [ ] Admin: Edición de noticias individuales
- [ ] Admin: Gestión de casos de éxito
- [ ] Admin: Página de configuración
- [ ] Integración Google Analytics 4
- [ ] Newsletter con Resend
- [ ] Chat en vivo
- [ ] Área de clientes
- [ ] Multiidioma (Catalán, Gallego, Euskera)
