import { Database } from './database'

// Tipos base de Supabase
export type Hospital = Database['public']['Tables']['hospitals']['Row']
export type HospitalInsert = Database['public']['Tables']['hospitals']['Insert']
export type HospitalUpdate = Database['public']['Tables']['hospitals']['Update']

export type CityContent = Database['public']['Tables']['city_content']['Row']
export type ServiceContent = Database['public']['Tables']['service_content']['Row']
export type AdminUser = Database['public']['Tables']['admin_users']['Row']

// Tipos extendidos para hospitales
export interface HospitalWithDistance extends Hospital {
  distance?: number // km desde el centro de la ciudad
}

export interface GooglePlaceResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  rating?: number
  user_ratings_total?: number
  types?: string[]
  formatted_phone_number?: string
  website?: string
  opening_hours?: {
    weekday_text?: string[]
    open_now?: boolean
  }
  photos?: {
    photo_reference: string
  }[]
}

export interface GooglePlacesSearchResponse {
  results: GooglePlaceResult[]
  status: string
  next_page_token?: string
}

export interface GooglePlaceDetailsResponse {
  result: GooglePlaceResult
  status: string
}

// Tipos para el contenido dinámico
export interface CityStatistics {
  population?: number
  hospitals_count?: number
  health_centers_count?: number
  annual_complaints?: number
  success_rate?: number
}

export interface CityLegalInfo {
  court_name?: string
  court_address?: string
  health_authority?: string
  ombudsman_office?: string
}

// Tipos para el admin
export interface AdminSession {
  userId: string
  email: string
  name: string
  role: string
  expiresAt: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AdminStats {
  totalContacts: number
  unreadContacts: number
  totalPosts: number
  publishedPosts: number
  totalHospitals: number
  totalCities: number
}
