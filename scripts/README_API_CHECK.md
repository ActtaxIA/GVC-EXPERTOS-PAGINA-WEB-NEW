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

Este script se ejecuta automáticamente durante el build en AWS Amplify para verificar que todas las conexiones estén correctas antes de desplegar.

Si alguna verificación crítica falla, se muestra una advertencia pero el build continúa.

## Variables de Entorno Requeridas

Para que el proyecto funcione correctamente en AWS Amplify, asegúrate de configurar en **AWS Amplify Console → Environment Variables**:

1. `NEXT_PUBLIC_SUPABASE_URL`
2. `SUPABASE_SERVICE_ROLE_KEY`

Sin estas variables, las páginas dinámicas (publicaciones, noticias) no funcionarán.

