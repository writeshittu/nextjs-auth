import React from "react";
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

interface CardProps {
  slug: string;
  imageUrl: string;
  title: string;
  summary: string;
  author: string;
  pubDate: string;
}

const ArticleCard = ({
  slug,
  imageUrl,
  title,
  summary,
  author,
  pubDate,
  ...props
}: CardProps) => {
  return (
    <a
      href={`/${slug}`}
      className="block bg-white rounded-xl overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg border border-gray-200"
    >
      <div className="relative aspect-video bg-purple-700 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>{author}</span>
          <span>{formatDate(pubDate)}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 leading-tight mb-2">
          {title}
        </h2>
        <p className="text-base text-gray-600 leading-relaxed line-clamp-2 overflow-hidden">
          {summary}
        </p>
      </div>
    </a>
  );
};
export default ArticleCard;
