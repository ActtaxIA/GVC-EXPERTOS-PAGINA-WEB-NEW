import { GooglePlacesSearchResponse, GooglePlaceDetailsResponse, GooglePlaceResult } from '@/types/hospitals'

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY || ''
const BASE_URL = 'https://maps.googleapis.com/maps/api/place'

// Tipos de lugares a buscar para hospitales/centros sanitarios
const HOSPITAL_TYPES = ['hospital', 'doctor', 'health']

/**
 * Busca hospitales cerca de una ubicación
 */
export async function searchHospitalsNearby(
  latitude: number,
  longitude: number,
  radius: number = 20000, // 20km por defecto
  pageToken?: string
): Promise<GooglePlacesSearchResponse> {
  const params = new URLSearchParams({
    location: `${latitude},${longitude}`,
    radius: radius.toString(),
    type: 'hospital',
    key: GOOGLE_PLACES_API_KEY,
    language: 'es',
  })

  if (pageToken) {
    params.set('pagetoken', pageToken)
  }

  const response = await fetch(`${BASE_URL}/nearbysearch/json?${params}`)
  
  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Busca hospitales por texto (ciudad + hospital)
 */
export async function searchHospitalsByText(
  query: string,
  pageToken?: string
): Promise<GooglePlacesSearchResponse> {
  const params = new URLSearchParams({
    query: `hospitales ${query}`,
    type: 'hospital',
    key: GOOGLE_PLACES_API_KEY,
    language: 'es',
  })

  if (pageToken) {
    params.set('pagetoken', pageToken)
  }

  const response = await fetch(`${BASE_URL}/textsearch/json?${params}`)
  
  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Obtiene detalles de un lugar específico
 */
export async function getPlaceDetails(
  placeId: string
): Promise<GooglePlaceDetailsResponse> {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'place_id,name,formatted_address,geometry,rating,user_ratings_total,formatted_phone_number,website,opening_hours,types,photos',
    key: GOOGLE_PLACES_API_KEY,
    language: 'es',
  })

  const response = await fetch(`${BASE_URL}/details/json?${params}`)
  
  if (!response.ok) {
    throw new Error(`Google Places API error: ${response.status}`)
  }

  return response.json()
}

/**
 * Genera URL de foto de Google Places
 */
export function getPlacePhotoUrl(
  photoReference: string,
  maxWidth: number = 400
): string {
  return `${BASE_URL}/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${GOOGLE_PLACES_API_KEY}`
}

/**
 * Coordenadas de ciudades principales de España (105 ciudades)
 * Clave: nombre de ciudad en minúsculas normalizado
 */
export const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Galicia
  'a-coruna': { lat: 43.3623, lng: -8.4115 },
  'ferrol': { lat: 43.4833, lng: -8.2333 },
  'santiago-de-compostela': { lat: 42.8782, lng: -8.5448 },
  'orense': { lat: 42.3400, lng: -7.8648 },
  'pontevedra': { lat: 42.4310, lng: -8.6446 },
  'vigo': { lat: 42.2406, lng: -8.7207 },
  
  // Asturias
  'aviles': { lat: 43.5547, lng: -5.9248 },
  'gijon': { lat: 43.5453, lng: -5.6635 },
  'siero': { lat: 43.3892, lng: -5.6614 },
  
  // Cantabria
  'santander': { lat: 43.4623, lng: -3.8100 },
  'torrelavega': { lat: 43.3500, lng: -4.0500 },
  
  // País Vasco
  'donostia-san-sebastian': { lat: 43.3183, lng: -1.9812 },
  'irun': { lat: 43.3378, lng: -1.7888 },
  'vitoria': { lat: 42.8467, lng: -2.6716 },
  
  // Navarra
  'pamplona': { lat: 42.8125, lng: -1.6458 },
  
  // La Rioja
  'logrono': { lat: 42.4627, lng: -2.4449 },
  
  // Aragón
  'zaragoza': { lat: 41.6488, lng: -0.8891 },
  
  // Cataluña
  'barcelona': { lat: 41.3851, lng: 2.1734 },
  'granollers': { lat: 41.6083, lng: 2.2875 },
  'manresa': { lat: 41.7251, lng: 1.8265 },
  'mataro': { lat: 41.5400, lng: 2.4445 },
  'mollet-del-valles': { lat: 41.5403, lng: 2.2108 },
  'rubi': { lat: 41.4933, lng: 2.0328 },
  'sabadell': { lat: 41.5463, lng: 2.1086 },
  'villanueva-y-la-geltru': { lat: 41.2240, lng: 1.7256 },
  'lleida-lerida': { lat: 41.6176, lng: 0.6200 },
  'tarragona': { lat: 41.1189, lng: 1.2445 },
  
  // Comunidad Valenciana
  'alicante': { lat: 38.3452, lng: -0.4810 },
  'alcoy': { lat: 38.6985, lng: -0.4737 },
  'almoradi': { lat: 38.1089, lng: -0.7892 },
  'benidorm': { lat: 38.5410, lng: -0.1224 },
  'callosa-del-segura': { lat: 38.1247, lng: -0.8769 },
  'denia': { lat: 38.8408, lng: 0.1057 },
  'elda': { lat: 38.4779, lng: -0.7916 },
  'javea': { lat: 38.7836, lng: 0.1660 },
  'orihuela': { lat: 38.0849, lng: -0.9441 },
  'pilar-de-la-horadada': { lat: 37.8667, lng: -0.7833 },
  'torrevieja': { lat: 37.9786, lng: -0.6823 },
  'castellon': { lat: 39.9864, lng: -0.0513 },
  'valencia': { lat: 39.4699, lng: -0.3763 },
  'gandia': { lat: 38.9680, lng: -0.1815 },
  'paterna': { lat: 39.5028, lng: -0.4406 },
  'sagunto': { lat: 39.6800, lng: -0.2667 },
  'torrent': { lat: 39.4372, lng: -0.4653 },
  
  // Islas Baleares
  'ibiza': { lat: 38.9067, lng: 1.4206 },
  'palma-de-mallorca': { lat: 39.5696, lng: 2.6502 },
  
  // Canarias
  'las-palmas-de-gran-canaria': { lat: 28.1235, lng: -15.4363 },
  'arrecife': { lat: 28.9630, lng: -13.5477 },
  'telde': { lat: 27.9944, lng: -15.4167 },
  'tenerife': { lat: 28.4636, lng: -16.2518 },
  'arona': { lat: 28.0996, lng: -16.6810 },
  
  // Región de Murcia
  'murcia': { lat: 37.9922, lng: -1.1307 },
  'aguilas': { lat: 37.4067, lng: -1.5833 },
  'alcantarilla': { lat: 37.9694, lng: -1.2139 },
  'alhama-de-murcia': { lat: 37.8514, lng: -1.4258 },
  'cartagena': { lat: 37.6257, lng: -0.9966 },
  'cehegin': { lat: 38.0917, lng: -1.7975 },
  'cieza': { lat: 38.2392, lng: -1.4183 },
  'los-alcazares': { lat: 37.7433, lng: -0.8522 },
  'molina-de-segura': { lat: 38.0544, lng: -1.2072 },
  'san-javier': { lat: 37.8050, lng: -0.8372 },
  'yecla': { lat: 38.6133, lng: -1.1150 },
  
  // Comunidad de Madrid
  'madrid': { lat: 40.4168, lng: -3.7038 },
  'alcorcon': { lat: 40.3456, lng: -3.8248 },
  'aranjuez': { lat: 40.0333, lng: -3.6028 },
  'arganda-del-rey': { lat: 40.3000, lng: -3.4333 },
  'fuenlabrada': { lat: 40.2839, lng: -3.8000 },
  'las-rozas': { lat: 40.4928, lng: -3.8736 },
  'leganes': { lat: 40.3281, lng: -3.7644 },
  'mostoles': { lat: 40.3228, lng: -3.8650 },
  'parla': { lat: 40.2381, lng: -3.7675 },
  'pozuelo-de-alarcon': { lat: 40.4356, lng: -3.8136 },
  'san-sebastian-de-los-reyes': { lat: 40.5478, lng: -3.6267 },
  'valdemoro': { lat: 40.1908, lng: -3.6744 },
  
  // Castilla y León
  'burgos': { lat: 42.3439, lng: -3.6969 },
  'ponferrada': { lat: 42.5499, lng: -6.5962 },
  'salamanca': { lat: 40.9701, lng: -5.6635 },
  'segovia': { lat: 40.9429, lng: -4.1088 },
  'valladolid': { lat: 41.6523, lng: -4.7245 },
  'palencia': { lat: 42.0096, lng: -4.5288 },
  
  // Castilla-La Mancha
  'albacete': { lat: 38.9942, lng: -1.8585 },
  'hellin': { lat: 38.5167, lng: -1.7000 },
  'ciudad-real': { lat: 38.9848, lng: -3.9274 },
  'guadalajara': { lat: 40.6337, lng: -3.1674 },
  'toledo': { lat: 39.8628, lng: -4.0273 },
  'talavera-de-la-reina': { lat: 39.9633, lng: -4.8306 },
  
  // Extremadura
  'badajoz': { lat: 38.8794, lng: -6.9706 },
  'merida': { lat: 38.9161, lng: -6.3436 },
  'caceres': { lat: 39.4753, lng: -6.3724 },
  
  // Andalucía
  'sevilla': { lat: 37.3891, lng: -5.9845 },
  'alcala-de-guadaira': { lat: 37.3400, lng: -5.8392 },
  'utrera': { lat: 37.1833, lng: -5.7833 },
  'cadiz': { lat: 36.5271, lng: -6.2886 },
  'algeciras': { lat: 36.1275, lng: -5.4544 },
  'chiclana': { lat: 36.4194, lng: -6.1500 },
  'jerez-de-la-frontera': { lat: 36.6850, lng: -6.1261 },
  'puerto-de-santa-maria': { lat: 36.5931, lng: -6.2286 },
  'san-fernando': { lat: 36.4756, lng: -6.1989 },
  'cordoba': { lat: 37.8882, lng: -4.7794 },
  'granada': { lat: 37.1773, lng: -3.5986 },
  'jaen': { lat: 37.7796, lng: -3.7849 },
  'linares': { lat: 38.0911, lng: -3.6358 },
  'malaga': { lat: 36.7213, lng: -4.4214 },
  'fuengirola': { lat: 36.5400, lng: -4.6247 },
  'marbella': { lat: 36.5100, lng: -4.8825 },
  'torremolinos': { lat: 36.6214, lng: -4.4997 },
  'el-ejido': { lat: 36.7764, lng: -2.8147 },
}

/**
 * Obtiene las coordenadas de una ciudad por su slug
 */
export function getCityCoordinates(slug: string): { lat: number; lng: number } | null {
  // Extraer nombre de ciudad del slug completo
  const cityKey = slug.replace('abogados-negligencias-medicas-', '')
  return CITY_COORDINATES[cityKey] || null
}

/**
 * Calcula distancia entre dos coordenadas (fórmula Haversine)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}

/**
 * Formatea el tipo de hospital para mostrar
 */
export function formatHospitalType(types: string[]): string {
  const typeMap: Record<string, string> = {
    'hospital': 'Hospital',
    'doctor': 'Centro Médico',
    'health': 'Centro de Salud',
    'dentist': 'Clínica Dental',
    'physiotherapist': 'Fisioterapia',
    'pharmacy': 'Farmacia',
  }

  for (const type of types) {
    if (typeMap[type]) {
      return typeMap[type]
    }
  }

  return 'Centro Sanitario'
}

/**
 * Determina si es hospital público o privado (heurística básica)
 */
export function isPublicHospital(name: string): boolean {
  const publicKeywords = [
    'hospital universitario',
    'hospital general',
    'hospital clínico',
    'hospital de la',
    'hospital regional',
    'hospital virgen',
    'hospital san',
    'hospital santa',
    'hospital nuestra señora',
    'hospital gregorio marañón',
    'hospital la paz',
    'hospital 12 de octubre',
    'hospital ramón y cajal',
    'hospital vall d\'hebron',
    'hospital clinic',
    'hospital del mar',
    'hospital reina sofía',
    'hospital morales meseguer',
    'hospital arrixaca',
    'hospital santa lucía',
    'sergas',
    'sacyl',
    'osakidetza',
    'sermas',
    'sescam',
    'sms',
  ]

  const lowerName = name.toLowerCase()
  return publicKeywords.some(keyword => lowerName.includes(keyword))
}
