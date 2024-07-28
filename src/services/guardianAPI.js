import axios from 'axios';

const API_KEY = import.meta.env.VITE_GUARDIAN_KEY;
const BASE_URL = 'https://content.guardianapis.com';

export const fetchGuardianNews = async (
  query,
  fromDate,
  toDate,
  page = 1,
  pageSize = 10
) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: query,
        'from-date': fromDate,
        'to-date': toDate,
        'api-key': API_KEY,
        page,
        'page-size': pageSize,
      },
    });

    const articles = response.data.response.results.map((result) => ({
      title: result.webTitle,
      description: result.fields ? result.fields.trailText : '',
      url: result.webUrl,
    }));

    return {
      articles,
      totalResults: response.data.response.total,
    };
  } catch (error) {
    console.error('Error fetching Guardian articles:', error);
    return { articles: [], totalResults: 0 };
  }
};
