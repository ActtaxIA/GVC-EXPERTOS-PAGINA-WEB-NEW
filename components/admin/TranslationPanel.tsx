'use client'

import { useState } from 'react'
import { TranslateButton } from './TranslateButton'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TranslationPanelProps {
  titleEs: string
  titleEn: string
  excerptEs: string
  excerptEn: string
  contentEs: string
  contentEn: string
  metaTitleEn: string
  metaDescriptionEn: string
  onTitleEnChange: (value: string) => void
  onExcerptEnChange: (value: string) => void
  onContentEnChange: (value: string) => void
  onMetaTitleEnChange: (value: string) => void
  onMetaDescriptionEnChange: (value: string) => void
}

export function TranslationPanel({
  titleEs,
  titleEn,
  excerptEs,
  excerptEn,
  contentEs,
  contentEn,
  metaTitleEn,
  metaDescriptionEn,
  onTitleEnChange,
  onExcerptEnChange,
  onContentEnChange,
  onMetaTitleEnChange,
  onMetaDescriptionEnChange,
}: TranslationPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">EN</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Traducción al Inglés
            </h3>
            <p className="text-sm text-gray-600">
              Traduce el contenido automáticamente con IA
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="space-y-6 border-t border-blue-200 pt-6">
          {/* Title EN */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Título (English)
              </label>
              <TranslateButton
                content={titleEs}
                contentType="title"
                onTranslated={onTitleEnChange}
                from="es"
                to="en"
              />
            </div>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => onTitleEnChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Title in English"
            />
          </div>

          {/* Excerpt EN */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Extracto (English)
              </label>
              <TranslateButton
                content={excerptEs}
                contentType="excerpt"
                onTranslated={onExcerptEnChange}
                from="es"
                to="en"
              />
            </div>
            <textarea
              value={excerptEn}
              onChange={(e) => onExcerptEnChange(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Excerpt in English"
            />
          </div>

          {/* Content EN */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Contenido (English)
              </label>
              <TranslateButton
                content={contentEs}
                contentType="content"
                onTranslated={onContentEnChange}
                from="es"
                to="en"
                label="Traducir Contenido → EN"
              />
            </div>
            <textarea
              value={contentEn}
              onChange={(e) => onContentEnChange(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Content in English (HTML supported)"
            />
            <p className="mt-1 text-xs text-gray-500">
              Soporta HTML. La traducción preservará las etiquetas HTML.
            </p>
          </div>

          {/* Meta Title EN */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Meta Título SEO (English)
              </label>
              <TranslateButton
                content={titleEs}
                contentType="meta_description"
                onTranslated={onMetaTitleEnChange}
                from="es"
                to="en"
              />
            </div>
            <input
              type="text"
              value={metaTitleEn}
              onChange={(e) => onMetaTitleEnChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO Meta Title in English"
            />
          </div>

          {/* Meta Description EN */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Meta Descripción SEO (English)
              </label>
              <TranslateButton
                content={excerptEs}
                contentType="meta_description"
                onTranslated={onMetaDescriptionEnChange}
                from="es"
                to="en"
              />
            </div>
            <textarea
              value={metaDescriptionEn}
              onChange={(e) => onMetaDescriptionEnChange(e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO Meta Description in English (max 160 characters)"
              maxLength={160}
            />
            <p className="mt-1 text-xs text-gray-500">
              {metaDescriptionEn.length}/160 caracteres
            </p>
          </div>

          {/* Translate All Button */}
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
            <p className="text-sm text-gray-700 mb-3">
              <strong>💡 Consejo:</strong> Puedes traducir cada campo
              individualmente o revisar las traducciones antes de guardar.
            </p>
            <p className="text-xs text-gray-600">
              Las traducciones son generadas por IA y pueden requerir ajustes.
              Siempre revisa el contenido traducido antes de publicar.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


