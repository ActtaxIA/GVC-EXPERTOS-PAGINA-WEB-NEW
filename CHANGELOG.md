# Changelog

Todos los cambios notables del proyecto GVC Expertos.

## [2.0.0] - 2024-12-02

### 🚀 Cambio Mayor: Migración a Páginas Estáticas (SSG)

**Problema:** Las páginas dinámicas no funcionaban correctamente en AWS Amplify debido a problemas de conexión con Supabase en runtime.

**Solución:** Convertir todas las páginas de contenido dinámico a **Static Site Generation (SSG)**:
- Blog/Publicaciones
- Noticias
- Casos de Éxito

Ahora los datos se obtienen de Supabase **durante el build**, no en runtime.

### ✨ Nuevas Características

#### Blog/Publicaciones
- Nueva URL: `/es/publicaciones` y `/en/posts`
- Filtros de categoría funcionales (client-side)
- Limpieza automática de HTML en excerpts
- Traducciones de categorías (Guías→Guides, etc.)

#### Webhook de Rebuild
- Endpoint `/api/webhook/rebuild` para auto-deploy
- Integración con Supabase Database Webhooks
- Seguridad con `WEBHOOK_SECRET`

#### UI/UX
- Botón "Back to Top" en todas las páginas
- Menú móvil con z-index máximo (9999)
- Grid responsive del equipo (2 columnas en móvil)

### 🐛 Correcciones

#### Traducciones
- Servicios en páginas de ciudades ahora traducidos
- Servicios en `/negligencias-medicas` ahora traducidos
- Categorías del blog traducidas en inglés
- Eliminados duplicados en archivos de traducción JSON

#### Mapa de Contacto
- Corregida ubicación: Murcia en vez de Madrid
- Dirección: Plaza Fuensanta, 3 - 6ºB, 30008 Murcia

#### SEO
- URLs de blog actualizadas en sitemap
- Canonical URLs corregidas
- Open Graph images verificadas

### 🔧 Técnico

#### AWS Amplify
- `amplify.yml` actualizado para SSG
- Script `check:api` en preBuild
- Variables de entorno verificadas durante build

#### Código
- `generateStaticParams()` para todas las páginas dinámicas
- Tipos corregidos para relaciones de Supabase
- Componente `PostsGrid` separado (client component)

---

## [1.5.0] - 2024-11-XX

### Características
- Panel de administración completo
- Editor WYSIWYG con TipTap
- Traducción automática con OpenAI
- 105 landings de ciudades
- PWA con Service Worker

---

## [1.0.0] - 2024-XX-XX

### Lanzamiento Inicial
- Sitio web completo bilingüe
- 6 servicios de negligencias médicas
- Sistema de contacto con Resend
- SEO completo con JSON-LD
