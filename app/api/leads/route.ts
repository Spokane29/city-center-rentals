import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
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
      }),
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    
    if (!response.ok) {
      return NextResponse.json({ error: 'API error' }, { status: 500 })
    }

    await response.json()
    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
