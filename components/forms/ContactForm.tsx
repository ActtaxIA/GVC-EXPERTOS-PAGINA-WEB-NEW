'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Loader2, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { useTranslations } from 'next-intl'
import { LocalizedLink } from '@/components/ui/LocalizedLink'

interface ContactFormProps {
  services: { slug: string; title: string }[]
}

export function ContactForm({ services }: ContactFormProps) {
  const t = useTranslations('contact.form')
  const tCommon = useTranslations('common')
  const tServices = useTranslations('services')
  const tLegal = useTranslations('footer')
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
    if (!data.name) newErrors.name = t('nameRequired')
    if (!data.email) newErrors.email = t('emailRequired')
    if (!data.phone) newErrors.phone = t('phoneRequired')
    if (!data.message) newErrors.message = t('messageRequired')
    if (!data.privacy) newErrors.privacy = t('privacyRequired')

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
      setErrors({ submit: t('error') })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-serif font-bold text-charcoal mb-2">
          {t('successTitle')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('successMessage')}
        </p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>
          {t('sendAnother')}
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="name"
          label={`${t('name')} *`}
          placeholder={t('namePlaceholder')}
          error={errors.name}
        />
        <Input
          name="email"
          type="email"
          label={`${t('email')} *`}
          placeholder={t('emailPlaceholder')}
          error={errors.email}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          name="phone"
          type="tel"
          label={`${t('phone')} *`}
          placeholder={t('phonePlaceholder')}
          error={errors.phone}
        />
        <Select
          name="service"
          label={t('service')}
          placeholder={t('selectService')}
          options={[
            { value: '', label: t('selectService') },
            ...services.map((s) => {
              // Mapear slug a traducción
              const serviceSlugMap: Record<string, string> = {
                'errores-quirurgicos': 'surgical-errors',
                'errores-diagnostico': 'diagnostic-errors',
                'negligencia-hospitalaria': 'hospital-negligence',
                'negligencia-obstetrica': 'obstetric-negligence',
                'errores-medicacion': 'medication-errors',
                'consentimiento-informado': 'informed-consent',
              }
              const translationKey = serviceSlugMap[s.slug] || s.slug
              return { value: s.slug, label: tServices(`${translationKey}.title`) }
            }),
            { value: 'otro', label: t('otherService') },
          ]}
        />
      </div>

      <Textarea
        name="message"
        label={`${t('message')} *`}
        placeholder={t('messagePlaceholder')}
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
          {t('privacyText')}{' '}
          <LocalizedLink href="/politica-privacidad" className="text-gold hover:underline">
            {t('privacyLink')}
          </LocalizedLink>{' '}
          {t('privacyAnd')} *
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
            {t('sending')}
          </>
        ) : (
          t('submit')
        )}
      </Button>

      <p className="text-xs text-gray-500 text-center">
        {t('dataProtected')}
      </p>
    </form>
  )
}
