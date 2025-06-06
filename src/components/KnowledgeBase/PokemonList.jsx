import { useNavigate } from "react-router-dom";
import MenuButton from "../StartMenu/MenuButton";
import PaginationBlock from "./PaginationBlock";
import { usePaginationContext } from "../../contexts/PaginationContext";

export default function PokemonList({ onBackToMenu }) {
  const navigate = useNavigate();
  const { characters, currentPage } = usePaginationContext();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-center gap-5 items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Choose your Pokemon!</h1>
        <MenuButton onClick={() => navigate("/")}>Back to menu</MenuButton>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer transition transform hover:scale-105"
            onClick={() =>
              navigate(`/base/${character.id}`, {
                state: { fromPage: currentPage },
              })
            }
          >
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-32 object-contain"
            />
            <h3 className="mt-2 text-center capitalize font-medium">
              {character.name}
            </h3>
          </div>
        ))}
      </div>
      <PaginationBlock />
    </div>
  );
}
