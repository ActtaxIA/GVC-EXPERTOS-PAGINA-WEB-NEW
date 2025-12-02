'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

interface ContactFormProps {
  services: { slug: string; title: string }[]
}

export function ContactForm({ services }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      message: formData.get('message') as string,
      privacy: formData.get('privacy') === 'on',
    }

    // Validación básica
    const newErrors: Record<string, string> = {}
    if (!data.name) newErrors.name = 'El nombre es obligatorio'
    if (!data.email) newErrors.email = 'El email es obligatorio'
    if (!data.phone) newErrors.phone = 'El teléfono es obligatorio'
    if (!data.message) newErrors.message = 'Describe tu caso brevemente'
    if (!data.privacy) newErrors.privacy = 'Debes aceptar la política de privacidad'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    try {
      // Simular envío (reemplazar con llamada real a /api/contact)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch (error) {
      setErrors({ submit: 'Error al enviar el formulario. Inténtalo de nuevo.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
          ¡Mensaje enviado!
        </h3>
        <p className="text-gray-600 mb-6">
          Hemos recibido tu consulta. Un abogado de nuestro equipo se pondrá en
          contacto contigo en las próximas 24 horas.
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          Enviar otra consulta
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="name"
          label="Nombre completo *"
          placeholder="Tu nombre"
          error={errors.name}
        />
        <Input
          name="email"
          type="email"
          label="Email *"
          placeholder="tu@email.com"
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="phone"
          type="tel"
          label="Teléfono *"
          placeholder="600 000 000"
          error={errors.phone}
        />
        <Select
          name="service"
          label="Tipo de negligencia"
          placeholder="Selecciona una opción"
          options={[
            { value: '', label: 'Selecciona una opción' },
            ...services.map((s) => ({ value: s.slug, label: s.title })),
            { value: 'otro', label: 'Otro / No estoy seguro' },
          ]}
        />
      </div>

      <Textarea
        name="message"
        label="Describe tu caso *"
        placeholder="Cuéntanos brevemente qué ha ocurrido..."
        rows={5}
        error={errors.message}
      />

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          name="privacy"
          className="mt-1 w-4 h-4 text-gold border-gray-300 rounded focus:ring-gold"
        />
        <label htmlFor="privacy" className="text-sm text-gray-600">
          He leído y acepto la{' '}
          <Link href="/politica-privacidad" className="text-gold hover:underline">
            política de privacidad
          </Link>{' '}
          y el tratamiento de mis datos para gestionar mi consulta. *
        </label>
      </div>
      {errors.privacy && (
        <p className="text-sm text-red-500 -mt-4">{errors.privacy}</p>
      )}

      {errors.submit && (
        <p className="text-sm text-red-500 text-center">{errors.submit}</p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar Consulta Gratuita'
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        🔒 Tus datos están protegidos y tratados con total confidencialidad
      </p>
    </form>
  )
}
