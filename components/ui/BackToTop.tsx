'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Mostrar el botón cuando el usuario ha hecho scroll más de 300px
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-gold text-white rounded-full shadow-lg hover:bg-gold/90 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
          aria-label="Volver arriba"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </>
  )
}
