const CACHE_NAME = 'gvc-expertos-v1'

// Archivos a cachear
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
]

// Instalar service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activar y limpiar caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

// Estrategia: Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Ignorar peticiones que no sean GET
  if (event.request.method !== 'GET') return

  // Ignorar peticiones a APIs y admin
  const url = new URL(event.request.url)
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/admin')) {
    return
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clonar la respuesta para guardarla en cache
        const responseClone = response.clone()
        
        caches.open(CACHE_NAME).then((cache) => {
          // Solo cachear respuestas exitosas
          if (response.status === 200) {
            cache.put(event.request, responseClone)
          }
        })

        return response
      })
      .catch(() => {
        // Si falla la red, intentar desde cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse
          }
          
          // Si no hay cache y es una navegación, mostrar página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/offline')
          }

          return new Response('Offline', { status: 503 })
        })
      })
  )
})

// Notificaciones push (opcional, para futuro)
self.addEventListener('push', (event) => {
  if (!event.data) return

  const data = event.data.json()
  
  const options = {
    body: data.body,
    icon: '/images/icons/icon-192x192.png',
    badge: '/images/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
  }

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  )
})

// Click en notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  )
})
