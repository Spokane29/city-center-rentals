import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received lead:', JSON.stringify(body))
    
    const response = await fetch('https://leasingvoice.com/api/leads/external', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: body.firstName,
        lastName: body.lastName || '',
        phone: body.phone,
        email: body.email || '',
        propertyInterest: body.propertyInterest || '1 Bedroom - $1,000/mo',
        moveInDate: body.moveInDate || '',
        message: body.message || '',
        source: '4spokane'
      })
    })

    console.log('LeasingVoice status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.log('LeasingVoice error:', errorText)
      return NextResponse.json({ error: 'API error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error('Lead error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
