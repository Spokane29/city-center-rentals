import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Create bucket if it doesn't exist (this will fail silently if it exists)
    await supabase.storage.createBucket("property-images", {
      public: true,
      fileSizeLimit: 52428800, // 50MB
    });

    // Upload file
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("property-images")
      .upload(fileName, file, {
        contentType: file.type,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("property-images").getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl, fileName });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

