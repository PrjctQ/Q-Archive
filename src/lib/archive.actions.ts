import { createClient } from "./supabase/server";

interface ArchiveData {
  title: string;
  slug: string;
  content: string;
  date: string; // added date
}

// Fetch all articles or a single article by slug
export async function getArchive(slug?: string): Promise<{ data?: ArchiveData[] | ArchiveData; error?: string }> {
  try {
    const supabase = await createClient();

    if (slug) {
      // Fetch a single article by slug
      const { data, error } = await supabase
        .from("articles")
        .select("title, slug, content, date") // include date
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Error fetching article:", error);
        return { error: "Failed to fetch article" };
      }

      return { data };
    } else {
      // Fetch all articles
      const { data, error } = await supabase
        .from("articles")
        .select("title, slug, content, date") // include date
        .order("date", { ascending: true }); // order by date

      if (error) {
        console.error("Error fetching articles:", error);
        return { error: "Failed to fetch articles" };
      }

      return { data };
    }
  } catch (error: unknown) {
    console.error("Error in getArchive:", error);
    return { error: "Failed to fetch articles" };
  }
}