import { useState, useRef, useEffect, useCallback } from "react";
import PokemonCard from "./PokemonCard";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { motion } from "framer-motion";
import TypeFilter from "../../common/TypeFilter";
import { usePokemonBase } from "../../../contexts/PokemonBaseContext";
import "./PokemonList.css";

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
    <div className="pokemon-list-container">
      {/* Fixed left sidebar */}
      <div className="pokemon-sidebar">
        <div className="sidebar-content">
          <div className="filter-container">
            <TypeFilter
              activeTypes={selectedTypes}
              onFilterChange={handleTypeFilterChange}
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="main-content">
        <div className="content-wrapper">
          <div className="content-header"></div>

          {characters.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-title">
                No Pokémon found with that name or type!
              </p>
              <p className="empty-state-subtitle">
                Try a different search term
              </p>
            </div>
          ) : (
            <div className="w-full">
              {/* CSS Grid layout for cards */}
              <div className="pokemon-grid">
                {characters.map((character, index) => (
                  <motion.div
                    key={character.id}
                    initial={{ opacity: index >= prevCharactersCount ? 0 : 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    ref={index === prevCharactersCount ? newPokemonRef : null}
                    className="pokemon-card-wrapper"
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
                <div ref={loadMoreRef} className="load-more-container">
                  {isLoading && <div className="loading-spinner"></div>}
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
        className="scroll-top-button"
      >
        Up
      </ShinyButton>
    </div>
  );
}
