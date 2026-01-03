import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const {
    firstName,
    lastName,
    phone,
    email,
    propertyInterest,
    moveInDate,
    message,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    referrer,
  } = body;

  // Validate required fields
  if (!firstName || !phone) {
    return NextResponse.json(
      { error: "First name and phone are required" },
      { status: 400 }
    );
  }

  // 1. Submit to LeasingVoice API (primary)
  let leasingvoiceSynced = false;
  let leasingvoiceLeadId = null;

  try {
    const lvResponse = await fetch(
      "https://leasingvoice.com/api/leads/external",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          propertyInterest,
          moveInDate,
          message,
          source: "city-center-rentals",
        }),
      }
    );

    if (lvResponse.ok) {
      const lvData = await lvResponse.json();
      leasingvoiceSynced = true;
      leasingvoiceLeadId = lvData.leadId || null;
    }
  } catch (err) {
    console.error("LeasingVoice API error:", err);
  }

  // 2. Save to local Supabase (for analytics)
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get the property ID (first property for now)
    const { data: property } = await supabase
      .from("properties")
      .select("id")
      .eq("name", "City Center Apartments")
      .single();

    await supabase.from("leads").insert({
      property_id: property?.id || null,
      first_name: firstName,
      last_name: lastName || null,
      phone,
      email: email || null,
      property_interest: propertyInterest || null,
      move_in_date: moveInDate || null,
      message: message || null,
      source: "city-center-rentals",
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_content: utm_content || null,
      referrer: referrer || null,
      leasingvoice_synced: leasingvoiceSynced,
      leasingvoice_lead_id: leasingvoiceLeadId,
    });
  } catch (err) {
    console.error("Supabase error:", err);
  }

  // Return success if LeasingVoice worked
  if (leasingvoiceSynced) {
    return NextResponse.json({
      success: true,
      leadId: leasingvoiceLeadId,
    });
  } else {
    // Still return success - we have the lead locally
    return NextResponse.json({ success: true, note: "Saved locally" });
  }
}

