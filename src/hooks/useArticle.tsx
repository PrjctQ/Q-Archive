import { getArchive, getArchiveDetails } from "@/lib/archive.client";
import { useQuery } from "@tanstack/react-query";

import React from "react";

// Fetch all articles data
export function useArticleList() {
  const query = useQuery({
    queryKey: ["articles"],
    queryFn: () => getArchive(),
  });

  return { ...query, data: query.data?.data ?? [] };
}

// Fetch single article data
export function useArticleDetails(slugPromise: Promise<{ slug: string }>) {
  const { slug } = React.use(slugPromise);
  const query = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => await getArchiveDetails(slug),
  });

  return { ...query, data: query.data?.data };
}
