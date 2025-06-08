import { createContext, useContext } from "react";

const PaginationContext = createContext();

export function PaginationProvider({
  children,
  characters,
  currentPage,
  loadMorePokemon, // New prop for loading more
  onSelect,
  hasMoreItems = true, // Flag for additional items
}) {
  const contextValue = {
    characters,
    currentPage,
    loadMorePokemon,
    onSelect,
    hasMoreItems,
  };

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePaginationContext() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider"
    );
  }
  return context;
}
