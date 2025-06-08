import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import PokemonList from "./list/PokemonList";
import PokemonDetails from "./details/PokemonDetails";
import { usePokemon } from "../../hooks/usePokemon"; // Unified hook import
import { PaginationProvider } from "../../contexts/PaginationContext";

export default function KnowledgeBase({ onBackToMenu }) {
  // Constants and state
  const ITEMS_PER_PAGE = 40;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
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

  // Load a page of pokemons (wrapper over API hook)
  const handleLoadPage = useCallback(
    async (page) => {
      if (loading) return;

      const newPokemons = await loadPokemonPage(page, ITEMS_PER_PAGE);

      // Add only new pokemons to the list
      setAllPokemons((prevPokemons) => {
        const existingIds = new Set(prevPokemons.map((p) => p.id));
        const uniqueNewPokemons = newPokemons.filter(
          (p) => !existingIds.has(p.id)
        );
        return [...prevPokemons, ...uniqueNewPokemons];
      });

      setCurrentPage(page + 1);
    },
    [ITEMS_PER_PAGE, loading, loadPokemonPage]
  );

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
      fetchDetails(id);
    },
    [fetchDetails]
  );

  // Determine which pokemons to display (search or all)
  const displayedPokemons = searchQuery ? searchResults : allPokemons;

  return (
    <div className="">
      {showDetails ? (
        <PokemonDetails
          pokemon={pokemonDetails}
          evolutions={evolutions}
          onBack={resetDetails}
          onSelectEvolution={handleSelectPokemon}
        />
      ) : (
        <PaginationProvider
          characters={displayedPokemons}
          currentPage={currentPage}
          loadMorePokemon={loadMore}
          onSelect={handleSelectPokemon}
        >
          <>
            <PokemonList
              onBackToMenu={onBackToMenu}
              searchQuery={searchQuery}
              onSearch={handleSearch}
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
