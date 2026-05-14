import { supabaseAdmin } from "../config/supabase.js";
import env from "../config/env.js";
import path from "path";

export async function uploadMedia(file, folder = "general") {
  if (!file) {
    throw new Error("No file provided");
  }

  const ext = path.extname(file.originalname);
  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}${ext}`;

  const filePath = `${folder}/${fileName}`;

  const bucket = env.MEDIA_BUCKET || "media";

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    // Improve error messaging for missing bucket
    if (error.message && /bucket/i.test(error.message)) {
      throw new Error(
        `Storage bucket not found: ${bucket}. Create this bucket in Supabase Storage or set MEDIA_BUCKET env var.`,
      );
    }
    throw new Error(error.message || "Upload failed");
  }

  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);

  return {
    path: filePath,
    url: data.publicUrl,
  };
}
