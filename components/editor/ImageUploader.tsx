'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string) => void
  bucket?: string
  folder?: string
  className?: string
}

export function ImageUploader({
  value,
  onChange,
  bucket = 'images',
  folder = 'uploads',
  className,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      // Validar tamaño (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo es demasiado grande (máx. 5MB)')
        return
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        setError('Solo se permiten imágenes')
        return
      }

      setIsUploading(true)
      setError(null)

      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('bucket', bucket)
        formData.append('folder', folder)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await response.json()

        if (data.success) {
          onChange(data.url)
        } else {
          setError(data.message || 'Error al subir imagen')
        }
      } catch (err) {
        setError('Error de conexión')
      } finally {
        setIsUploading(false)
      }
    },
    [bucket, folder, onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
    },
    maxFiles: 1,
    disabled: isUploading,
  })

  const removeImage = () => {
    onChange('')
  }

  return (
    <div className={className}>
      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs rounded">
            <CheckCircle className="w-3 h-3" />
            Imagen cargada
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-gold bg-gold/5'
              : 'border-gray-300 hover:border-gold',
            isUploading && 'pointer-events-none opacity-50'
          )}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <>
                <Loader2 className="w-10 h-10 text-gold animate-spin" />
                <p className="text-sm text-gray-600">Subiendo imagen...</p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400" />
                {isDragActive ? (
                  <p className="text-sm text-gold">Suelta la imagen aquí</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">
                      Arrastra una imagen o haz clic para seleccionar
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF, WebP (máx. 5MB)
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
}
