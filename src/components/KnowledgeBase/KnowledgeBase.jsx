import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";
import { usePagination } from "../../hooks/usePagination";
import { usePokemonList } from "../../hooks/usePokemonList";
import { usePokemonDetails } from "../../hooks/usePokemonDetails";
import { PaginationProvider } from "../../contexts/PaginationContext";

export default function KnowledgeBase({ onBackToMenu }) {
  const location = useLocation();
  const returnToPage = location.state?.returnToPage || 1;
  const ITEMS_PER_PAGE = 40; // Было 20, стало 40

  // using custom hooks for pagination and data fetching
  const {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    updateTotalItems,
  } = usePagination(returnToPage, 0, ITEMS_PER_PAGE);

  const {
    characters,
    loading: listLoading,
    error: listError,
    totalItems,
    fetchPokemons,
  } = usePokemonList(currentPage, ITEMS_PER_PAGE);

  const {
    pokemonDetails,
    loading: detailsLoading,
    error: detailsError,
    showDetails,
    fetchDetails,
    resetDetails,
  } = usePokemonDetails();

  // update total items when the totalItems changes
  useEffect(() => {
    updateTotalItems(totalItems);
  }, [totalItems, updateTotalItems]);

  // loading pokemons when the component mounts or currentPage changes
  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage, fetchPokemons]);

  // listener for details loading
  const handleSelectPokemon = (id) => {
    const selected = characters.find((char) => char.id === id);
    if (selected) {
      fetchDetails(selected);
    }
  };

  const handleNextPage = () => {
    goToPage(nextPage());
  };

  const handlePrevPage = () => {
    goToPage(prevPage());
  };

  const handleGoToPage = (page) => {
    goToPage(page);
  };

  // display loading state
  if (listLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl font-bold">Loading pokemons...</p>
      </div>
    );
  }

  // display error state for pokemon list
  if (listError) {
    return <p>Error: {listError}</p>;
  }

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
      characters={characters}
      currentPage={currentPage}
      totalPages={totalPages}
      onPrevPage={handlePrevPage}
      onNextPage={handleNextPage}
      onGoToPage={handleGoToPage}
      onSelect={handleSelectPokemon}
    >
      <PokemonList onBackToMenu={onBackToMenu} />
    </PaginationProvider>
  );
}
