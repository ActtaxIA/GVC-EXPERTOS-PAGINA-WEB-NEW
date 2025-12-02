import './globals.css'
import type { ReactNode } from 'react'

// Layout raíz para rutas fuera de [locale] (como /admin)
// Las rutas localizadas (/es, /en) usan app/[locale]/layout.tsx
export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

