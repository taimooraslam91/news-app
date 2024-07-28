import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Filter = ({ onFilterChange }) => {
  const handleChange = (value) => {
    onFilterChange('category', value === 'all' ? '' : value);
  };

  return (
    <div className='flex justify-center space-x-4 rounded-sm'>
      <Select onValueChange={handleChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='All Categories' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Categories</SelectItem>
          <SelectItem value='technology'>Technology</SelectItem>
          <SelectItem value='business'>Business</SelectItem>
          <SelectItem value='sports'>Sports</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
