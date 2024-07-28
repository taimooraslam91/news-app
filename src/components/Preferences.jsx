'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

const availableSources = [
  { name: 'newsAPI', label: 'News' },
  { name: 'guardian', label: 'The Guardian' },
  { name: 'nyt', label: 'New York Times' },
];
const availableCategories = ['technology', 'business', 'sports', 'health'];
const availableAuthors = ['Adam Kovac', 'Amanda Meade', 'Vishnu Sarangapurkar'];

const Preferences = ({ onSavePreferences }) => {
  const [preferences, setPreferences] = useState({
    sources: ['newsAPI', 'guardian', 'nyt'],
    categories: [],
    authors: [],
  });

  const handleSourceChange = (value, checked) => {
    setPreferences((prev) => ({
      ...prev,
      sources: checked
        ? [...prev.sources, value]
        : prev.sources.filter((source) => source !== value),
    }));
  };

  const handleCategoryChange = (value, checked) => {
    setPreferences((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((category) => category !== value),
    }));
  };

  const handleAuthorChange = (value, checked) => {
    setPreferences((prev) => ({
      ...prev,
      authors: checked
        ? [...prev.authors, value]
        : prev.authors.filter((author) => author !== value),
    }));
  };

  const handleSave = () => {
    onSavePreferences(preferences);
  };

  return (
    <div className='p-4'>
      <h2 className='text-2xl mb-4'>Customize Your News Feed</h2>
      <div className='flex items-start gap-8 lg:flex-row flex-col lg:items-center'>
        <div className='mb-4'>
          <h3 className='text-xl mb-4'>Sources</h3>
          <div className='flex items-center gap-2 flex-wrap'>
            {availableSources.map((source) => (
              <div className='flex items-center space-x-2' key={source.name}>
                <Checkbox
                  id={source.name}
                  checked={preferences.sources.includes(source.name)}
                  onCheckedChange={(checked) =>
                    handleSourceChange(source.name, checked)
                  }
                />
                <label
                  htmlFor={source.name}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {source.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <h3 className='text-xl mb-4'>Categories</h3>
          <div className='flex items-center gap-2 flex-wrap'>
            {availableCategories.map((category) => (
              <div className='flex items-center space-x-2' key={category}>
                <Checkbox
                  id={category}
                  checked={preferences.categories.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked)
                  }
                />
                <label
                  htmlFor={category}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize'
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <h3 className='text-xl mb-4'>Authors</h3>
          <div className='flex items-center gap-2 flex-wrap'>
            {availableAuthors.map((author) => (
              <div className='flex items-center space-x-2' key={author}>
                <Checkbox
                  id={author}
                  checked={preferences.authors.includes(author)}
                  onCheckedChange={(checked) =>
                    handleAuthorChange(author, checked)
                  }
                />
                <label
                  htmlFor={author}
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  {author}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button onClick={handleSave}>Save Preferences</Button>
    </div>
  );
};

export default Preferences;
