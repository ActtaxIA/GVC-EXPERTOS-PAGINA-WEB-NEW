// Layout raíz REQUERIDO por Next.js App Router
// DEBE tener <html> y <body>
import './globals.css'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

