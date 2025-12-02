'use client'

import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Building2,
  Calendar,
  Loader2,
} from 'lucide-react'

interface Stats {
  totalContacts: number
  contactsThisMonth: number
  contactsLastMonth: number
  totalPosts: number
  publishedPosts: number
  totalHospitals: number
  totalCities: number
  contactsByMonth: { month: string; count: number }[]
  contactsByService: { name: string; count: number }[]
  contactsByCity: { city: string; count: number }[]
}

const COLORS = ['#b8860b', '#1a1a1a', '#4a4a4a', '#7a7a7a', '#aaaaaa']

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="p-8 text-center text-gray-500">
        Error cargando estadísticas
      </div>
    )
  }

  const growthPercent = stats.contactsLastMonth > 0
    ? Math.round(((stats.contactsThisMonth - stats.contactsLastMonth) / stats.contactsLastMonth) * 100)
    : 0

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal flex items-center gap-2">
          <TrendingUp className="w-7 h-7 text-gold" />
          Analytics
        </h1>
        <p className="text-gray-600 mt-1">
          Estadísticas y métricas del sitio
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Contactos totales</p>
              <p className="text-3xl font-bold text-charcoal">{stats.totalContacts}</p>
            </div>
            <div className="p-3 bg-gold/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
          </div>
          <p className={`text-sm mt-2 ${growthPercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growthPercent >= 0 ? '+' : ''}{growthPercent}% vs mes anterior
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Este mes</p>
              <p className="text-3xl font-bold text-charcoal">{stats.contactsThisMonth}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Posts publicados</p>
              <p className="text-3xl font-bold text-charcoal">{stats.publishedPosts}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            de {stats.totalPosts} totales
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Hospitales</p>
              <p className="text-3xl font-bold text-charcoal">{stats.totalHospitals}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            en {stats.totalCities} ciudades
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Contacts by Month */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-charcoal mb-4">
            Contactos por mes
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.contactsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#b8860b"
                  strokeWidth={2}
                  dot={{ fill: '#b8860b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contacts by Service */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-semibold text-charcoal mb-4">
            Contactos por servicio
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.contactsByService}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {stats.contactsByService.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Cities */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-semibold text-charcoal mb-4">
          Top ciudades por contactos
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.contactsByCity.slice(0, 10)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis type="number" stroke="#666" fontSize={12} />
              <YAxis dataKey="city" type="category" stroke="#666" fontSize={12} width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#b8860b" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
