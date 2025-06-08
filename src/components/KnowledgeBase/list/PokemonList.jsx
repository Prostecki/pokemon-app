import { useNavigate } from "react-router-dom";
import MenuButton from "../../StartMenu/MenuButton";
import SearchBar from "./SearchBar";
import { usePaginationContext } from "../../../contexts/PaginationContext";
import { useState } from "react";

export default function PokemonList({ onBackToMenu, searchQuery, onSearch }) {
  const navigate = useNavigate();
  const { characters, loadMorePokemon, totalCount, currentPage, onSelect } =
    usePaginationContext();
  const [isLoading, setIsLoading] = useState(false);

  const handlePokemonClick = (id) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadMorePokemon().finally(() => {
        setIsLoading(false);
      });
    }, 100);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Choose your Pokemon!</h1>
        {!searchQuery && (
          <div className="text-gray-600">
            {characters.length} of {totalCount || "???"} Pokémon loaded
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5"></div>
        <MenuButton onClick={() => navigate("/")}>Back to menu</MenuButton>
      </div>

      <SearchBar searchQuery={searchQuery} onSearch={onSearch} />

      {characters.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <p className="text-xl font-semibold text-gray-600">
            No Pokémon found with that name!
          </p>
          <p className="mt-2 text-gray-500">Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-10">
            {characters.map((character) => (
              <div
                key={character.id}
                className="p-2 md:p-3 lg:p-4 bg-stone-400/40 shadow cursor-pointer transition transform hover:scale-105"
                onClick={() => handlePokemonClick(character.id)}
              >
                <h3 className="mt-1 md:mt-2 text-center capitalize font-medium text-xs sm:text-sm md:text-base bg-gradient-to-r from-stone-400/40 via-stone-200 to-stone-400/40 rounded px-2 py-1">
                  {character.name}
                </h3>
                <img
                  src={
                    character.animatedImage
                      ? character.animatedImage
                      : character.image
                  }
                  alt={character.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain mx-auto"
                />
              </div>
            ))}
          </div>

          {!searchQuery && characters.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-200 disabled:bg-blue-300"
              >
                {isLoading ? "Загрузка..." : "Загрузить ещё покемонов"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
