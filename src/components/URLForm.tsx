'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

const urlSchema = z.object({
  url: z.string()
    .min(1, 'Please enter a URL or domain name')
    .transform((val) => {
      // Clean up the input
      let cleanUrl = val.trim().toLowerCase()
      
      // Remove common prefixes that users might add
      cleanUrl = cleanUrl.replace(/^(https?:\/\/)?(www\.)?/, '')
      
      // Remove trailing slashes and paths for domain-only input
      cleanUrl = cleanUrl.split('/')[0]
      
      // Add https:// prefix
      return `https://${cleanUrl}`
    })
    .refine((url) => {
      try {
        const parsed = new URL(url)
        // Check if it's a valid domain format
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
    }, 'Please enter a valid domain name or URL (e.g., example.com)')
})

type URLFormData = z.infer<typeof urlSchema>

export default function URLForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<URLFormData>({
    resolver: zodResolver(urlSchema),
  })

  const onSubmit = async (data: URLFormData) => {
    setIsLoading(true)
    
    try {
      // The URL is already processed by the Zod transform
      const url = data.url
      
      // Navigate to results page with URL as query parameter
      const encodedUrl = encodeURIComponent(url)
      router.push(`/results?url=${encodedUrl}`)
    } catch (error) {
      console.error('Error processing URL:', error)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            {...register('url')}
            type="text"
            placeholder="Enter your website URL or domain (e.g., example.com, https://example.com)"
            className={`input-field ${errors.url ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            disabled={isLoading}
          />
          {errors.url && (
            <p className="mt-2 text-sm text-red-600">{errors.url.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </span>
          ) : (
            'Analyze SEO'
          )}
        </button>
      </div>
      
      <p className="text-sm text-gray-500 text-center">
        ✓ Free analysis • ✓ No signup required • ✓ Instant results
      </p>
    </form>
  )
}
