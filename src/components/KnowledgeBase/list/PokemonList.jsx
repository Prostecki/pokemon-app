import { useNavigate } from "react-router-dom";
import MenuButton from "../../StartMenu/MenuButton";
import SearchBar from "./SearchBar";
import { usePaginationContext } from "../../../contexts/PaginationContext";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";

export default function PokemonList({ onBackToMenu, searchQuery, onSearch }) {
  const navigate = useNavigate();
  const { characters, currentPage, loadMorePokemon } = usePaginationContext();
  
  const { isFetching, setObserverTarget } = useInfiniteScroll(loadMorePokemon);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5">
          <h1 className="text-3xl font-bold">Choose your Pokemon!</h1>
          <MenuButton onClick={() => navigate("/")}>Back to menu</MenuButton>
        </div>
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
                onClick={() =>
                  navigate(`/base/${character.id}`, {
                    state: { fromPage: currentPage },
                  })
                }
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
          
          {/* Loading indicator and observer target */}
          <div 
            ref={setObserverTarget} 
            className="flex justify-center items-center py-8"
          >
            {isFetching && (
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
