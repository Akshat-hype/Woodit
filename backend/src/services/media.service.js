import { supabaseAdmin } from "../config/supabase.js";
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

  const { error } = await supabaseAdmin.storage
    .from("media")
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from("media")
    .getPublicUrl(filePath);

  return {
    path: filePath,
    url: data.publicUrl,
  };
}
