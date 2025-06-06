import { createContext, useContext } from "react";

const PaginationContext = createContext(null);

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider"
    );
  }
  return context;
};

export const PaginationProvider = ({
  children,
  characters,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onGoToPage,
  onSelect,
}) => {
  // Keep all pagination-related props together
  const value = {
    characters,
    currentPage,
    totalPages,
    onPrevPage,
    onNextPage,
    onGoToPage,
    onSelect,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
