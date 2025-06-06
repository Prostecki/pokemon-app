import { useState, useCallback } from "react";

export function usePagination(
  initialPage = 1,
  totalItems = 0,
  itemsPerPage = 40
) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalItems / itemsPerPage)
  );

  const updateTotalItems = useCallback(
    (count) => {
      setTotalPages(Math.ceil(count / itemsPerPage));
    },
    [itemsPerPage]
  );

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      return currentPage + 1;
    }
    return currentPage;
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      return currentPage - 1;
    }
    return currentPage;
  }, [currentPage]);

  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        return page;
      }
      return currentPage;
    },
    [currentPage, totalPages]
  );

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    updateTotalItems,
    itemsPerPage,
  };
}
