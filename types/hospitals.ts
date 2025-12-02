// Tipos base para hospitales (temporales hasta regenerar types/database.ts)
export interface Hospital {
  id: string
  google_place_id?: string | null
  name: string
  address?: string | null
  city?: string | null
  province?: string | null
  postal_code?: string | null
  coordinates?: any
  phone?: string | null
  website?: string | null
  rating?: number | null
  total_reviews?: number | null
  google_maps_url?: string | null
  photo_url?: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type HospitalInsert = Omit<Hospital, 'id' | 'created_at' | 'updated_at'>
export type HospitalUpdate = Partial<HospitalInsert>

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
