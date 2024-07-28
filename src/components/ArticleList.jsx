import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from './ui/card';

const ArticleList = ({ articles }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
      {articles.map((article, index) => (
        <Card key={index} className='shadow-sm'>
          <CardHeader className='font-bold text-xl line-clamp-2 mb-3'>
            {article.title}
          </CardHeader>
          <CardContent className='line-clamp-3'>
            {article.description}
          </CardContent>
          <CardFooter>
            <a
              href={article.url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500'
            >
              Read more
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ArticleList;
