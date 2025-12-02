// Este layout envuelve toda la aplicación
// El layout específico de locale está en app/[locale]/layout.tsx
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
