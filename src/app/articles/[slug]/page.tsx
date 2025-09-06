import Link from "next/link";
import { getArticleDetails } from "@/lib/archive.actions";
import { marked } from "marked";

interface Props {
  params: { slug: string };
}

export default async function ArticleDetails({ params }: Props) {
  const { slug } = params;
  const { data: article, error } = await getArticleDetails(slug);

  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found</p>;

  // Convert literal "\n" to real newlines
  const markdownWithLineBreaks = article.content.replace(/\\n/g, "\n");

  // Enable line breaks in marked
  marked.setOptions({ breaks: true });

  const htmlContent = marked(markdownWithLineBreaks);

  return (
    <div className="max-w-3xl mx-auto p-6 font-inter">
      <Link href="/" className="underline mb-4 inline-block">
        ← Back to Articles
      </Link>

      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-stone-500 mb-6">
        {new Date(article.date).toDateString()}
      </p>

      <div
        className="prose prose-headings:font-bold prose-headings:text-gray-900 max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}
