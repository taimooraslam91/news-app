import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

const PaginationDemo = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageLinks = () => {
    const pages = [];
    const range = 2; // Number of pages to show before and after the current page
    const ellipsis = (
      <PaginationItem key='ellipsis'>
        <PaginationEllipsis />
      </PaginationItem>
    );

    // Add first page and ellipsis if needed
    if (currentPage > range + 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      pages.push(ellipsis);
    }

    // Add page links around the current page
    for (
      let i = Math.max(1, currentPage - range);
      i <= Math.min(totalPages, currentPage + range);
      i++
    ) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis and last page if needed
    if (currentPage < totalPages - range) {
      pages.push(ellipsis);
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handlePrevious();
            }}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationDemo;
