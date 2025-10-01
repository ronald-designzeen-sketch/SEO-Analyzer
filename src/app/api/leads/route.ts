import { NextRequest, NextResponse } from 'next/server'
import { LeadData } from '@/types/seo'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, website, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create lead data
    const leadData: LeadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      website: website?.trim() || undefined,
      message: message.trim(),
      timestamp: new Date().toISOString()
    }

    // In a real application, you would save this to a database
    // For now, we'll just log it and return success
    console.log('New lead captured:', leadData)

    // Here you could also:
    // 1. Save to database (SQLite, PostgreSQL, etc.)
    // 2. Send email notification to Design Zeen team
    // 3. Add to CRM system
    // 4. Send auto-response email to the lead

    // Example of what you might do:
    // await saveLeadToDatabase(leadData)
    // await sendNotificationEmail(leadData)
    // await sendAutoResponse(leadData)

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your interest! We will contact you soon.' 
    })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit lead information' },
      { status: 500 }
    )
  }
}

// Example functions you might implement:

// async function saveLeadToDatabase(leadData: LeadData) {
//   // Save to your database of choice
//   // Example with Prisma:
//   // await prisma.lead.create({ data: leadData })
// }

// async function sendNotificationEmail(leadData: LeadData) {
//   // Send email to Design Zeen team
//   // Example with nodemailer or email service
// }

// async function sendAutoResponse(leadData: LeadData) {
//   // Send confirmation email to the lead
// }

