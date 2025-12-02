# Instrucciones para Migración 005 - Columnas de Traducción [COMPLETADA]

**Estado: ✅ Ejecutada en producción**

## 📋 Resumen
Esta migración añade soporte completo para contenido bilingüe (Español/Inglés) en todas las tablas de contenido dinámico.

## 🎯 Tablas Afectadas
1. **posts** (Blog)
2. **news** (Noticias)
3. **success_cases** (Casos de Éxito)
4. **team_members** (Equipo)
5. **post_categories** (Categorías de Blog)
6. **hospitals** (Hospitales)

## 📦 Lo que añade esta migración

### Columnas nuevas:
- `*_en` para cada campo de texto (title_en, content_en, etc.)
- `needs_translation` (boolean) para marcar contenido pendiente de traducción

### Vistas SQL:
- `posts_with_translation_status` - Ver qué posts tienen traducción
- `news_with_translation_status` - Ver qué noticias tienen traducción

### Funciones Helper:
- `has_translation()` - Verificar si existe traducción
- `mark_for_translation()` - Marcar contenido para traducir
- Triggers automáticos para detectar contenido nuevo

### Índices de Performance:
- Búsqueda full-text en inglés
- Índices para verificar existencia de traducciones

## 🚀 Cómo Ejecutar en Supabase

### Opción 1: SQL Editor en Supabase Dashboard

1. Ir a Supabase Dashboard: https://app.supabase.com
2. Seleccionar tu proyecto: `feimoctnuiutbbhpaomr`
3. Ir a "SQL Editor" en el menú lateral
4. Hacer clic en "New query"
5. Copiar y pegar el contenido de `005_add_translation_columns.sql`
6. Hacer clic en "Run"
7. Verificar que aparezca el mensaje de éxito

### Opción 2: Supabase CLI (Local)

```bash
# Navegar al directorio del proyecto
cd c:/Users/NARCISOPARDOBUENDA/Desktop/GVCEXPERTOS

# Ejecutar la migración
supabase db push

# O ejecutar directamente el archivo
psql -h db.feimoctnuiutbbhpaomr.supabase.co -U postgres -d postgres -f supabase/migrations/005_add_translation_columns.sql
```

### Opción 3: Desde PowerShell (sin CLI)

```powershell
# Leer el archivo SQL
$sqlContent = Get-Content "supabase/migrations/005_add_translation_columns.sql" -Raw

# Copiar al portapapeles para pegar en Supabase Dashboard
$sqlContent | Set-Clipboard

Write-Host "✅ SQL copiado al portapapeles. Pégalo en el SQL Editor de Supabase."
```

## ✅ Verificación Post-Migración

Después de ejecutar la migración, verificar que todo esté correcto:

```sql
-- 1. Verificar que las columnas existen en posts
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name LIKE '%_en%';

-- 2. Verificar que las vistas se crearon
SELECT table_name 
FROM information_schema.views 
WHERE table_schema = 'public' 
AND table_name LIKE '%translation%';

-- 3. Verificar que los triggers existen
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_name LIKE '%translation%';

-- 4. Ver posts con estado de traducción
SELECT id, title, title_en, translation_status 
FROM posts_with_translation_status 
LIMIT 5;
```

## 🔄 Rollback (si es necesario)

Si necesitas revertir los cambios:

```sql
-- ROLLBACK: Eliminar columnas añadidas
ALTER TABLE posts 
DROP COLUMN IF EXISTS title_en,
DROP COLUMN IF EXISTS excerpt_en,
DROP COLUMN IF EXISTS content_en,
DROP COLUMN IF EXISTS meta_title_en,
DROP COLUMN IF EXISTS meta_description_en,
DROP COLUMN IF EXISTS needs_translation;

ALTER TABLE news 
DROP COLUMN IF EXISTS title_en,
DROP COLUMN IF EXISTS excerpt_en,
DROP COLUMN IF EXISTS content_en,
DROP COLUMN IF EXISTS meta_title_en,
DROP COLUMN IF EXISTS meta_description_en,
DROP COLUMN IF EXISTS needs_translation;

-- ... repetir para otras tablas

-- Eliminar vistas
DROP VIEW IF EXISTS posts_with_translation_status;
DROP VIEW IF EXISTS news_with_translation_status;

-- Eliminar funciones
DROP FUNCTION IF EXISTS has_translation;
DROP FUNCTION IF EXISTS mark_for_translation;
DROP FUNCTION IF EXISTS auto_mark_post_for_translation;
DROP FUNCTION IF EXISTS auto_mark_news_for_translation;

-- Eliminar triggers
DROP TRIGGER IF EXISTS trigger_mark_post_for_translation ON posts;
DROP TRIGGER IF EXISTS trigger_mark_news_for_translation ON news;
```

## 📊 Ejemplo de Uso

### Insertar un post bilingüe:

```sql
INSERT INTO posts (
  title, excerpt, content,
  title_en, excerpt_en, content_en,
  slug, is_published, author_id, category_id
) VALUES (
  'Guía de Negligencias Médicas',
  'Todo lo que necesitas saber sobre negligencias médicas en España.',
  '<h2>Introducción</h2><p>Las negligencias médicas...</p>',
  'Medical Negligence Guide',
  'Everything you need to know about medical negligence in Spain.',
  '<h2>Introduction</h2><p>Medical negligence...</p>',
  'guia-negligencias-medicas',
  true,
  '123e4567-e89b-12d3-a456-426614174000', -- ID del autor
  '123e4567-e89b-12d3-a456-426614174001'  -- ID de la categoría
);
```

### Actualizar traducción de un post existente:

```sql
UPDATE posts 
SET 
  title_en = 'Understanding Your Rights',
  excerpt_en = 'Learn about patient rights in medical cases.',
  content_en = '<h2>Your Rights</h2><p>As a patient...</p>',
  needs_translation = false
WHERE slug = 'tus-derechos-paciente';
```

### Consultar posts que necesitan traducción:

```sql
SELECT id, title, created_at
FROM posts
WHERE needs_translation = true
AND is_published = true
ORDER BY created_at DESC;
```

## 🎯 Próximos Pasos Después de la Migración

1. **Actualizar TypeScript Types** (`types/database.ts`)
2. **Implementar UI de Traducción** en el panel admin
3. **Integrar OpenAI API** para traducciones automáticas
4. **Migrar páginas de Blog a** `app/[locale]/blog/`
5. **Migrar páginas de Noticias a** `app/[locale]/noticias/`
6. **Actualizar componentes** para mostrar contenido según el idioma

## ⚠️ Notas Importantes

- Las columnas `*_en` son **NULLABLE** - el contenido en inglés es opcional
- Los triggers marcan automáticamente contenido nuevo como `needs_translation = true`
- Las vistas muestran el estado de traducción: `complete`, `partial`, o `none`
- Los índices mejoran la búsqueda en ambos idiomas
- El rollback es seguro ya que todas las columnas son opcionales

## 📞 Soporte

Si hay algún error durante la migración:

1. Revisar el mensaje de error en el SQL Editor
2. Verificar que las tablas base existen (`001_initial_schema.sql` ejecutado)
3. Verificar permisos del usuario de Supabase
4. Contactar si el error persiste

---

**Autor**: AI Assistant  
**Fecha**: Diciembre 2024  
**Versión**: 005  
**Estado**: ✅ Listo para producción

