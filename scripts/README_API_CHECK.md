# Script de Verificación de Conexiones API

Este script verifica todas las conexiones del frontend con las APIs externas.

## Uso

```bash
npm run check:api
```

## Qué verifica

### 1. Variables de Entorno
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - URL de Supabase (REQUERIDA)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Service Role Key (REQUERIDA)
- ⚠️  `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon Key (OPCIONAL)
- ⚠️  `OPENAI_API_KEY` - OpenAI para traducciones (OPCIONAL)

### 2. Conexión a Supabase
- Prueba conexión a la base de datos
- Verifica acceso a tabla `posts`
- Verifica acceso a tabla `post_categories`
- Verifica acceso a tabla `team_members`
- Verifica acceso a tabla `services`
- Muestra los primeros registros de cada tabla

### 3. Conexión a OpenAI (si está configurado)
- Verifica que la API Key sea válida
- Prueba acceso a la API

## Resultado

El script muestra un resumen con:
- ✅ Verificaciones exitosas (verde)
- ❌ Verificaciones fallidas (rojo)
- ⚠️  Advertencias (amarillo)

## Ejecución en AWS Amplify

Este script se ejecuta automáticamente durante el **preBuild** en AWS Amplify:

```yaml
# amplify.yml
preBuild:
  commands:
    - npm run check:api
```

### ¿Por qué es importante?

Con páginas **SSG (Static Site Generation)**, los datos se obtienen de Supabase **durante el build**, no en runtime. Por eso es crítico verificar las conexiones antes de construir.

Si las variables de entorno no están configuradas, el build generará páginas vacías.

## Variables de Entorno en AWS Amplify

Configurar en **AWS Amplify Console → App settings → Environment variables**:

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Sí | URL del proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Sí | Service Role Key (no anon key) |
| `OPENAI_API_KEY` | ❌ No | Para traducciones automáticas |
| `AMPLIFY_WEBHOOK_URL` | ❌ No | Para auto-rebuild |
| `WEBHOOK_SECRET` | ❌ No | Seguridad del webhook |

## Troubleshooting

### "Supabase credentials missing"
Las variables de entorno no están configuradas en AWS Amplify.

### "Error al consultar posts"
La tabla `posts` no existe o no tiene permisos. Ejecutar migraciones SQL.

### "column services.title_es does not exist"
La tabla `services` tiene estructura diferente. No es crítico.
