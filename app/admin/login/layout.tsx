import '../../globals.css'

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout independiente para login (sin sidebar)
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
