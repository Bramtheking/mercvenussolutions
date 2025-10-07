export interface Room {
  id: string
  title: string
  price: string
  period: string
  image: string
  images?: string[] // Multiple images support
  location: string
  features: string[]
  amenities: {
    bed: number
    bath: number
    occupancy: number
  }
  description: string
  directions: string
  phone: string
  email: string
  available: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  price?: string
  features: string[]
  popular?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface HeroContent {
  id: string
  title: string
  subtitle: string
  highlightText: string
  description: string
  updatedAt: Date
}

export interface ContactInfo {
  id: string
  phone: string
  email: string
  location: string
  updatedAt: Date
}

export interface SiteSettings {
  id: string
  siteName: string
  tagline: string
  contactPhone: string
  contactEmail: string
  contactLocation: string
  updatedAt: Date
}
