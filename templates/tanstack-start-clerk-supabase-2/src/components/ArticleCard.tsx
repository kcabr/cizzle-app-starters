import { formatDistanceToNow } from "date-fns";
import { Article } from "~/utils/news";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { title, description, url, urlToImage, publishedAt, source, author } =
    article;

  const formattedDate = formatDistanceToNow(new Date(publishedAt), {
    addSuffix: true,
  });

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 transition-shadow duration-200 hover:shadow-lg">
      {urlToImage ? (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500 dark:text-gray-400">
            No image available
          </span>
        </div>
      )}

      <div className="flex-grow p-4 flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              {source.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
            {title}
          </h3>

          {description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
              {description}
            </p>
          )}

          {author && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
              By {author}
            </p>
          )}
        </div>

        <div className="mt-4">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600 transition-colors duration-150"
          >
            Read Article
          </a>
        </div>
      </div>
    </div>
  );
}
