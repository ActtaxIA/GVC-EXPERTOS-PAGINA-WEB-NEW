import Image from 'next/image'

const galleryImages = [
  {
    src: '/images/abogados_negligencias_medicas_negligencia_hospital.jpg',
    alt: 'Negligencia hospitalaria',
  },
  {
    src: '/images/abogados_negligencias_medicas_negligencia_2.jpg',
    alt: 'Abogados negligencias médicas',
  },
  {
    src: '/images/abogados_negligencias_medicas_negligencia_3.jpg',
    alt: 'Reclamación negligencia médica',
  },
]

export function GallerySection() {
  return (
    <section className="py-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {galleryImages.map((image, index) => (
          <div key={index} className="relative aspect-[4/3] overflow-hidden group">
            <Image
              src={image.src}
              alt={image.alt}
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
