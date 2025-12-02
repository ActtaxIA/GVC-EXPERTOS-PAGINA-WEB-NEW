const withNextIntl = require('next-intl/plugin')(
  // Ruta correcta al archivo de configuración i18n
  './i18n/request.ts'
)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Excluir carpeta scripts del build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/scripts/**', '**/node_modules/**'],
    }
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Powered by header deshabilitado por seguridad
  poweredByHeader: false,
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Previene MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Previene clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Protección XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Control de referrer
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Política de permisos
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
          // DNS Prefetch
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // Cache para assets estáticos
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para fuentes
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Service Worker
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
    ]
  },

  // Rewrites para URLs traducidas en inglés
  async rewrites() {
    // Mapeo de slugs de servicios en inglés a español
    const serviceSlugMap = {
      'surgical-errors': 'errores-quirurgicos',
      'diagnostic-errors': 'errores-diagnostico',
      'hospital-negligence': 'negligencia-hospitalaria',
      'obstetric-negligence': 'negligencia-obstetrica',
      'medication-errors': 'errores-medicacion',
      'informed-consent': 'consentimiento-informado',
    }

    const serviceRewrites = Object.entries(serviceSlugMap).map(([enSlug, esSlug]) => ({
      source: `/en/medical-negligence/${enSlug}`,
      destination: `/en/negligencias-medicas/${esSlug}`,
    }))

    return [
      // Mapear rutas en inglés a sus equivalentes en español
      {
        source: '/en/about-us',
        destination: '/en/sobre-nosotros',
      },
      {
        source: '/en/team',
        destination: '/en/equipo',
      },
      {
        source: '/en/contact',
        destination: '/en/contacto',
      },
      {
        source: '/en/faq',
        destination: '/en/preguntas-frecuentes',
      },
      {
        source: '/en/medical-negligence',
        destination: '/en/negligencias-medicas',
      },
      {
        source: '/en/legal-notice',
        destination: '/en/aviso-legal',
      },
      {
        source: '/en/privacy-policy',
        destination: '/en/politica-privacidad',
      },
      {
        source: '/en/cookie-policy',
        destination: '/en/politica-cookies',
      },
      // Rewrites para servicios individuales
      ...serviceRewrites,
    ]
  },

  // Redirecciones
  async redirects() {
    return [
      // Redirección de www a non-www (configurar en Vercel)
      // Redirecciones de URLs antiguas si las hubiera
      {
        source: '/servicios/:slug',
        destination: '/negligencias-medicas/:slug',
        permanent: true,
      },
      {
        source: '/blog/categoria/:slug',
        destination: '/blog',
        permanent: true,
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
