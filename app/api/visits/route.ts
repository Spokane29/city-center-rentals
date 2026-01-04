import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Safety: avoid crashing when env vars are missing or invalid
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    console.warn("[visits] Missing Supabase env vars; skipping insert");
    return NextResponse.json({ success: true, skipped: true });
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Get the property ID (first property for now)
    const { data: property } = await supabase
      .from("properties")
      .select("id")
      .eq("name", "City Center Apartments")
      .single();

    await supabase.from("page_visits").insert({
      property_id: property?.id || null,
      session_id: body.sessionId || null,
      page_path: body.pagePath || null,
      referrer: body.referrer || null,
      utm_source: body.utm_source || null,
      utm_medium: body.utm_medium || null,
      utm_campaign: body.utm_campaign || null,
      utm_content: body.utm_content || null,
      device_type: body.deviceType || null,
      user_agent: body.userAgent || null,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Supabase error (visits):", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

