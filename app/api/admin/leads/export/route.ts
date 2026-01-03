import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const source = searchParams.get("source");
    const search = searchParams.get("search");

    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

    if (startDate) {
      query = query.gte("created_at", startDate);
    }

    if (endDate) {
      query = query.lte("created_at", endDate);
    }

    if (source && source !== "all") {
      query = query.eq("utm_source", source);
    }

    if (search) {
      query = query.or(
        `first_name.ilike.%${search}%,last_name.ilike.%${search}%,phone.ilike.%${search}%`
      );
    }

    const { data, error } = await query;

    if (error) throw error;

    // Convert to CSV
    const headers = [
      "First Name",
      "Last Name",
      "Phone",
      "Email",
      "Property Interest",
      "Move-in Date",
      "Source",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "UTM Content",
      "Referrer",
      "Synced",
      "Date",
    ];

    const rows = (data || []).map((lead) => [
      lead.first_name || "",
      lead.last_name || "",
      lead.phone || "",
      lead.email || "",
      lead.property_interest || "",
      lead.move_in_date || "",
      lead.source || "",
      lead.utm_source || "",
      lead.utm_medium || "",
      lead.utm_campaign || "",
      lead.utm_content || "",
      lead.referrer || "",
      lead.leasingvoice_synced ? "Yes" : "No",
      new Date(lead.created_at).toLocaleString(),
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (err) {
    console.error("Export error:", err);
    return NextResponse.json({ error: "Failed to export leads" }, { status: 500 });
  }
}

