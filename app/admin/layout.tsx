import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  MapPin, 
  MessageSquare, 
  Settings,
  LogOut,
  Newspaper,
  Award,
  TrendingUp
} from 'lucide-react'
import { getSession } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect('/admin/login')
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
    { name: 'Noticias', href: '/admin/noticias', icon: Newspaper },
    { name: 'Casos de Éxito', href: '/admin/casos', icon: Award },
    { name: 'Hospitales', href: '/admin/hospitales', icon: Building2 },
    { name: 'Contactos', href: '/admin/contactos', icon: MessageSquare },
    { name: 'Configuración', href: '/admin/configuracion', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-charcoal text-white">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-gold text-xl font-serif font-bold">GVC</span>
            <span className="text-sm text-gray-400">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors group"
            >
              <item.icon className="w-5 h-5 text-gray-400 group-hover:text-gold" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Back to site */}
        <div className="px-4 mt-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-white/20 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white text-sm transition-colors"
          >
            Ver sitio web →
          </Link>
        </div>

        {/* User */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center text-charcoal font-semibold text-sm">
              {session.name?.charAt(0) || session.email.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session.name || session.email}
              </p>
              <p className="text-xs text-gray-400 truncate">{session.role}</p>
            </div>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-3 w-full px-4 py-2 text-gray-400 hover:text-red-400 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
