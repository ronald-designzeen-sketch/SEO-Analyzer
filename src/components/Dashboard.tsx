'use client'

import { useState } from 'react'
import { SEOAuditResult } from '@/types/seo'
import ScoreIndicator from './ScoreIndicator'

interface DashboardProps {
  auditResult: SEOAuditResult
}

export default function Dashboard({ auditResult }: DashboardProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)
    
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(auditResult),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `seo-audit-${new URL(auditResult.url).hostname}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            SEO Audit Results
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Analysis for: <span className="font-semibold text-primary-600">{auditResult.url}</span>
          </p>
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingPDF ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating PDF...
              </span>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Report
              </>
            )}
          </button>
        </div>

        {/* Performance Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Scores</h2>
            <div className="space-y-6">
              <ScoreIndicator
                label="Desktop Performance"
                score={auditResult.performance.desktop}
                description="Page load speed on desktop devices"
              />
              <ScoreIndicator
                label="Mobile Performance"
                score={auditResult.performance.mobile}
                description="Page load speed on mobile devices"
              />
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Technical SEO</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">SSL Certificate</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auditResult.seo.hasSSL ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {auditResult.seo.hasSSL ? 'Secure' : 'Not Secure'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Mobile Friendly</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auditResult.seo.isMobileFriendly ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {auditResult.seo.isMobileFriendly ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Page Title</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auditResult.seo.titleLength >= 30 && auditResult.seo.titleLength <= 60 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {auditResult.seo.titleLength} chars
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Meta Description</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auditResult.seo.hasMetaDescription ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {auditResult.seo.hasMetaDescription ? 'Present' : 'Missing'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Content Analysis</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">H1 Tags</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auditResult.seo.h1Count === 1 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {auditResult.seo.h1Count} found
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Images with Alt Text</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auditResult.seo.imagesWithAlt > auditResult.seo.totalImages * 0.8 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {auditResult.seo.imagesWithAlt}/{auditResult.seo.totalImages}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Link Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Total Backlinks</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {auditResult.seo.backlinks.totalBacklinks.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Referring Domains</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {auditResult.seo.backlinks.referringDomains.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">DoFollow Links</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {auditResult.seo.backlinks.doFollowBacklinks.toLocaleString()} ({Math.round((auditResult.seo.backlinks.doFollowBacklinks / auditResult.seo.backlinks.totalBacklinks) * 100)}%)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">New Links (30d)</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  auditResult.seo.backlinks.newBacklinks > auditResult.seo.backlinks.lostBacklinks 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  +{auditResult.seo.backlinks.newBacklinks.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Authority & Traffic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Domain Authority</h2>
            <div className="space-y-6">
              <ScoreIndicator
                label="Domain Rating"
                score={auditResult.seo.domainAuthority.domainRating}
                description="Overall domain strength (Ahrefs style)"
              />
              <ScoreIndicator
                label="Domain Authority"
                score={auditResult.seo.domainAuthority.domainAuthority}
                description="Domain authority score (Moz style)"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {auditResult.seo.domainAuthority.trustFlow}
                  </div>
                  <div className="text-sm text-gray-600">Trust Flow</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {auditResult.seo.domainAuthority.citationFlow}
                  </div>
                  <div className="text-sm text-gray-600">Citation Flow</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Organic Performance</h2>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {auditResult.seo.domainAuthority.organicTraffic.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Estimated Monthly Organic Traffic</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {auditResult.seo.domainAuthority.organicKeywords.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Organic Keywords</div>
              </div>
              
              {auditResult.seo.backlinks.topReferringDomains.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Top Referring Domains</h3>
                  <div className="space-y-2">
                    {auditResult.seo.backlinks.topReferringDomains.slice(0, 5).map((domain, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{domain}</span>
                        <span className="text-primary-600 font-medium">#{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditResult.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  recommendation.priority === 'high' ? 'bg-red-100' :
                  recommendation.priority === 'medium' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    recommendation.priority === 'high' ? 'bg-red-600' :
                    recommendation.priority === 'medium' ? 'bg-orange-600' : 'bg-blue-600'
                  }`}></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">{recommendation.title}</h3>
                  <p className="text-sm text-gray-600">{recommendation.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
