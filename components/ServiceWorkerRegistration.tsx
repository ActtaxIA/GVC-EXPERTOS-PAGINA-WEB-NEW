'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('SW registrado:', registration.scope)
          })
          .catch((error) => {
            console.error('Error registrando SW:', error)
          })
      })
    }
  }, [])

  return null
}
