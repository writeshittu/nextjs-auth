import React from 'react'
import ArticleCard from './Card';
interface LayoutProps{
    articles:any
}

    const ArticleGridLayout = ({ articles }:LayoutProps) => {
        return (
          <div className="max-w-7xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles?.items?.map((article:any) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </div>
        );
      };

export default ArticleGridLayout
