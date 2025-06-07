import { useNavigate } from "react-router-dom";

export default function Evolutions({ evolutions }) {
  const navigate = useNavigate();

  if (!evolutions || evolutions.length === 0) {
    return <p className="text-gray-500">No evolutions available.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 p-2 sm:p-4">
      {evolutions.map((pokemon, index) => (
        <div key={pokemon.id} className="flex items-center">
          <div
            className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
            onClick={() => navigate(`/base/${pokemon.id}`)}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border border-black/20 drop-shadow-md rounded-full p-1 sm:p-2 object-contain bg-white"
            />
            <div className="flex flex-col sm:flex-row items-center gap-1 mt-1">
              <span className="capitalize text-xs sm:text-sm md:text-base font-medium">
                {pokemon.name}
              </span>
              <span className="text-gray-600 text-xs sm:text-sm">
                #{pokemon.id}
              </span>
            </div>
          </div>

          {/* Add arrow between evolutions */}
          {index < evolutions.length - 1 && (
            <div className="mx-2 sm:mx-3 md:mx-4 text-xl sm:text-2xl text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
