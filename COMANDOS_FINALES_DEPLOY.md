# 🚀 Comandos Finales para Deploy

## ✅ Pre-Deploy Checklist

### 1. Verificar que todas las variables de entorno están en AWS Amplify

Ya las tienes configuradas según la captura:
- ✅ `JWT_SECRET`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `OPENAI_API_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

### 2. Commit y Push Final

```powershell
# Navegar al proyecto
cd C:\Users\NARCISOPARDOBUENDA\Desktop\GVCEXPERTOS

# Ver cambios
git status

# Añadir todos los cambios
git add .

# Commit con mensaje descriptivo
git commit -m "✨ Implementación completa bilingüe + SEO avanzado

- Sistema bilingüe completo (ES/EN) con next-intl
- 240+ páginas estáticas pre-renderizadas
- SEO nivel enterprise: hreflang, sitemap, robots.txt
- 12 schemas JSON-LD con idioma
- OpenGraph y Twitter Cards completos
- Migración 005 Supabase: columnas de traducción
- Footer y navegación localizados
- LocalizedLink component
- Cleanup de archivos duplicados
- i18n request handler + middleware
"

# Push a main
git push origin main
```

### 3. Verificar Deploy en AWS Amplify

1. Ir a: https://eu-north-1.console.aws.amazon.com/amplify/apps/d3u3pvpdxob2s3
2. Esperar a que termine el build (~5-10 minutos)
3. Verificar que no hay errores

### 4. Verificar Sitio en Producción

Una vez desplegado, verificar:

```bash
# URLs a verificar:
✅ https://tu-dominio.com/es
✅ https://tu-dominio.com/en
✅ https://tu-dominio.com/sitemap.xml
✅ https://tu-dominio.com/robots.txt
✅ https://tu-dominio.com/es/negligencias-medicas/errores-quirurgicos
✅ https://tu-dominio.com/en/negligencias-medicas/errores-quirurgicos
```

## 🔍 Verificaciones Post-Deploy

### 1. Verificar Hreflang Tags
```bash
# Ver código fuente de cualquier página
# Buscar:
<link rel="alternate" hreflang="es-ES" href="..." />
<link rel="alternate" hreflang="en-US" href="..." />
<link rel="canonical" href="..." />
```

### 2. Verificar Sitemap
```bash
# Visitar:
https://tu-dominio.com/sitemap.xml

# Debe mostrar ~240 URLs
# Con <loc>, <lastmod>, <changefreq>, <priority>
```

### 3. Verificar Robots.txt
```bash
# Visitar:
https://tu-dominio.com/robots.txt

# Debe mostrar:
# - User-agent: *
# - Sitemap: https://tu-dominio.com/sitemap.xml
# - Disallow: /admin/
```

### 4. Verificar Selector de Idioma
1. Ir a la home
2. Hacer clic en el selector de idioma
3. Verificar que cambia el idioma
4. Verificar que la URL cambia (es → en)

### 5. Verificar JSON-LD
```bash
# En cualquier página de servicio, buscar en código fuente:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "inLanguage": "es-ES",
  ...
}
</script>
```

## 🛠️ Si hay errores en el Build

### Error: "Could not locate request configuration module"
**Ya solucionado** - Archivo `i18n/request.ts` creado

### Error: "supabaseUrl is required"
**Solución**: Variables ya están en AWS Amplify, el build debería funcionar

### Error: TypeScript errors
```powershell
# Verificar localmente:
npm run build

# Si hay errores, corregir y hacer nuevo commit
git add .
git commit -m "🐛 Fix: Corregir errores TypeScript"
git push origin main
```

## 📊 Herramientas de Verificación SEO

### Google Search Console
1. Ir a: https://search.google.com/search-console
2. Añadir propiedad con tu dominio
3. Verificar propiedad
4. Enviar sitemap: `https://tu-dominio.com/sitemap.xml`
5. Verificar cobertura de hreflang

### Herramientas Hreflang
- https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-testing-tool/
- https://technicalseo.com/tools/hreflang/

### Rich Results Test (Google)
- https://search.google.com/test/rich-results
- Probar una página de servicio para verificar schemas

### Facebook Sharing Debugger
- https://developers.facebook.com/tools/debug/
- Verificar OpenGraph tags

### LinkedIn Post Inspector
- https://www.linkedin.com/post-inspector/
- Verificar cómo se ve al compartir

## 📈 Monitoreo Post-Launch

### Primera Semana
- [ ] Verificar indexación en Google (site:tu-dominio.com)
- [ ] Revisar Google Search Console diariamente
- [ ] Verificar que ambos idiomas se indexan
- [ ] Comprobar errores de hreflang
- [ ] Verificar tráfico por idioma en Analytics

### Primera Mes
- [ ] Analizar páginas más visitadas
- [ ] Verificar conversiones por idioma
- [ ] Optimizar páginas con bajo rendimiento
- [ ] Añadir más contenido traducido (blog/noticias)

## 🔄 Actualizaciones Futuras

### Para añadir nuevo contenido traducido:

1. **Opción A: Manual desde Supabase**
```sql
-- Ir a Supabase SQL Editor
UPDATE posts 
SET 
  title_en = 'Title in English',
  excerpt_en = 'Excerpt in English',
  content_en = '<p>Content in English</p>',
  needs_translation = false
WHERE slug = 'mi-post';
```

2. **Opción B: Desde el panel admin (cuando implementes el botón IA)**
- Editar post → Clic en "Traducir con IA" → Guardar

### Para añadir nuevos servicios:
1. Editar `config/site.ts`
2. Añadir servicio al array `services`
3. Añadir traducciones en `messages/es.json` y `messages/en.json`
4. Crear contenido en `app/[locale]/negligencias-medicas/[servicio]/page.tsx`
5. Commit y push

### Para añadir nuevas ciudades:
1. Editar `config/site.ts`
2. Añadir ciudad al array `cities`
3. Commit y push (el sitemap se regenera automáticamente)

## 🎯 Próximos Pasos Opcionales

Una vez en producción, puedes implementar progresivamente:

### Fase 1 (1-2 días)
- [ ] Migrar Blog a `[locale]`
- [ ] Migrar Noticias a `[locale]`
- [ ] Traducir 10 posts más populares

### Fase 2 (1 semana)
- [ ] Implementar botón de traducción IA en admin
- [ ] Traducir componentes del Home
- [ ] Migrar Casos de Éxito

### Fase 3 (1 mes)
- [ ] Crear imágenes OG personalizadas por servicio
- [ ] Optimizar Core Web Vitals
- [ ] A/B testing de CTAs

## ✅ Checklist Final Pre-Launch

- [ ] Variables de entorno configuradas en AWS Amplify
- [ ] Commit y push final realizado
- [ ] Build de AWS Amplify exitoso
- [ ] Sitio accesible en ambos idiomas (/es y /en)
- [ ] Sitemap.xml funcionando
- [ ] Robots.txt funcionando
- [ ] Selector de idioma funcional
- [ ] Hreflang tags presentes
- [ ] OpenGraph tags correctos
- [ ] JSON-LD schemas presentes
- [ ] Footer con enlaces localizados
- [ ] Navegación con dropdown de servicios
- [ ] Páginas de servicios accesibles
- [ ] Páginas de ciudades accesibles
- [ ] Sin errores en consola del navegador
- [ ] Google Search Console configurado
- [ ] Analytics configurado

---

## 🎉 ¡LISTO PARA LANZAR!

Una vez completada esta checklist, tu sitio estará:
- ✅ 100% bilingüe (ES/EN)
- ✅ SEO optimizado al máximo
- ✅ 240+ páginas indexables
- ✅ Performance óptima (SSG)
- ✅ Listo para escalar

**¡Éxito con el lanzamiento!** 🚀

