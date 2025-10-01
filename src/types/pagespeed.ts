export interface PageSpeedResult {
  lighthouseResult: {
    categories: {
      performance: {
        score: number
      }
    }
    audits: {
      [key: string]: {
        score?: number
        displayValue?: string
        details?: any
      }
    }
  }
  loadingExperience?: {
    metrics: {
      [key: string]: {
        percentile: number
        category: string
      }
    }
  }
}

