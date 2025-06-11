import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { usePaginationContext } from "../../../contexts/PaginationContext";
import { useState, useRef, useEffect } from "react";
import PokemonCard from "./PokemonCard";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { AnimatePresence, motion } from "framer-motion";
import UiverseInput from "./UiverseInput";

export default function PokemonList({ searchQuery, onSearch }) {
  const navigate = useNavigate();
  const { characters, loadMorePokemon, onSelect } = usePaginationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [prevCharactersCount, setPrevCharactersCount] = useState(0);
  const newPokemonRef = useRef(null);

  const handlePokemonClick = (id) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPrevCharactersCount(characters.length);
    setTimeout(() => {
      loadMorePokemon().finally(() => {
        setIsLoading(false);
      });
    }, 100);
  };

  return (
    <div className="p-10 pokemon-list-bg flex flex-col items-center min-h-screen overflow-x-hidden">
      <div className="flex w-1/2 justify-between items-center mb-4">
        <h1 id="top" className="text-3xl font-bold">
          Choose your Pokemon!
        </h1>
        <ShinyButton onClick={() => navigate("/")}>Back to menu</ShinyButton>
      </div>

      {/* <SearchBar searchQuery={searchQuery} onSearch={onSearch} /> */}
      <UiverseInput searchQuery={searchQuery} onSearch={onSearch} />

      {characters.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <p className="text-xl font-semibold text-gray-600">
            No Pokémon found with that name!
          </p>
          <p className="mt-2 text-gray-500">Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="mt-5 flex flex-wrap gap-1 justify-center">
            <AnimatePresence>
              {characters.map((character, index) => (
                <motion.div
                  key={character.id}
                  initial={
                    index >= prevCharactersCount
                      ? { opacity: 0 }
                      : { opacity: 1 }
                  }
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  ref={index === prevCharactersCount ? newPokemonRef : null}
                >
                  <PokemonCard
                    character={character}
                    onClick={handlePokemonClick}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {!searchQuery && characters.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-200 disabled:bg-blue-300"
              >
                {isLoading ? "Loading..." : "Load more..."}
              </button>
            </div>
          )}
        </>
      )}
      <ShinyButton
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fixed bottom-2 border border-black/10 right-2 bg-slate-200/40"
      >
        Up
      </ShinyButton>
    </div>
  );
}
