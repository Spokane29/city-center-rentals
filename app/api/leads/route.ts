import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log('Received lead:', JSON.stringify(body))
    
    const { firstName, lastName, email, phone, tourDate, tourTime, notes } = body;
    
    const response = await fetch('https://leasingvoice.com/api/public/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_id: '322039f9-b67b-4084-b806-387ba26c4810',
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        preferred_tour_date: tourDate,
        preferred_tour_time: tourTime,
        additional_notes: notes,
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
