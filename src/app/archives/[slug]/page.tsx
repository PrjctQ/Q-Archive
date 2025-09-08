"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import { getArchiveDetails } from "@/lib/archive.client";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ArchiveDetails({ params }: Props) {
  const { slug } = React.use(params);

  const [article, setArticle] = useState<{
    title: string;
    slug: string;
    content: string;
    date: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      const { data, error } = await getArchiveDetails(slug);
      if (error) setError(error);
      else setArticle(data || null);
    }
    fetchArticle();
  }, [slug]);

  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Loading...</p>;

  return (
    <div className="mx-auto p-6 font-inter max-w-3xl">
      <Link href="/" className="underline mb-4 inline-block">
        ← Back to Articles
      </Link>

      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-stone-500 mb-6">
        {new Date(article.date).toDateString()}
      </p>

      {/* ✅ Wrap ReactMarkdown inside a div and style that */}
      <div className="[&>*]:mb-4 [&>h1]:text-2xl [&>h1]:font-bold [&>h2]:text-xl [&>h3]:text-lg [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>blockquote]:border-l-4 [&>blockquote]:pl-4 [&>blockquote]:italic">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {article.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
