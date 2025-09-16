"use client";

// src/components/List.tsx
import Link from "next/link";
import { Spinner } from "./Spinner";
import { useArticleList } from "@/hooks/useArticle";

const List = () => {
  const { isLoading, data } = useArticleList();

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full">
        <Spinner />
      </div>
    );

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
