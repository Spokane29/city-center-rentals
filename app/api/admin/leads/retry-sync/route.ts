import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get all unsynced leads
    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .eq("leasingvoice_synced", false);

    if (error) throw error;

    let successCount = 0;
    let failCount = 0;

    // Retry each lead
    for (const lead of leads || []) {
      try {
        const response = await fetch("https://leasingvoice.com/api/leads/external", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: lead.first_name,
            lastName: lead.last_name,
            phone: lead.phone,
            email: lead.email,
            propertyInterest: lead.property_interest,
            moveInDate: lead.move_in_date,
            message: lead.message,
            source: "city-center-rentals",
          }),
        });

        if (response.ok) {
          const lvData = await response.json();
          await supabase
            .from("leads")
            .update({
              leasingvoice_synced: true,
              leasingvoice_lead_id: lvData.leadId || null,
            })
            .eq("id", lead.id);
          successCount++;
        } else {
          failCount++;
        }
      } catch (err) {
        console.error(`Failed to sync lead ${lead.id}:`, err);
        failCount++;
      }
    }

    return NextResponse.json({
      success: true,
      synced: successCount,
      failed: failCount,
    });
  } catch (err) {
    console.error("Retry sync error:", err);
    return NextResponse.json({ error: "Failed to retry syncs" }, { status: 500 });
  }
}

