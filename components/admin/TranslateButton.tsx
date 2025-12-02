'use client'

import { useState } from 'react'
import { Languages, Loader2, CheckCircle2 } from 'lucide-react'

interface TranslateButtonProps {
  content: string
  contentType: 'title' | 'excerpt' | 'content' | 'meta_description' | 'default'
  onTranslated: (translation: string) => void
  from?: 'es' | 'en'
  to?: 'es' | 'en'
  label?: string
  className?: string
}

export function TranslateButton({
  content,
  contentType,
  onTranslated,
  from = 'es',
  to = 'en',
  label,
  className = '',
}: TranslateButtonProps) {
  const [isTranslating, setIsTranslating] = useState(false)
  const [translated, setTranslated] = useState(false)

  const handleTranslate = async () => {
    if (!content || !content.trim()) {
      alert('Por favor, añade contenido primero')
      return
    }

    setIsTranslating(true)
    setTranslated(false)

    try {
      const response = await fetch('/api/admin/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          from,
          to,
          contentType,
        }),
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data = await response.json()
      
      if (data.translation) {
        onTranslated(data.translation)
        setTranslated(true)
        setTimeout(() => setTranslated(false), 2000)
      }
    } catch (error) {
      console.error('Translation error:', error)
      alert('Error al traducir. Por favor, inténtalo de nuevo.')
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleTranslate}
      disabled={isTranslating || !content}
      className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium
        transition-all duration-200
        ${
          translated
            ? 'bg-green-600 text-white'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      title={`Traducir ${from === 'es' ? 'al inglés' : 'al español'} con IA`}
    >
      {isTranslating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Traduciendo...
        </>
      ) : translated ? (
        <>
          <CheckCircle2 className="w-4 h-4" />
          ¡Traducido!
        </>
      ) : (
        <>
          <Languages className="w-4 h-4" />
          {label || `Traducir ${to === 'en' ? '→ EN' : '→ ES'}`}
        </>
      )}
    </button>
  )
}

