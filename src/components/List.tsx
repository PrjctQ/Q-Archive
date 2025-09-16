"use client";

// src/components/List.tsx
import Link from "next/link";
import { getArchive } from "@/lib/archive.client";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "./Spinner";

const List = () => {
  const { data: articlesData, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => await getArchive(),
  });

  if (isLoading) return <div className="flex items-center justify-center w-full"><Spinner/></div>;

  const data = articlesData?.data;
  // Make sure 'articles' is always an array
  const articles = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <div className="font-inter group">
      {articles.map((article, index) => (
        <Link
          key={index}
          href={`/archives/${article.slug}`}
          className="
            flex items-center py-2 cursor-pointer 
            transition-opacity duration-300 ease-in-out
            group-hover:opacity-50 hover:!opacity-100
          "
        >
          <span className="pr-2">{article.title}</span>
          <span className="flex-1 border-t border-stone-600 mx-2"></span>
          <span className="text-stone-500">{article.date}</span>
        </Link>
      ))}
    </div>
  );
};

export default List;
