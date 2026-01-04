import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received lead:', JSON.stringify(body))
    
    // Combine firstName and lastName into name
    const name = [body.firstName, body.lastName].filter(Boolean).join(' ').trim()
    
    // Build message from moveInDate and message if provided
    let message = body.message || null
    if (body.moveInDate && body.moveInDate.trim()) {
      const dateMessage = `Preferred Move-In Date: ${body.moveInDate}`
      message = message ? `${dateMessage}\n\n${message}` : dateMessage
    }
    
    const response = await fetch('https://leasingvoice.com/api/public/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_id: '322039f9-b67b-4084-b806-387ba26c4810',
        name: name,
        phone: body.phone,
        email: body.email || null,
        property: body.propertyInterest || null,
        message: message,
        source: '4spokane.com'
      })
    })

    console.log('LeasingVoice status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('LeasingVoice error:', errorText)
      return NextResponse.json({ error: 'API error' }, { status: 500 })
    }

    const result = await response.json()
    console.log('LeasingVoice response:', result)

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Lead error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
