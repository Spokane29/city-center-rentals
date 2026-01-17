import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      propertyInterest,
      moveInDate,
      scheduleViewing,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      referrer
    } = body;

    // Build additional notes from form data
    const notesParts: string[] = [];
    if (propertyInterest) notesParts.push(`Property Interest: ${propertyInterest}`);
    if (moveInDate) notesParts.push(`Move-in Date: ${moveInDate}`);
    if (scheduleViewing) notesParts.push('Wants to schedule a viewing');
    if (message) notesParts.push(`Message: ${message}`);
    if (utm_source) notesParts.push(`Source: ${utm_source}`);
    if (utm_campaign) notesParts.push(`Campaign: ${utm_campaign}`);
    const additionalNotes = notesParts.join(' | ');

    const response = await fetch('https://leasingvoice.com/api/public/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company_id: '322039f9-b67b-4084-b806-387ba26c4810',
        first_name: firstName,
        last_name: lastName || '',
        email: email || '',
        phone: phone,
        preferred_tour_date: moveInDate || '',
        preferred_tour_time: '',
        additional_notes: additionalNotes,
        source: utm_source ? `4spokane.com (${utm_source})` : '4spokane.com'
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
