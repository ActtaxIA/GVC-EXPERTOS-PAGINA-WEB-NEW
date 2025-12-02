# Scripts de Importación

## Importar Posts del CSV a Supabase

Este script importa los artículos del CSV `Table 1-Grid view (5).csv` a la base de datos de Supabase.

### Características

- 📅 **Distribución temporal**: Los posts se distribuyen desde diciembre 2023 hasta el futuro
- ⏰ **Frecuencia**: Un post cada 2 semanas
- ✅ **Auto-publicación**: Los posts con fecha <= hoy se marcan como publicados
- 📝 **Procesamiento automático**:
  - Generación de slugs desde títulos
  - Conversión de Markdown a HTML
  - Generación de excerpts
  - Cálculo de tiempo de lectura
  - Meta descriptions automáticas

### Requisitos Previos

1. Variables de entorno configuradas:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=tu_url
   SUPABASE_SERVICE_ROLE_KEY=tu_key
   ```

2. El archivo CSV debe estar en la raíz del proyecto: `Table 1-Grid view (5).csv`

### Instalación

```bash
cd scripts
npm install
```

### Uso

#### 1. Modo de prueba (sin insertar datos)

```bash
npm run import-posts
```

Este modo muestra:
- Estadísticas de los posts a importar
- Cuántos se publicarían vs. programarían
- Ejemplos de los primeros 5 posts
- **NO inserta datos** en la base de datos

#### 2. Modo de importación real

Para hacer la importación real:

1. Abre `import-blog-posts.ts`
2. Busca el comentario `// DESCOMENTA LA SIGUIENTE SECCIÓN PARA HACER LA INSERCIÓN REAL`
3. Descomenta el bloque de código debajo
4. Ejecuta: `npm run import-posts`

### Estructura del CSV

El CSV debe tener estas columnas:
- `Titulo`: Título del artículo (requerido)
- `Texto`: Contenido del artículo en Markdown (requerido)
- `Articulo`: Opcional
- `Publicado`: Opcional
- `Modificacion`: Opcional

### Ejemplo de Salida

```
📚 Iniciando importación de posts desde CSV...

📄 Total de registros en CSV: 3448
✅ Registros válidos: 3447

📊 Estadísticas:
   - Total de posts: 3447
   - Publicados (hasta hoy): 52
   - Programados (futuro): 3395
   - Última fecha publicada: 01/12/2024
   - Próxima fecha programada: 15/12/2024

📝 Ejemplo de los primeros 5 posts:

1. "Plazos legales para reclamar por negligencia médica"
   Slug: plazos-legales-para-reclamar-por-negligencia-medica
   Publicado: ✅ Sí
   Fecha: 01/12/2023
   Tiempo de lectura: 8 min
   Excerpt: La negligencia médica se define como el incumplimiento...
```

### Notas Importantes

- ⚠️ **El script inserta en lotes de 50** para evitar timeouts
- 🔄 **Los primeros 3 posts** se marcan como destacados (`is_featured: true`)
- 📅 **Fecha de inicio**: 1 de diciembre de 2023
- ⏱️ **Intervalo**: 2 semanas (14 días)
- 🔐 **Requiere**: Service Role Key de Supabase (no la anon key)

### Troubleshooting

#### Error: Variables de entorno no configuradas
```bash
# Crea un archivo .env en la carpeta scripts
echo "NEXT_PUBLIC_SUPABASE_URL=tu_url" > .env
echo "SUPABASE_SERVICE_ROLE_KEY=tu_key" >> .env
```

#### Error: CSV no encontrado
```bash
# Asegúrate de que el CSV está en la raíz del proyecto
ls ../Table\ 1-Grid\ view\ \(5\).csv
```

#### Error: Slugs duplicados
Si hay títulos duplicados, el script generará slugs duplicados que causarán errores. Revisa el CSV antes de importar.

### Después de la Importación

1. Verifica los posts en el panel de administración: `/admin`
2. Asigna categorías y autores a los posts
3. Añade imágenes destacadas
4. Revisa y edita el contenido HTML si es necesario

