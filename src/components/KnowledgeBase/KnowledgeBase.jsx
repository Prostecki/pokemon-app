import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import PokemonList from "./list/PokemonList";
import PokemonDetails from "./details/PokemonDetails";
import Loading from "../common/Loading";
import { usePokemon } from "../../hooks/usePokemon"; // Unified hook import
import { PaginationProvider } from "../../contexts/PaginationContext";
import DetailLoader from "../common/DetailLoader";

export default function KnowledgeBase({ onBackToMenu }) {
  // Constants and state
  const ITEMS_PER_PAGE = 40;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); // New loading state
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
  }, []); // empty dependency for mount only

  // Search handler with debounce
  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);

      // Cancel previous timeout if exists
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Set new timeout for search
      searchTimeoutRef.current = setTimeout(async () => {
        if (!query.trim()) {
          setSearchResults([]);
          return;
        }

        const results = await searchPokemon(query);
        setSearchResults(results);
      }, 300);
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

  return (
    <div className="">
      {isLoadingDetails ? (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <DetailLoader />
        </div>
      ) : showDetails ? (
        <PokemonDetails
          pokemon={pokemonDetails}
          evolutions={evolutions}
          onBack={resetDetails}
          onSelectEvolution={handleSelectPokemon}
        />
      ) : (
        <PaginationProvider
          characters={filteredPokemons}
          currentPage={currentPage}
          loadMorePokemon={loadMore}
          onSelect={handleSelectPokemon}
        >
          <>
            <PokemonList
              onBackToMenu={onBackToMenu}
              searchQuery={searchQuery}
              onSearch={handleSearch}
              selectedTypes={selectedTypes}
              onTypeFilterChange={handleTypeFilterChange}
            />
            {loading && (
              <div className="flex justify-center my-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        </PaginationProvider>
      )}
    </div>
  );
}
