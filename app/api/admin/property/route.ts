import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("name", "City Center Apartments")
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Property error:", err);
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await request.json();

    const { data, error } = await supabase
      .from("properties")
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq("name", "City Center Apartments")
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (err) {
    console.error("Property update error:", err);
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 });
  }
}

