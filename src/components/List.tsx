"use client"

import { useEffect, useState } from "react";

interface Article {
  title: string;
  slug: string;
  content: string;
  date: string;
}

const List = () => {
   const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("/api/archive")
      .then((res) => res.json())
      .then((data) => setArticles(data.data || []));
  }, []);

  return (
    <div className="font-inter group">
      {articles.map((article, index) => (
        <div
          key={index}
          className="
            flex items-center py-2 cursor-pointer 
            transition-opacity duration-300 ease-in-out
            group-hover:opacity-50 hover:!opacity-100
          "
        >
          {/* Left text */}
          <span className="pr-2">{article.title}</span>

          {/* Flexible line that fills space */}
          <span className="flex-1 border-t border-stone-600 mx-2"></span>

          {/* Date */}
          <span className="text-stone-500">{article.date}</span>
        </div>
      ))}
    </div>
  );
};

export default List;
