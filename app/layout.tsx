// Layout raíz requerido por Next.js
// Este layout solo se usa para páginas fuera de [locale] como /offline, /mantenimiento
// El layout principal con i18n está en app/[locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

