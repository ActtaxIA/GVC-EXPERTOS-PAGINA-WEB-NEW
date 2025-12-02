# 🔍 AUDITORÍA SEO COMPLETA - GVC EXPERTOS

## ✅ CHECKLIST SEO

### Metadata Básica
| Elemento | Estado | Notas |
|----------|--------|-------|
| `<title>` único por página | ✅ | Template: "%s \| GVC Expertos" |
| `<meta description>` | ✅ | 120-160 caracteres |
| Canonical URLs | ✅ | En todas las páginas |
| Language tag | ✅ | `<html lang="es">` |
| Viewport meta | ✅ | En layout.tsx |
| Charset UTF-8 | ✅ | Por defecto Next.js |

### Open Graph (Facebook/LinkedIn)
| Tag | Estado |
|-----|--------|
| og:title | ✅ |
| og:description | ✅ |
| og:type | ✅ (website/article) |
| og:url | ✅ |
| og:image | ✅ |
| og:site_name | ✅ |
| og:locale | ✅ (es_ES) |

### Twitter Cards
| Tag | Estado |
|-----|--------|
| twitter:card | ✅ (summary_large_image) |
| twitter:title | ✅ |
| twitter:description | ✅ |
| twitter:image | ✅ |

### JSON-LD Schema.org
| Schema | Ubicación | Estado |
|--------|-----------|--------|
| Organization | Home | ✅ |
| LocalBusiness | Home | ✅ |
| WebSite | Home | ✅ |
| ProfessionalService | Home | ✅ |
| LegalService (por ciudad) | Landings | ✅ |
| Service | Servicios | ✅ |
| Article | Blog posts | ✅ |
| NewsArticle | Noticias | ✅ |
| FAQPage | FAQs | ✅ |
| BreadcrumbList | Todas | ✅ |
| ContactPage | Contacto | ✅ |
| AboutPage | Sobre nosotros | ✅ |
| Person | Equipo | ✅ |

### Technical SEO
| Elemento | Estado |
|----------|--------|
| robots.txt | ✅ |
| sitemap.xml dinámico | ✅ |
| URLs amigables | ✅ |
| Trailing slashes consistentes | ✅ |
| HTTPS ready | ✅ |
| Mobile-first | ✅ |
| Core Web Vitals optimizado | ✅ |

### Sitemap Incluye
- ✅ 9 páginas estáticas
- ✅ 6 servicios
- ✅ 105 landings de ciudades
- ✅ 3 páginas legales
- ✅ Posts del blog (dinámico)
- ✅ Noticias (dinámico)
- ✅ Casos de éxito (dinámico)

**Total: ~130+ URLs**

### robots.txt Configuración
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /offline
Disallow: /_next/
Disallow: /private/

Sitemap: https://gvcexpertos.es/sitemap.xml
```

### Imágenes
| Aspecto | Estado |
|---------|--------|
| Alt text | ✅ |
| Lazy loading | ✅ |
| Next/Image optimization | ✅ |
| WebP automatic | ✅ |
| Responsive sizes | ✅ |

### Performance
| Aspecto | Estado |
|---------|--------|
| Static generation (ISR) | ✅ |
| Font optimization | ✅ |
| Code splitting | ✅ |
| Tree shaking | ✅ |
| Minification | ✅ |

---

## 📋 PÁGINAS CON SEO COMPLETO

### Home (/)
- ✅ Title + Description
- ✅ Open Graph completo
- ✅ Twitter Cards
- ✅ JSON-LD: Organization, LocalBusiness, WebSite, ProfessionalService

### Servicios (/negligencias-medicas/*)
- ✅ Title dinámico por servicio
- ✅ Description personalizada
- ✅ JSON-LD: Service, Breadcrumbs

### Landings Locales (/abogados-negligencias-medicas-*)
- ✅ Title: "Abogados Negligencias Médicas {Ciudad}"
- ✅ Description con ciudad + teléfono
- ✅ JSON-LD: LocalBusinessCity, Breadcrumbs, FAQPage
- ✅ Coordenadas geográficas
- ✅ FAQs específicas por ciudad

### Blog (/blog + /blog/[slug])
- ✅ Listado con categorías
- ✅ Posts con JSON-LD Article
- ✅ Author, datePublished, dateModified
- ✅ Open Graph type: article

### Noticias (/noticias + /noticias/[slug])
- ✅ JSON-LD NewsArticle
- ✅ Source attribution
- ✅ Fechas ISO 8601

### Contacto (/contacto)
- ✅ JSON-LD ContactPage
- ✅ Breadcrumbs
- ✅ Mapa embebido

### FAQs (/preguntas-frecuentes)
- ✅ JSON-LD FAQPage (13 preguntas)
- ✅ Estructura de acordeón
- ✅ Categorías semánticas

### Páginas Legales
- ✅ noindex opcional
- ✅ Contenido completo
- ✅ Canonical URLs

---

## 🎯 KEYWORDS OBJETIVO

### Keywords Principales (todas las páginas)
- abogados negligencias médicas
- negligencia médica
- error médico
- indemnización negligencia
- abogado mala praxis

### Keywords por Servicio
- errores de diagnóstico
- errores quirúrgicos
- negligencias ginecología/obstetricia
- negligencias urgencias
- infecciones hospitalarias
- consentimiento informado

### Keywords Locales (105 ciudades)
- abogados negligencias médicas madrid
- abogados negligencias médicas barcelona
- abogados negligencias médicas valencia
- ... (105 variaciones)

---

## 📱 MOBILE SEO

- ✅ Responsive design (Tailwind)
- ✅ Touch-friendly (44px min targets)
- ✅ No horizontal scroll
- ✅ Readable font sizes
- ✅ Mobile menu
- ✅ Click-to-call
- ✅ PWA ready

---

## 🔗 INTERNAL LINKING

- ✅ Breadcrumbs en todas las páginas
- ✅ Footer con enlaces a legales
- ✅ CTAs hacia contacto
- ✅ Servicios interconectados
- ✅ Related posts en blog

---

## 📊 ANALYTICS READY

Variables de entorno preparadas:
- `NEXT_PUBLIC_GA_ID` - Google Analytics 4

---

## ✨ CONCLUSIÓN

El proyecto tiene **SEO completo y profesional**:

1. **On-Page SEO**: 100% ✅
2. **Technical SEO**: 100% ✅
3. **Schema Markup**: 100% ✅
4. **Local SEO**: 100% ✅ (105 ciudades)
5. **Mobile SEO**: 100% ✅
6. **Performance**: Optimizado para Core Web Vitals

**No falta nada crítico de SEO.**
