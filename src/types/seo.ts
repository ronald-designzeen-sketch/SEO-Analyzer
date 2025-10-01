export interface SEOAuditResult {
  url: string
  timestamp: string
  performance: {
    desktop: number
    mobile: number
  }
  seo: {
    titleLength: number
    hasMetaDescription: boolean
    h1Count: number
    hasSSL: boolean
    isMobileFriendly: boolean
    totalImages: number
    imagesWithAlt: number
    backlinks: number
    referringDomains: number
  }
  recommendations: Recommendation[]
}

export interface Recommendation {
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

export interface LeadData {
  name: string
  email: string
  website?: string
  message: string
  timestamp: string
}

