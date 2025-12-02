import Link from 'next/link'
import { 
  FileText, 
  Building2, 
  MapPin, 
  MessageSquare,
  TrendingUp,
  Eye,
  Mail,
  Clock
} from 'lucide-react'
import { getSession } from '@/lib/auth'

// Datos de ejemplo (en producción vendrían de Supabase)
const stats = [
  { name: 'Contactos sin leer', value: '12', icon: Mail, color: 'bg-red-500' },
  { name: 'Posts publicados', value: '24', icon: FileText, color: 'bg-blue-500' },
  { name: 'Hospitales', value: '156', icon: Building2, color: 'bg-green-500' },
  { name: 'Ciudades activas', value: '54', icon: MapPin, color: 'bg-purple-500' },
]

const recentContacts = [
  { id: 1, name: 'María García', city: 'Madrid', date: 'Hace 2 horas', read: false },
  { id: 2, name: 'Juan Rodríguez', city: 'Barcelona', date: 'Hace 5 horas', read: false },
  { id: 3, name: 'Ana Martínez', city: 'Valencia', date: 'Hace 1 día', read: true },
  { id: 4, name: 'Pedro López', city: 'Sevilla', date: 'Hace 2 días', read: true },
]

const quickActions = [
  { name: 'Nuevo artículo', href: '/admin/blog/nuevo', icon: FileText },
  { name: 'Buscar hospitales', href: '/admin/hospitales', icon: Building2 },
  { name: 'Ver contactos', href: '/admin/contactos', icon: MessageSquare },
]

export default async function AdminDashboard() {
  const session = await getSession()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal">
          Bienvenido, {session?.name || 'Admin'}
        </h1>
        <p className="text-gray-600">
          Panel de administración de GVC Expertos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4"
          >
            <div className={`${stat.color} p-3 rounded-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-charcoal">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contacts */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-charcoal flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" />
              Contactos recientes
            </h2>
          </div>
          <div className="divide-y">
            {recentContacts.map((contact) => (
              <Link
                key={contact.id}
                href={`/admin/contactos/${contact.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {!contact.read && (
                    <span className="w-2 h-2 bg-gold rounded-full" />
                  )}
                  <div>
                    <p className={`font-medium ${!contact.read ? 'text-charcoal' : 'text-gray-600'}`}>
                      {contact.name}
                    </p>
                    <p className="text-sm text-gray-500">{contact.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  {contact.date}
                </div>
              </Link>
            ))}
          </div>
          <div className="p-4 border-t">
            <Link
              href="/admin/contactos"
              className="text-gold hover:text-gold-dark text-sm font-medium"
            >
              Ver todos los contactos →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-charcoal">
              Acciones rápidas
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gold/10 transition-colors group"
              >
                <action.icon className="w-5 h-5 text-gray-400 group-hover:text-gold" />
                <span className="font-medium text-charcoal">{action.name}</span>
              </Link>
            ))}
          </div>

          {/* Info */}
          <div className="p-4 border-t">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Añade hospitales a cada ciudad para mejorar 
                el SEO local de las landings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
