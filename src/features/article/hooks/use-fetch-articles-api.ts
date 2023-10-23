import { useEffect, useState } from 'react';

import { useGetFetch } from '~/features/app/hooks/use-get-fetch';
import { ArticleUiModel } from '~/features/article/ui-models/article';

type ApiResponseData = {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export const useFetchArticlesApi = () => {
  const [articles, setArticles] = useState<ArticleUiModel[]>([]);

  const { data, error, studyError, isLoading, query } = useGetFetch<ApiResponseData[]>(
    'http://localhost:8000/articles',
  );

  useEffect(() => {
    if (!data) return;
    const articleModels = convertToUiModel(data);

    setArticles(articleModels);
  }, [data]);

  return { articles, error, studyError, isLoading, query };
};

const convertToUiModel = (data: ApiResponseData[]): ArticleUiModel[] => {
  return data.map((article) => ({
    id: article.id,
    title: article.title,
    category: article.category,
    status: article.status,
    createdAt: article.createdAt,
  }));
};