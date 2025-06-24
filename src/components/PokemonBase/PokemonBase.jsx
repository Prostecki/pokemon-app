import PokemonList from "./list/PokemonList";
import PokemonDetails from "./details/PokemonDetails";
import Header from "@/components/layout/Header";
import DetailLoader from "../common/DetailLoader";
import { usePokemonBase } from "../../contexts/PokemonBaseContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function PokemonBase({ onBackToMenu }) {
  const location = useLocation();
  // Get all necessary data and functions from the context
  const {
    isLoadingDetails,
    showDetails,
    pokemonDetails,
    evolutions,
    resetDetails,
    handleSelectPokemon,
    searchQuery,
    handleSearch,
    selectedTypes,
    handleTypeFilterChange,
  } = usePokemonBase();

  // Reset details when location is exactly /base
  useEffect(() => {
    if (location.pathname === "/base" && showDetails) {
      resetDetails();
    }
  }, [location, resetDetails, showDetails]);

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
        <>
          <Header searchQuery={searchQuery} onSearch={handleSearch} />
          <PokemonList
            onBackToMenu={onBackToMenu}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            selectedTypes={selectedTypes}
            onTypeFilterChange={handleTypeFilterChange}
          />
        </>
      )}
    </>
  );
}
