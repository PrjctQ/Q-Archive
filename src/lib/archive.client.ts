// src/lib/archive.client.ts
import { createClient } from "./supabase/client";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

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

// Get details of a single archive by slug
export async function getArchiveDetails(slug: string) {
  try {
    const supabase = createClient();
    const { data, error } : PostgrestSingleResponse<ArchiveData> = await supabase
      .from<ArchiveData>("articles")
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
