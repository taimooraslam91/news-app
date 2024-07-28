import axios from 'axios';

const API_KEY = import.meta.env.VITE_NYT_KEY;
const BASE_URL = 'https://api.nytimes.com/svc/search/v2';

export const fetchNYTNews = async (
  query,
  fromDate,
  toDate,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await axios.get(`${BASE_URL}/articlesearch.json`, {
      params: {
        q: query,
        begin_date: fromDate.replace(/-/g, ''),
        end_date: toDate.replace(/-/g, ''),
        'api-key': API_KEY,
        page,
      },
    });

    const articles = response.data.response.docs.map((doc) => ({
      title: doc.headline.main,
      description: doc.abstract,
      url: doc.web_url,
    }));

    return {
      articles,
      totalResults: response.data.response.meta.hits,
    };
  } catch (error) {
    console.error('Error fetching NYT articles:', error);
    return { articles: [], totalResults: 0 };
  }
};
