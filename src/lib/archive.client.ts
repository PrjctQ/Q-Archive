// src/lib/archive.client.ts
import { createClient } from "./supabase/client";

interface ArchiveData {
  title: string;
  slug: string;
  content: string;
  date: string;
}

export async function addArchive(article: ArchiveData) {
  try {
    const supabase = createClient();

    const { error } = await supabase.from("articles").insert([article]);
    if (error) return { error: error.message };

    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "Failed to add article" };
  }
}
