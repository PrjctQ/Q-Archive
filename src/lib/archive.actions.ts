// src/lib/archive.actions.ts
import { createClient } from "./supabase/server";

interface ArchiveData {
  title: string;
  slug: string;
  content: string;
  date: string;
}

// Fetch all articles
export async function getArchive(): Promise<{ data?: ArchiveData[]; error?: string }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("title, slug, content, date")
      .order("date", { ascending: true });

    if (error) return { error: "Failed to fetch articles" };
    return { data: data as ArchiveData[] };
  } catch (err) {
    console.error(err);
    return { error: "Failed to fetch articles" };
  }
}

// Fetch single article by slug
export async function getArticleDetails(slug: string): Promise<{ data?: ArchiveData; error?: string }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("title, slug, content, date")
      .eq("slug", slug)
      .single();

    if (error) return { error: "Failed to fetch article" };
    return { data: data as ArchiveData };
  } catch (err) {
    console.error(err);
    return { error: "Failed to fetch article" };
  }
}
