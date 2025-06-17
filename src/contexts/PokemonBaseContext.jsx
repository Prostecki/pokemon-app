import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { usePokemon } from "../hooks/usePokemon";

const PokemonBaseContext = createContext();

export function PokemonBaseProvider({ children }) {
  // Constants
  const ITEMS_PER_PAGE = 40;

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const searchTimeoutRef = useRef(null);

  // Use unified hook for all pokemon logic
  const {
    loadPokemonPage,
    searchPokemon,
    fetchDetails,
    resetDetails,
    loading,
    pokemonDetails,
    evolutions,
    showDetails,
  } = usePokemon();

  // Load next page (for "Load more" button)
  const loadMore = useCallback(async () => {
    if (loading || searchQuery) {
      return [];
    }
    try {
      const newPokemons = await loadPokemonPage(currentPage, ITEMS_PER_PAGE);
      if (newPokemons && newPokemons.length > 0) {
        setAllPokemons((prevPokemons) => {
          const existingIds = new Set(prevPokemons.map((p) => p.id));
          const uniqueNewPokemons = newPokemons.filter(
            (p) => !existingIds.has(p.id)
          );
          if (uniqueNewPokemons.length > 0) {
            setCurrentPage(currentPage + 1);
            return [...prevPokemons, ...uniqueNewPokemons];
          }
          return prevPokemons;
        });
      }

      return newPokemons || [];
    } catch (error) {
      console.error("Failed to load more Pokemon:", error);
      return [];
    }
  }, [currentPage, ITEMS_PER_PAGE, loading, searchQuery, loadPokemonPage]);

  // Initial load on mount
  useEffect(() => {
    loadPokemonPage(1, ITEMS_PER_PAGE).then((pokemons) => {
      setAllPokemons(pokemons || []);
      setCurrentPage(2);
    });
  }, [loadPokemonPage]);

  // Search handler with debounce
  const handleSearch = useCallback(
    (query) => {
      // 1. update search query state
      setSearchQuery(query);

      // 2. cancel previous timeout if exists
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // 3. set new timeout for search
      searchTimeoutRef.current = setTimeout(async () => {
        // 4. if query is empty, reset search results
        if (!query.trim()) {
          setSearchResults([]);
          return;
        }
        //5. Perform search and update results
        const results = await searchPokemon(query);
        setSearchResults(results);
      }, 300); // 300ms delay for debounce
    },
    [searchPokemon]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Select pokemon to show details
  const handleSelectPokemon = useCallback(
    (id) => {
      setIsLoadingDetails(true); // Start loading immediately on click

      fetchDetails(id).finally(() => {
        setIsLoadingDetails(false); // End loading when fetch completes
      });
    },
    [fetchDetails]
  );

  // Handle type filter changes
  const handleTypeFilterChange = useCallback((types) => {
    setSelectedTypes(types);
  }, []);

  // Filter pokemons by type and search query
  const filteredPokemons = useMemo(() => {
    let filtered = searchQuery ? searchResults : allPokemons;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.types &&
          pokemon.types.some((type) => selectedTypes.includes(type))
      );
    }

    return filtered;
  }, [searchQuery, searchResults, allPokemons, selectedTypes]);

  const contextValue = {
    ITEMS_PER_PAGE,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    allPokemons,
    setAllPokemons,
    searchResults,
    setSearchResults,
    isLoadingDetails,
    setIsLoadingDetails,
    selectedTypes,
    setSelectedTypes,
    loading,
    pokemonDetails,
    evolutions,
    showDetails,
    loadMore,
    handleSearch,
    handleSelectPokemon,
    handleTypeFilterChange,
    filteredPokemons,
    fetchDetails,
    resetDetails,
  };

  return (
    <PokemonBaseContext.Provider value={contextValue}>
      {children}
    </PokemonBaseContext.Provider>
  );
}

// Custom hook to use this context
export function usePokemonBase() {
  const context = useContext(PokemonBaseContext);
  if (context === undefined) {
    throw new Error("usePokemonBase must be used within a PokemonBaseProvider");
  }
  return context;
}
