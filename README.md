# 🏛️ GVC Expertos - Abogados Negligencias Médicas

Sitio web profesional para despacho de abogados especializado en negligencias médicas. **100% bilingüe (Español/Inglés)**, desplegado en **AWS Amplify** con páginas estáticas (SSG) para máximo rendimiento.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8?logo=tailwindcss)
![AWS Amplify](https://img.shields.io/badge/AWS-Amplify-FF9900?logo=aws-amplify)

**🌐 Producción:** https://www.gvcexpertos.com

---

## 🚀 Arquitectura

### Páginas Estáticas (SSG)
El sitio usa **Static Site Generation** para compatibilidad total con AWS Amplify:

| Tipo de Página | Generación | Datos |
|----------------|------------|-------|
| Home, Servicios, Legal | Build time | Estático |
| 105 Ciudades | Build time | `generateStaticParams()` |
| Blog/Publicaciones | Build time | Supabase → SSG |
| Noticias | Build time | Supabase → SSG |
| Casos de Éxito | Build time | Supabase → SSG |

**⚠️ Importante:** Para nuevo contenido (artículos, noticias), se necesita un nuevo deploy en AWS Amplify.

### Webhook de Rebuild Automático
Endpoint disponible para disparar rebuilds automáticos:
```
POST /api/webhook/rebuild
```
Configurar en Supabase Database Webhooks para auto-deploy cuando se crea contenido.

---

## 🌍 Internacionalización (i18n)

### URLs Traducidas
| Español | Inglés |
|---------|--------|
| `/es/publicaciones` | `/en/posts` |
| `/es/sobre-nosotros` | `/en/about-us` |
| `/es/equipo` | `/en/team` |
| `/es/contacto` | `/en/contact` |
| `/es/negligencias-medicas` | `/en/medical-negligence` |
| `/es/preguntas-frecuentes` | `/en/faq` |

### Sistema de Traducciones
- **Archivos centralizados:** `messages/es.json`, `messages/en.json`
- **Traducciones inline:** `isSpanish ? 'texto ES' : 'texto EN'`
- **Categorías del blog:** Fallback con mapeo hardcodeado

---

## ✨ Características

### 🌐 Frontend Público
| Sección | Descripción |
|---------|-------------|
| **Home** | Hero, Intro, Servicios, CTA, Equipo, Proceso, Galería |
| **6 Servicios** | Errores quirúrgicos, diagnóstico, hospitalaria, obstétrica, medicación, consentimiento |
| **105 Landings Locales** | SEO por ciudad con hospitales y FAQs |
| **Publicaciones** | Blog con filtros por categoría |
| **Noticias** | Agregador de noticias del sector |
| **Casos de Éxito** | Resultados con indemnizaciones |
| **Institucionales** | Sobre nosotros, Equipo, FAQs, Contacto |
| **Legales** | Privacidad, Aviso legal, Cookies |

### 🔐 Panel de Administración
- Dashboard con estadísticas
- CRUD de Blog, Noticias, Casos
- Editor WYSIWYG (TipTap)
- Gestión de hospitales (Google Places API)
- CRM de contactos/leads

### 🔍 SEO
- Meta tags únicos por página e idioma
- Open Graph completo
- Hreflang ES/EN
- JSON-LD (Organization, Service, Article, FAQ, etc.)
- Sitemap dinámico (~240 URLs)
- Robots.txt optimizado

### ⚡ Técnico
- PWA con Service Worker
- Email con Resend
- Buscador con debounce
- Back to Top button
- Menú móvil off-canvas (z-index: 9999)

---

## 📁 Estructura del Proyecto

```
gvc-expertos/
├── app/
│   ├── [locale]/                 # Rutas localizadas (es/en)
│   │   ├── publicaciones/        # Blog (SSG)
│   │   ├── noticias/             # Noticias (SSG)
│   │   ├── casos-exito/          # Casos (SSG)
│   │   ├── negligencias-medicas/ # Servicios
│   │   ├── [ciudad]/             # 105 landings (SSG)
│   │   ├── (legal)/              # Páginas legales
│   │   ├── (marketing)/          # Institucionales
│   │   └── page.tsx              # Home
│   ├── admin/                    # Panel admin
│   └── api/                      # API Routes
│       └── webhook/rebuild/      # Webhook para auto-deploy
│
├── components/
│   ├── blog/PostsGrid.tsx        # Grid con filtros (client)
│   ├── layout/                   # Header, Footer
│   ├── home/                     # Secciones home
│   └── ui/                       # Componentes UI
│
├── messages/                     # Traducciones JSON
│   ├── es.json
│   └── en.json
│
├── config/site.ts                # Configuración del sitio
├── lib/routes.ts                 # Rutas traducidas
└── amplify.yml                   # Config AWS Amplify
```

---

## 🔧 Variables de Entorno

### Requeridas (AWS Amplify)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Opcionales
```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=sk-...              # Traducciones IA
GOOGLE_PLACES_API_KEY=...          # Hospitales
RESEND_API_KEY=re_...              # Emails
AMPLIFY_WEBHOOK_URL=...            # Auto-rebuild
WEBHOOK_SECRET=...                 # Seguridad webhook
```

---

## 📝 Scripts

```bash
npm run dev          # Desarrollo (PROHIBIDO en producción)
npm run build        # Build producción
npm run start        # Servidor producción
npm run lint         # Linter
npm run check:api    # Verificar conexiones API
npm run create-admin # Crear usuario admin
```

---

## 🚀 Deploy en AWS Amplify

1. Conectar repositorio GitHub
2. Configurar variables de entorno en Amplify Console
3. El build se ejecuta automáticamente con cada push a `main`

### Verificación de Build
El script `check:api` se ejecuta durante el build para verificar:
- ✅ Variables de entorno
- ✅ Conexión a Supabase
- ✅ Tablas accesibles (posts, categories, team, services)

---

## 📋 Flujo de Contenido

```
1. Crear artículo en Supabase (tabla posts)
2. Push a main O trigger webhook
3. AWS Amplify reconstruye el sitio
4. Nuevas páginas estáticas generadas
5. Contenido visible en producción
```

---

## 🐛 Troubleshooting

### Blog no muestra artículos
- Verificar `is_published = true` en Supabase
- Verificar variables de entorno en AWS Amplify
- Revisar logs del build en Amplify Console

### Traducciones no funcionan
- Verificar que existe la clave en `messages/es.json` y `messages/en.json`
- No duplicar claves en los archivos JSON
- Usar `serviceSlugMap` para servicios

### Menú móvil no se ve
- El z-index debe ser 9999 (ya corregido)

---

## 📄 Licencia

Proyecto privado. Todos los derechos reservados.

---

**Última actualización:** 3 Diciembre 2024 - Lanzamiento en producción www.gvcexpertos.com
