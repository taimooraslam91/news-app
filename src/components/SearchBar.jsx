import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    } else {
      alert('Please enter a search term');
    }
  };

  return (
    <div className='flex items-center justify-center p-4'>
      <Input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search for news...'
        className='border p-2 bg-white rounded-none rounded-l-md lg:w-80 text-black'
      />
      <Button
        onClick={handleSearch}
        className='bg-blue-500 text-white hover:bg-white hover:text-black rounded-none rounded-r-md'
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
