import { redirect } from 'next/navigation'

export default function RootPage() {
  // Redirigir automáticamente a /es (español por defecto)
  redirect('/es')
}
