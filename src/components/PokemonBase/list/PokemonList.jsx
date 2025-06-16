import { useState, useRef, useEffect, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { motion } from "framer-motion";
import TypeFilter from "../../common/TypeFilter";
import { usePokemonBase } from "../../../contexts/PokemonBaseContext"; // Add import

export default function PokemonList() {
  // Get all necessary data directly from PokemonBaseContext
  const {
    filteredPokemons: characters,
    loadMore: loadMorePokemon,
    handleSelectPokemon: onSelect,
    searchQuery,
    selectedTypes,
    handleTypeFilterChange,
  } = usePokemonBase();

  const [isLoading, setIsLoading] = useState(false);
  const [prevCharactersCount, setPrevCharactersCount] = useState(0);
  const newPokemonRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Function to load more pokemons
  const loadMore = useCallback(() => {
    if (isLoading || searchQuery) return;

    setIsLoading(true);
    setPrevCharactersCount(characters.length);

    setTimeout(() => {
      loadMorePokemon().finally(() => {
        setIsLoading(false);
      });
    }, 100);
  }, [isLoading, searchQuery, characters.length, loadMorePokemon]);

  // Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && !searchQuery) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMore, isLoading, searchQuery]);

  // Handler for clicking on a pokemon card
  const handlePokemonClick = (id) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  return (
    <div className="pokemon-list-bg min-h-screen pt-14 overflow-x-hidden flex">
      {/* Fixed left sidebar */}
      <div
        className="fixed top-0 left-0 h-full overflow-y-auto bg-gray-50/80 backdrop-blur-sm z-20"
        style={{ width: "28rem", boxShadow: "4px 0 10px rgba(0,0,0,0.05)" }}
      >
        <div className="sticky top-25 p-4">
          <div className="mt-6">
            <TypeFilter
              activeTypes={selectedTypes}
              onFilterChange={handleTypeFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ marginLeft: "30rem" }} className="flex-1 p-6">
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full justify-between items-center mb-8"></div>

          {characters.length === 0 ? (
            <div className="text-center p-10 bg-white rounded-lg shadow w-full">
              <p className="text-xl font-semibold text-gray-600">
                No Pokémon found with that name or type!
              </p>
              <p className="mt-2 text-gray-500">Try a different search term</p>
            </div>
          ) : (
            <div className="w-full">
              {/* CSS Grid layout for cards */}
              <div
                className="grid gap-4 w-full"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  justifyItems: "center",
                }}
              >
                {characters.map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ opacity: index >= prevCharactersCount ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    ref={index === prevCharactersCount ? newPokemonRef : null}
                    className="w-full flex justify-center"
                  >
                    <PokemonCard
                      character={character}
                      onClick={handlePokemonClick}
                    />
                  </motion.div>
                ))}
              </div>
              {/* "Load more" button for pagination */}
              {!searchQuery && characters.length > 0 && (
                <div
                  ref={loadMoreRef}
                  className="h-20 w-full flex items-center justify-center my-4"
                >
                  {isLoading && (
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll to top button */}
      <ShinyButton
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fixed bottom-2 border border-black/10 right-2 bg-slate-200/40 z-20"
      >
        Up
      </ShinyButton>
    </div>
  );
}
