import { useNavigate } from "react-router-dom";
import MenuButton from "../../StartMenu/MenuButton";
import SearchBar from "./SearchBar";
import { usePaginationContext } from "../../../contexts/PaginationContext";
import { useState } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonList({ searchQuery, onSearch }) {
  const navigate = useNavigate();
  const { characters, loadMorePokemon, onSelect } = usePaginationContext();
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
    <div className="p-4 bg-gray-100 min-h-screen overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Choose your Pokemon!</h1>
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
          <div className="flex flex-wrap gap- justify-center">
            {characters.map((character) => (
              <PokemonCard
                key={character.id}
                character={character}
                onClick={handlePokemonClick}
              />
            ))}
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
    </div>
  );
}
