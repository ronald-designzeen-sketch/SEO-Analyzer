/**
 * Utility functions for processing and validating URLs and domain names
 */

export function processUrl(input: string): string {
  // Clean up the input
  let cleanUrl = input.trim().toLowerCase()
  
  // Remove common prefixes that users might add
  cleanUrl = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, '')
  
  // Remove trailing slashes and paths for domain-only input
  cleanUrl = cleanUrl.split('/')[0]
  
  // Add https:// prefix
  return `https://${cleanUrl}`
}

export function isValidDomain(url: string): boolean {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname
    return (
      hostname.includes('.') && // Must have at least one dot
      hostname.length > 3 && // Minimum length
      !hostname.startsWith('.') && // Can't start with dot
      !hostname.endsWith('.') && // Can't end with dot
      /^[a-zA-Z0-9.-]+$/.test(hostname) // Only valid characters
    )
  } catch {
    return false
  }
}

/**
 * Examples of inputs that will be processed correctly:
 * 
 * Input: "example.com" → Output: "https://example.com"
 * Input: "www.example.com" → Output: "https://example.com"
 * Input: "https://example.com" → Output: "https://example.com"
 * Input: "http://www.example.com" → Output: "https://example.com"
 * Input: "example.com/page" → Output: "https://example.com"
 * Input: "subdomain.example.com" → Output: "https://subdomain.example.com"
 * Input: "EXAMPLE.COM" → Output: "https://example.com"
 * Input: "  example.com  " → Output: "https://example.com"
 */

