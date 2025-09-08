// src/lib/archive.client.ts
import { createClient } from "./supabase/client";

export interface ArchiveData {
  title: string;
  slug: string;
  content: string;
  date: string;
}

// Add a new archive
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
export async function getArchiveDetails(slug: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) return { error: error.message };
    return { data };
  } catch (err) {
    console.error(err);
    return { error: "Failed to fetch article" };
  }
}