import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import Preferences from './components/Preferences';
import ArticleList from './components/ArticleList';
import PaginationDemo from './components/Pagination';
import { fetchNews } from './services/newsAPI';
import { fetchGuardianNews } from './services/guardianAPI';
import { fetchNYTNews } from './services/nytAPI';
import { getWeekDateRange } from './lib/dateUtils';

const App = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({});
  const [preferences, setPreferences] = useState({
    sources: ['newsAPI', 'guardian', 'nyt'],
    categories: [],
    authors: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const articlesPerPage = 10;

  useEffect(() => {
    const { fromDate, toDate } = getWeekDateRange();

    const fetchArticles = async () => {
      let allArticles = [];
      let totalResults = 0;

      if (preferences.sources.includes('newsAPI')) {
        const { articles: newsAPIArticles, totalResults: newsAPITotalResults } =
          await fetchNews(
            filters.query || 'latest',
            fromDate,
            toDate,
            currentPage,
            articlesPerPage
          );
        allArticles = allArticles.concat(newsAPIArticles);
        totalResults += newsAPITotalResults;
      }
      if (preferences.sources.includes('guardian')) {
        const {
          articles: guardianArticles,
          totalResults: guardianTotalResults,
        } = await fetchGuardianNews(
          filters.query || 'latest',
          fromDate,
          toDate,
          currentPage,
          articlesPerPage
        );
        allArticles = allArticles.concat(guardianArticles);
        totalResults += guardianTotalResults;
      }
      if (preferences.sources.includes('nyt')) {
        const { articles: nytArticles, totalResults: nytTotalResults } =
          await fetchNYTNews(
            filters.query || 'latest',
            fromDate,
            toDate,
            currentPage,
            articlesPerPage
          );
        allArticles = allArticles.concat(nytArticles);
        totalResults += nytTotalResults;
      }

      setArticles(allArticles);
      setTotalPages(Math.ceil(totalResults / articlesPerPage));
    };

    fetchArticles();
  }, [filters, preferences, currentPage]);

  const handleSearch = (query) => {
    setFilters({ ...filters, query });
    setCurrentPage(1); // Reset to the first page on new search
  };

  const handleFilterChange = (filterType, value) => {
    setFilters({ ...filters, [filterType]: value });
    setCurrentPage(1); // Reset to the first page on new filter change
  };

  const handleSavePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    setCurrentPage(1); // Reset to the first page on new preferences
  };

  return (
    <>
      {' '}
      <div className='bg-gray-800 p-4'>
        <header className='container mx-auto text-white flex md:justify-between items-center md:flex-row flex-col'>
          <h1 className='text-2xl font-bold'>News APP</h1>
          <div className='flex items-center gap-4'>
            <SearchBar onSearch={handleSearch} />
            <Filter onFilterChange={handleFilterChange} />
          </div>
        </header>
      </div>
      <div className='container mx-auto pb-16 mt-10'>
        <Preferences onSavePreferences={handleSavePreferences} />
        <ArticleList articles={articles} />
        <div className='mt-10'>
          <PaginationDemo
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default App;
