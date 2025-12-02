export interface NavLink {
  label: string
  href: string
  children?: NavLink[]
}

export interface StatItem {
  value: string
  label: string
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ServiceCard {
  slug: string
  title: string
  shortDescription: string
  icon: string
}

export interface TeamMemberCard {
  slug: string
  name: string
  position: string
  image: string
}

export interface TestimonialCard {
  name: string
  city: string
  content: string
  rating: number
}

export interface FAQItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface SEOProps {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    images?: string[]
    type?: string
  }
  noIndex?: boolean
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  city?: string
  service?: string
  message: string
  privacy: boolean
}

export interface LeadFormData {
  name: string
  phone: string
  email: string
  privacy: boolean
}
