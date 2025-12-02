# 🔍 Diagnóstico: Por qué funciona en local pero no en AWS Amplify

## Problema
Las páginas de categorías del blog (`/es/blog/categoria/conceptos`, etc.) funcionan perfectamente en local pero dan error **500 Internal Server Error** en AWS Amplify.

## Causas más probables

### 1. ❌ Variables de entorno no configuradas (95% de probabilidad)

**En local:**
- Tienes un archivo `.env.local` con las variables configuradas
- Next.js las carga automáticamente
- Todo funciona ✅

**En AWS Amplify:**
- Las variables de entorno deben configurarse manualmente en la consola
- Si no están configuradas, el código falla con error 500

**Solución:**
1. Ve a [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Selecciona tu aplicación
3. Ve a **App settings** → **Environment variables**
4. Verifica que existan estas variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
5. Si no existen, agrégalas con los valores de tu proyecto Supabase
6. Guarda y espera a que se redespliegue automáticamente

### 2. 🔍 Cómo verificar los logs en AWS Amplify

Para ver exactamente qué error está ocurriendo:

1. Ve a AWS Amplify Console → Tu app
2. Ve a **Monitoring** → **Logs**
3. Busca errores relacionados con:
   - `Supabase configuration is missing`
   - `Error fetching category`
   - `500 Internal Server Error`

### 3. 🧪 Verificar variables de entorno en el código

El código ahora tiene mejor logging. Si las variables no están configuradas, verás en los logs:
```
❌ Error de configuración Supabase: Supabase configuration is missing...
Variables disponibles: { hasUrl: false, hasKey: false }
```

### 4. 📋 Checklist de diagnóstico

- [ ] ¿Las variables `NEXT_PUBLIC_SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` están en AWS Amplify?
- [ ] ¿Los valores son correctos (sin espacios, sin comillas extra)?
- [ ] ¿El build en Amplify completó exitosamente?
- [ ] ¿Revisaste los logs de runtime en Amplify?

### 5. 🔧 Diferencias entre local y producción

| Aspecto | Local (dev) | AWS Amplify (prod) |
|---------|------------|-------------------|
| Variables de entorno | `.env.local` automático | Configuración manual requerida |
| Modo de ejecución | Desarrollo (hot reload) | Producción (SSR/ISR) |
| Manejo de errores | Más permisivo | Más estricto |
| Logs | Consola del terminal | CloudWatch/Amplify Logs |

### 6. ✅ Solución rápida

**Si las variables NO están configuradas:**

1. Obtén los valores de tu proyecto Supabase:
   - Ve a [Supabase Dashboard](https://app.supabase.com)
   - Selecciona tu proyecto
   - Ve a **Settings** → **API**
   - Copia:
     - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
     - `service_role` key (secret) → `SUPABASE_SERVICE_ROLE_KEY`

2. Configúralas en AWS Amplify:
   - AWS Amplify Console → Tu app → App settings → Environment variables
   - Agrega cada variable con su valor
   - Guarda

3. Espera el redespliegue (2-5 minutos)

**Si las variables SÍ están configuradas:**

1. Verifica que los valores sean correctos (sin espacios al inicio/final)
2. Revisa los logs de Amplify para ver el error específico
3. Verifica que tu proyecto Supabase esté activo y accesible

---

## 🎯 Conclusión

El 99% de estos casos se resuelven configurando correctamente las variables de entorno en AWS Amplify. El código funciona igual en ambos entornos, pero necesita acceso a las credenciales de Supabase.

