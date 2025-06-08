import { useParams, useNavigate, useLocation } from "react-router-dom";
import PokemonStatsChart from "./PokemonStatsChart";
import ChosenPokemon from "./ChosenPokemon";
import PokemonDetailInfo from "./PokemonDetailInfo";
import Evolutions from "./Evolutions";
import PokemonDetailsLoading from "./PokemonDetailsLoading";
import { usePokemonDetailsData } from "../../../hooks/usePokemonDetailsData";

export default function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;

  // Using custom hook to fetch data
  const { pokemon, evolutions, loading, error } = usePokemonDetailsData(id);

  if (loading) {
    return <PokemonDetailsLoading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <div className="p-4 sm:p-6 bg-red-100 text-red-700 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-2">Error loading Pokémon</h2>
          <p>{error}</p>
          <button
            onClick={() =>
              navigate("/base", { state: { returnToPage: fromPage } })
            }
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 w-full sm:w-auto"
          >
            Back to all Pokémon
          </button>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col items-start max-w-6xl mx-auto">
      <button
        onClick={() => navigate("/base", { state: { returnToPage: fromPage } })}
        className="mb-4 px-3 py-1.5 sm:px-4 sm:py-2 w-max bg-gray-500 text-white rounded hover:bg-gray-600 text-sm sm:text-base"
      >
        Back to all Pokémon
      </button>

      {/* Main content - flex col on mobile, row on larger screens */}
      <div className="flex flex-col md:flex-row w-full md:gap-6">
        {/* Left: Main info and image - full width on mobile, half on larger */}
        <div className="w-full md:w-1/2 md:pr-4">
          <ChosenPokemon pokemon={pokemon} />
          {/* Evolutions */}
          <div className="rounded-xl p-3 sm:p-4 mt-4">
            <h2 className="text-lg sm:text-xl font-bold my-2 sm:my-4 text-center">
              Evolutions
            </h2>
            {evolutions.length > 1 ? (
              <Evolutions evolutions={evolutions} />
            ) : (
              <div className="flex items-center justify-center h-full py-8">
                <p className="text-gray-500">No evolutions available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Stats and details - full width on mobile, half on larger */}
        <div className="w-full md:w-1/2 border border-black/10 rounded-xl p-3 sm:p-4 h-full flex flex-col gap-3 sm:gap-4 mt-4 md:mt-0">
          <div className="mb-2 sm:mb-3">
            <h2 className="text-lg sm:text-xl font-bold">About:</h2>
            <p className="mt-1 text-sm sm:text-base">{pokemon.description}</p>
          </div>
          <div className="h-56 sm:h-64">
            <PokemonStatsChart stats={pokemon.stats} />
          </div>
          {/* Detail Info Block */}
          <PokemonDetailInfo pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
