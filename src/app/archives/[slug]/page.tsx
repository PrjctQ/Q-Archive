"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getArchiveDetails } from "@/lib/archive.client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/Spinner";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ArchiveDetails({ params }: Props) {
  const { slug } = React.use(params);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["article", slug],
    queryFn: async () => await getArchiveDetails(slug),
  });

  if (isError) return <p>Error: {error.message}</p>;
  if (isLoading) return <div className="flex items-center justify-center h-96 w-full"><Spinner/></div>;

  const article = data?.data;

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
