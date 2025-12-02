'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function GallerySection() {
  const t = useTranslations('home.gallery')
  
  const galleryImages = [
    {
      src: '/images/abogados_negligencias_medicas_negligencia_hospital.jpg',
      altKey: 'image1',
    },
    {
      src: '/images/abogados_negligencias_medicas_negligencia_2.jpg',
      altKey: 'image2',
    },
    {
      src: '/images/abogados_negligencias_medicas_negligencia_3.jpg',
      altKey: 'image3',
    },
  ]
  return (
    <section className="py-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative aspect-[4/3] overflow-hidden group">
            <Image
              src={image.src}
              alt={t(image.altKey)}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  )
}
