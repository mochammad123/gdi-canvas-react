import { useState } from 'react';

export default function usePaginationRange({ page = 1, perPage = 10, totalData = 0 }: { page: number; perPage: number; totalData: number }) {
  const [currentPage, setCurrentPage] = useState<number | null>(page);
  const [currentPerPage, setCurrentPerPage] = useState<number | null>(perPage);

  const getFrom = () => {
    if (page === 1) return 1;
    return (page || 1) * (perPage || 1) - (perPage || 1);
  };

  const getTo = () => {
    const value = (perPage || 1) * (page || 1);
    if (value > totalData) return totalData;
    return value;
  };

  return {
    state: {
      page: currentPage,
      perPage: currentPerPage,
    },
    setters: {
      setPage: setCurrentPage,
      setPerPage: setCurrentPerPage,
    },
    getters: {
      getFrom,
      getTo,
    },
  };
}
