import { useNavigate } from "react-router-dom";

export default function Evolutions({ evolutions }) {
  const navigate = useNavigate();

  if (!evolutions || evolutions.length === 0) {
    return <p className="text-gray-500">No evolutions available.</p>;
  }

  return (
    <div className="w-full border border-black/10 rounded-2xl p-5">
      <h2 className="text-xl font-bold mb-4">Evolution Chain</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {evolutions.map((pokemon, index) => (
          <div key={pokemon.id} className="flex items-center">
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => navigate(`/base/${pokemon.id}`)}
            >
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-26 h-26 border border-black/20 drop-shadow-md rounded-full p-2 object-contain"
              />
              <div className="flex items-center gap-1 mt-1">
                <span className="capitalize">{pokemon.name}</span>
                <span className="text-gray-600 text-sm">#{pokemon.id}</span>
              </div>
            </div>

            {/* Add arrow between evolutions */}
            {index < evolutions.length - 1 && (
              <div className="mx-4 text-2xl">→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
