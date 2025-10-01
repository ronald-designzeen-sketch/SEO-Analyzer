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
    backlinks: BacklinkData
    domainAuthority: DomainAuthorityData
  }
  recommendations: Recommendation[]
}

export interface BacklinkData {
  totalBacklinks: number
  referringDomains: number
  doFollowBacklinks: number
  noFollowBacklinks: number
  newBacklinks: number // Last 30 days
  lostBacklinks: number // Last 30 days
  topReferringDomains: string[]
}

export interface DomainAuthorityData {
  domainRating: number // 0-100 (Ahrefs style)
  domainAuthority: number // 0-100 (Moz style)
  trustFlow: number // 0-100 (Majestic style)
  citationFlow: number // 0-100 (Majestic style)
  organicTraffic: number
  organicKeywords: number
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
