import { useNavigate } from "react-router-dom";

export default function PokemonList({ characters }) {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-center gap-5 items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Choose your Pokemon!</h1>
        <button
          onClick={() => navigate("/")}
          className="border-1 border-gray-500/50 rounded-xl bg-blue-500 text-white cursor-pointer hover:scale-105 duration-200 px-4 py-2"
        >
          Back to Menu
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className="p-4 bg-white rounded-lg shadow cursor-pointer transition transform hover:scale-105"
            onClick={() => navigate(`/base/${character.id}`)}
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
    </div>
  );
}
