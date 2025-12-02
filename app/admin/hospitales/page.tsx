'use client'

import { useState, useEffect } from 'react'
import { 
  Search, 
  Building2, 
  MapPin, 
  Star, 
  Phone, 
  Globe, 
  Plus,
  Trash2,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { cities } from '@/config/site'

interface Hospital {
  id?: string
  google_place_id: string
  name: string
  address: string
  latitude: number
  longitude: number
  rating: number | null
  total_ratings: number
  types: string[]
  is_public: boolean
  phone?: string
  website?: string
}

export default function HospitalesPage() {
  const [selectedCity, setSelectedCity] = useState('')
  const [searchResults, setSearchResults] = useState<Hospital[]>([])
  const [savedHospitals, setSavedHospitals] = useState<Hospital[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  // Cargar hospitales guardados
  useEffect(() => {
    loadSavedHospitals()
  }, [])

  const loadSavedHospitals = async () => {
    try {
      const response = await fetch('/api/admin/hospitals')
      const data = await response.json()
      if (data.success) {
        setSavedHospitals(data.hospitals)
      }
    } catch (error) {
      console.error('Error cargando hospitales:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!selectedCity) {
      setMessage({ type: 'error', text: 'Selecciona una ciudad' })
      return
    }

    setIsSearching(true)
    setMessage(null)
    setSearchResults([])

    try {
      const citySlug = selectedCity.replace('abogados-negligencias-medicas-', '')
      const response = await fetch(`/api/admin/hospitals?action=search&city=${citySlug}`)
      const data = await response.json()

      if (data.success) {
        // Filtrar los que ya están guardados
        const savedIds = new Set(savedHospitals.map(h => h.google_place_id))
        const newResults = data.hospitals.filter(
          (h: Hospital) => !savedIds.has(h.google_place_id)
        )
        setSearchResults(newResults)
        
        if (newResults.length === 0) {
          setMessage({ type: 'success', text: 'No se encontraron hospitales nuevos para esta ciudad' })
        } else {
          setMessage({ type: 'success', text: `Se encontraron ${newResults.length} hospitales` })
        }
      } else {
        setMessage({ type: 'error', text: data.message })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al buscar hospitales' })
    } finally {
      setIsSearching(false)
    }
  }

  const handleSaveHospital = async (hospital: Hospital) => {
    setSavingId(hospital.google_place_id)
    setMessage(null)

    const city = cities.find(c => c.slug === selectedCity)

    try {
      const response = await fetch('/api/admin/hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          google_place_id: hospital.google_place_id,
          city_name: city?.name || null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSavedHospitals(prev => [...prev, data.hospital])
        setSearchResults(prev => prev.filter(h => h.google_place_id !== hospital.google_place_id))
        setMessage({ type: 'success', text: `${hospital.name} guardado correctamente` })
      } else {
        setMessage({ type: 'error', text: data.message })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al guardar hospital' })
    } finally {
      setSavingId(null)
    }
  }

  const handleDeleteHospital = async (id: string) => {
    if (!confirm('¿Eliminar este hospital?')) return

    try {
      const response = await fetch(`/api/admin/hospitals?id=${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        setSavedHospitals(prev => prev.filter(h => h.id !== id))
        setMessage({ type: 'success', text: 'Hospital eliminado' })
      } else {
        setMessage({ type: 'error', text: data.message })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al eliminar hospital' })
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal flex items-center gap-2">
          <Building2 className="w-7 h-7 text-gold" />
          Gestión de Hospitales
        </h1>
        <p className="text-gray-600 mt-1">
          Busca y añade hospitales de Google Places para las landings locales
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Buscar hospitales en Google Places
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
            >
              <option value="">Selecciona una ciudad...</option>
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {city.name} ({city.community})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleSearch}
            disabled={isSearching || !selectedCity}
            className="px-6 py-3 bg-gold hover:bg-gold-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            {isSearching ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-700'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            {message.text}
          </div>
        )}
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-charcoal mb-4">
            Resultados de búsqueda ({searchResults.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((hospital) => (
              <div
                key={hospital.google_place_id}
                className="border rounded-lg p-4 hover:border-gold transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-charcoal">{hospital.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    hospital.is_public 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {hospital.is_public ? 'Público' : 'Privado'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                  <MapPin className="w-4 h-4" />
                  {hospital.address}
                </p>
                
                {hospital.rating && (
                  <p className="text-sm text-gray-600 flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-500" />
                    {hospital.rating} ({hospital.total_ratings} reseñas)
                  </p>
                )}

                <button
                  onClick={() => handleSaveHospital(hospital)}
                  disabled={savingId === hospital.google_place_id}
                  className="w-full px-4 py-2 bg-gold/10 hover:bg-gold hover:text-white text-gold font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {savingId === hospital.google_place_id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  Añadir
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Saved Hospitals */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-charcoal mb-4">
          Hospitales guardados ({savedHospitals.length})
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : savedHospitals.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No hay hospitales guardados</p>
            <p className="text-sm">Busca una ciudad para añadir hospitales</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Nombre</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Ciudad</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Tipo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rating</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {savedHospitals.map((hospital) => (
                  <tr key={hospital.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-charcoal">{hospital.name}</p>
                        <p className="text-xs text-gray-500 truncate max-w-xs">{hospital.address}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {(hospital as any).city_name || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        hospital.is_public 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {hospital.is_public ? 'Público' : 'Privado'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {hospital.rating ? (
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {hospital.rating}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteHospital(hospital.id!)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
