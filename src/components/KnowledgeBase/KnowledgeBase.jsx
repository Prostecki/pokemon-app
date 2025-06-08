import { useEffect, useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import PokemonList from "./list/PokemonList";
import PokemonDetails from "./details/PokemonDetails";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { PaginationProvider } from "../../contexts/PaginationContext";

// Helper function to format pokemon data
const formatPokemonData = (pokemon) => {
  const id = pokemon.url.split("/")[6];
  return {
    id,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    animatedImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
  };
};

export default function KnowledgeBase({ onBackToMenu }) {
  const ITEMS_PER_PAGE = 40;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    pokemonDetails,
    loading: detailsLoading,
    showDetails,
    fetchDetails,
    resetDetails,
  } = usePokemonDetails();

  // Fetch pokemons from API and append to the list
  const fetchPokemons = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const offset = (page - 1) * ITEMS_PER_PAGE;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${offset}`
        );
        const data = await response.json();
        const processedPokemons = data.results.map(formatPokemonData);
        setAllPokemons((prev) => [...prev, ...processedPokemons]);
        setCurrentPage(page + 1);
        return processedPokemons;
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [ITEMS_PER_PAGE]
  );

  // Initial load
  useEffect(() => {
    fetchPokemons(1);
  }, [fetchPokemons]);

  // Load more pokemons for infinite scroll
  const loadMorePokemon = useCallback(
    () => fetchPokemons(currentPage),
    [fetchPokemons, currentPage]
  );

  // Handle pokemon selection
  const handleSelectPokemon = useCallback(
    (id) => {
      const selected = allPokemons.find((char) => char.id === id);
      if (selected) fetchDetails(selected);
    },
    [allPokemons, fetchDetails]
  );

  // Memoize filtered list to avoid unnecessary renders
  const filteredCharacters = useMemo(
    () =>
      searchQuery
        ? allPokemons.filter((char) =>
            char.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : allPokemons,
    [allPokemons, searchQuery]
  );

  // Conditional rendering for loading, error, and details states
  if (loading && allPokemons.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl font-bold">Loading pokemons...</p>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  if (detailsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl font-bold">Loading pokemon details...</p>
      </div>
    );
  }

  if (showDetails && pokemonDetails) {
    return <PokemonDetails pokemon={pokemonDetails} onBack={resetDetails} />;
  }

  return (
    <PaginationProvider
      characters={filteredCharacters}
      currentPage={currentPage}
      loadMorePokemon={loadMorePokemon}
      onSelect={handleSelectPokemon}
    >
      <PokemonList
        onBackToMenu={onBackToMenu}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />
    </PaginationProvider>
  );
}
