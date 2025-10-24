import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; // biar bisa handle Buffer besar

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.warn("Supabase env vars missing: SUPABASE_URL or SUPABASE_KEY");
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function POST(req) {
  try {
    const bucket = process.env.SUPABASE_BUCKET || "library-files";
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "uploads";

    if (!file) {
      return Response.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    // Convert file ke Buffer untuk upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileExt = file.name.split(".").pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;

    // Upload ke Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return Response.json(
        { error: uploadError.message || uploadError },
        { status: 502 }
      );
    }

    // Try to get public URL. If bucket is private, create a signed URL (requires service_role key)
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (publicData?.publicUrl) {
      return Response.json({ url: publicData.publicUrl });
    }

    // Fallback: try signed URL for 1 hour
    try {
      const { data: signedData, error: signedError } = await supabase.storage
        .from(bucket)
        .createSignedUrl(fileName, 60 * 60);

      if (signedError) {
        console.warn("Signed URL error:", signedError);
        return Response.json({
          url: null,
          note: "Uploaded but cannot generate public URL. Check bucket visibility or use service_role key.",
        });
      }

      return Response.json({ url: signedData.signedUrl });
    } catch (e) {
      console.warn("Signed URL generation failed:", e);
      return Response.json({
        url: null,
        note: "Uploaded but URL generation failed.",
      });
    }
  } catch (err) {
    console.error("Upload Error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
