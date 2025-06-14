import PokemonList from "./list/PokemonList";
import PokemonDetails from "./details/PokemonDetails";
import Header from "@/components/layout/Header";
import { PaginationProvider } from "../../contexts/PaginationContext";
import DetailLoader from "../common/DetailLoader";
import { usePokemonBase } from "../../contexts/PokemonBaseContext";

export default function PokemonBase({ onBackToMenu }) {
  // Get all necessary data and functions from the context
  const {
    isLoadingDetails,
    showDetails,
    pokemonDetails,
    evolutions,
    resetDetails,
    handleSelectPokemon,
    filteredPokemons,
    loading,
    searchQuery,
    handleSearch,
    selectedTypes,
    handleTypeFilterChange,
    currentPage,
    loadMore,
  } = usePokemonBase();

  return (
    <>
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
            <Header searchQuery={searchQuery} onSearch={handleSearch} />
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
    </>
  );
}
