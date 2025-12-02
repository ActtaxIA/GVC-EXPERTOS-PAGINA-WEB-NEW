# 📋 Revisión SEO: Metatítulos, Metadescripciones y Open Graph

## Estado Actual

### ✅ Elementos Correctos

1. **Layout principal** (`app/[locale]/layout.tsx`):
   - ✅ Metatítulo con template
   - ✅ Metadescripción bilingüe
   - ✅ Keywords ES/EN
   - ✅ Open Graph configurado
   - ✅ Twitter Card configurado
   - ✅ Robots configurado
   - ✅ Alternates hreflang

2. **Páginas con metadatos completos**:
   - ✅ `/contacto` - Título, descripción, OG, Twitter
   - ✅ `/negligencias-medicas` - Título, descripción, OG, alternates
   - ✅ `/sobre-nosotros` - Título, descripción, alternates
   - ✅ `/blog` - Título, descripción, OG
   - ✅ `/blog/[category]` - Título dinámico, descripción, OG
   - ✅ `/blog/[category]/[slug]` - Título dinámico, descripción, OG con imagen del post

### ⚠️ Problemas Encontrados y Corregidos

1. **Imagen Open Graph faltante**:
   - ❌ No existía `/images/og-image.jpg`
   - ✅ CORREGIDO: Creada imagen temporal

2. **Páginas sin Open Graph image específica**:
   - `/sobre-nosotros` - Usa imagen global
   - `/equipo` - Usa imagen global
   - `/preguntas-frecuentes` - Usa imagen global

### 📝 Recomendaciones

1. **Crear imagen OG profesional** (1200x630px):
   - Logo + nombre del despacho
   - Colores corporativos (dorado, negro)
   - Texto: "Abogados Negligencias Médicas"
   - Guardar como `/public/images/og-image.jpg`

2. **Imágenes OG por sección** (opcional):
   - `/public/images/og-servicios.jpg`
   - `/public/images/og-contacto.jpg`
   - `/public/images/og-blog.jpg`

3. **Verificar con herramientas**:
   - https://developers.facebook.com/tools/debug/
   - https://cards-dev.twitter.com/validator
   - https://search.google.com/test/rich-results

## Estructura de Metadatos por Página

### Home (`/`)
- Title: "GVC Expertos" / "Medical Negligence Lawyers"
- Description: Despacho especializado...
- OG Image: /images/og-image.jpg

### Servicios (`/negligencias-medicas`)
- Title: "Negligencias Médicas | Tipos de Errores Médicos"
- Description: Especialistas en todo tipo...
- OG Image: /images/og-image.jpg (hereda del layout)

### Servicio Individual (`/negligencias-medicas/[slug]`)
- Title: Dinámico desde DB
- Description: Dinámico desde DB
- OG Image: Imagen del servicio o global

### Blog (`/blog`)
- Title: "Blog | GVC Expertos"
- Description: Artículos sobre negligencias médicas...
- OG Image: /images/og-image.jpg

### Artículo (`/blog/[category]/[slug]`)
- Title: Título del artículo
- Description: Excerpt del artículo
- OG Image: featured_image del artículo ✅

### Ciudades (`/[ciudad]`)
- Title: "Abogados Negligencias Médicas en [Ciudad]"
- Description: Dinámico con nombre de ciudad
- OG Image: Global

### Contacto (`/contacto`)
- Title: "Contacto | Consulta Gratuita..."
- Description: Contacta con nuestros abogados...
- OG Image: Global

### Legal (`/aviso-legal`, `/politica-privacidad`, `/politica-cookies`)
- Title: Específico por página
- Description: Específico
- OG Image: Global

## Checklist Final

- [x] Layout con metadatos base
- [x] Todas las páginas tienen generateMetadata
- [x] Imagen OG existe
- [x] Favicon existe
- [x] Manifest.json existe
- [x] Robots configurado
- [x] Hreflang alternates
- [ ] Crear imagen OG profesional (recomendado)
- [ ] Verificar con Facebook Debugger
- [ ] Verificar con Twitter Card Validator

