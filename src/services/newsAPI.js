import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWSAPI_KEY;
const BASE_URL = 'https://newsapi.org/v2';

export const fetchNews = async (
  query,
  fromDate,
  toDate,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        from: fromDate,
        to: toDate,
        apiKey: API_KEY,
        page,
        pageSize,
      },
    });

    const articles = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
    }));

    return {
      articles,
      totalResults: response.data.totalResults,
    };
  } catch (error) {
    console.error('Error fetching NewsAPI articles:', error);
    return { articles: [], totalResults: 0 };
  }
};
