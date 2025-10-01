import { NextRequest, NextResponse } from 'next/server'
import jsPDF from 'jspdf'
import { SEOAuditResult } from '@/types/seo'

export async function POST(request: NextRequest) {
  try {
    const auditResult: SEOAuditResult = await request.json()

    // Create PDF
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    let yPosition = 20

    // Helper function to add text with word wrapping
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12) => {
      pdf.setFontSize(fontSize)
      const lines = pdf.splitTextToSize(text, maxWidth)
      pdf.text(lines, x, y)
      return y + (lines.length * fontSize * 0.4)
    }

    // Header
    pdf.setFillColor(59, 130, 246) // Primary blue
    pdf.rect(0, 0, pageWidth, 40, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.text('SEO Audit Report', 20, 25)
    
    pdf.setFontSize(12)
    pdf.text('Design Zeen Marketing Agency', 20, 35)

    yPosition = 60

    // Website URL
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(16)
    pdf.text('Website Analysis', 20, yPosition)
    yPosition += 10

    pdf.setFontSize(12)
    yPosition = addText(`URL: ${auditResult.url}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Report Generated: ${new Date(auditResult.timestamp).toLocaleDateString()}`, 20, yPosition, pageWidth - 40)
    yPosition += 10

    // Performance Scores
    pdf.setFontSize(16)
    pdf.text('Performance Scores', 20, yPosition)
    yPosition += 15

    pdf.setFontSize(12)
    yPosition = addText(`Desktop Performance: ${auditResult.performance.desktop}/100`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Mobile Performance: ${auditResult.performance.mobile}/100`, 20, yPosition, pageWidth - 40)
    yPosition += 10

    // Technical SEO
    pdf.setFontSize(16)
    pdf.text('Technical SEO Analysis', 20, yPosition)
    yPosition += 15

    pdf.setFontSize(12)
    yPosition = addText(`SSL Certificate: ${auditResult.seo.hasSSL ? 'Secure' : 'Not Secure'}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Mobile Friendly: ${auditResult.seo.isMobileFriendly ? 'Yes' : 'No'}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Page Title Length: ${auditResult.seo.titleLength} characters`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Meta Description: ${auditResult.seo.hasMetaDescription ? 'Present' : 'Missing'}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`H1 Tags: ${auditResult.seo.h1Count} found`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Images with Alt Text: ${auditResult.seo.imagesWithAlt}/${auditResult.seo.totalImages}`, 20, yPosition, pageWidth - 40)
    yPosition += 10

    // Link Profile
    pdf.setFontSize(16)
    pdf.text('Link Profile Analysis', 20, yPosition)
    yPosition += 15

    pdf.setFontSize(12)
    yPosition = addText(`Total Backlinks: ${auditResult.seo.backlinks.totalBacklinks.toLocaleString()}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Referring Domains: ${auditResult.seo.backlinks.referringDomains.toLocaleString()}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`DoFollow Backlinks: ${auditResult.seo.backlinks.doFollowBacklinks.toLocaleString()} (${Math.round((auditResult.seo.backlinks.doFollowBacklinks / auditResult.seo.backlinks.totalBacklinks) * 100)}%)`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`NoFollow Backlinks: ${auditResult.seo.backlinks.noFollowBacklinks.toLocaleString()}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`New Backlinks (30 days): ${auditResult.seo.backlinks.newBacklinks.toLocaleString()}`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Lost Backlinks (30 days): ${auditResult.seo.backlinks.lostBacklinks.toLocaleString()}`, 20, yPosition, pageWidth - 40)
    yPosition += 10

    // Domain Authority
    pdf.setFontSize(16)
    pdf.text('Domain Authority Metrics', 20, yPosition)
    yPosition += 15

    pdf.setFontSize(12)
    yPosition = addText(`Domain Rating: ${auditResult.seo.domainAuthority.domainRating}/100 (Ahrefs style)`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Domain Authority: ${auditResult.seo.domainAuthority.domainAuthority}/100 (Moz style)`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Trust Flow: ${auditResult.seo.domainAuthority.trustFlow}/100 (Majestic)`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Citation Flow: ${auditResult.seo.domainAuthority.citationFlow}/100 (Majestic)`, 20, yPosition, pageWidth - 40)
    yPosition += 10

    // Organic Performance
    pdf.setFontSize(16)
    pdf.text('Organic Performance', 20, yPosition)
    yPosition += 15

    pdf.setFontSize(12)
    yPosition = addText(`Estimated Monthly Organic Traffic: ${auditResult.seo.domainAuthority.organicTraffic.toLocaleString()} visits`, 20, yPosition, pageWidth - 40)
    yPosition = addText(`Organic Keywords: ${auditResult.seo.domainAuthority.organicKeywords.toLocaleString()}`, 20, yPosition, pageWidth - 40)
    yPosition += 10

    // Top Referring Domains
    if (auditResult.seo.backlinks.topReferringDomains.length > 0) {
      pdf.setFontSize(14)
      pdf.text('Top Referring Domains', 20, yPosition)
      yPosition += 10

      pdf.setFontSize(11)
      auditResult.seo.backlinks.topReferringDomains.slice(0, 5).forEach((domain, index) => {
        yPosition = addText(`${index + 1}. ${domain}`, 25, yPosition, pageWidth - 50, 11)
      })
      yPosition += 10
    }

    // Check if we need a new page
    if (yPosition > pageHeight - 80) {
      pdf.addPage()
      yPosition = 20
    }

    // Recommendations
    pdf.setFontSize(16)
    pdf.text('Recommendations', 20, yPosition)
    yPosition += 15

    auditResult.recommendations.forEach((rec, index) => {
      if (yPosition > pageHeight - 60) {
        pdf.addPage()
        yPosition = 20
      }

      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'bold')
      yPosition = addText(`${index + 1}. ${rec.title} (${rec.priority.toUpperCase()} Priority)`, 20, yPosition, pageWidth - 40, 12)
      
      pdf.setFont('helvetica', 'normal')
      yPosition = addText(rec.description, 25, yPosition, pageWidth - 50, 11)
      yPosition += 5
    })

    // Footer
    if (yPosition > pageHeight - 40) {
      pdf.addPage()
      yPosition = 20
    }

    yPosition = pageHeight - 30
    pdf.setFillColor(59, 130, 246)
    pdf.rect(0, yPosition - 10, pageWidth, 40, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(10)
    pdf.text('Need help improving your SEO? Contact Design Zeen Marketing Agency', 20, yPosition)
    pdf.text('Email: info@designzeen.com', 20, yPosition + 8)
    pdf.text('This report was generated by Design Zeen\'s Free SEO Audit Tool', 20, yPosition + 16)

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="seo-audit-${new URL(auditResult.url).hostname}.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF report' },
      { status: 500 }
    )
  }
}
