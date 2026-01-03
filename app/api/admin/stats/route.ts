import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get leads this month
    const { count: leadsThisMonth } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString());

    // Get total leads
    const { count: totalLeads } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true });

    // Get page visits this month
    const { count: visitsThisMonth } = await supabase
      .from("page_visits")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString());

    // Get pending syncs
    const { count: pendingSyncs } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("leasingvoice_synced", false);

    // Get leads by source
    const { data: leadsBySource } = await supabase
      .from("leads")
      .select("utm_source");

    const sourceCounts: Record<string, number> = {};
    leadsBySource?.forEach((lead) => {
      const source = lead.utm_source || "direct";
      sourceCounts[source] = (sourceCounts[source] || 0) + 1;
    });

    // Calculate conversion rate
    const { count: totalVisits } = await supabase
      .from("page_visits")
      .select("*", { count: "exact", head: true });

    const conversionRate =
      totalVisits && totalVisits > 0
        ? ((totalLeads || 0) / totalVisits) * 100
        : 0;

    return NextResponse.json({
      leadsThisMonth: leadsThisMonth || 0,
      totalLeads: totalLeads || 0,
      visitsThisMonth: visitsThisMonth || 0,
      conversionRate: Math.round(conversionRate * 100) / 100,
      pendingSyncs: pendingSyncs || 0,
      leadsBySource: sourceCounts,
    });
  } catch (err) {
    console.error("Stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

