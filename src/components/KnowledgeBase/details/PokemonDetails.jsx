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

  // Display loading component
  if (loading) {
    return <PokemonDetailsLoading />;
  }

  // Error handling
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-100 text-red-700 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error loading Pokémon</h2>
          <p>{error}</p>
          <button
            onClick={() =>
              navigate("/base", { state: { returnToPage: fromPage } })
            }
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Back to all Pokémon
          </button>
        </div>
      </div>
    );
  }

  // Check that data is loaded
  if (!pokemon) {
    return null;
  }

  return (
    <div className="p-8 flex flex-col items-start max-w-6xl mx-auto">
      <button
        onClick={() => navigate("/base", { state: { returnToPage: fromPage } })}
        className="mb-4 px-4 py-2 w-max bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back to all Pokémon
      </button>

      {/* 2x2 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Chosen Pokemon - Top Left */}
        <div className="border border-black/10 rounded-xl p-4 h-full flex items-center justify-center">
          <ChosenPokemon pokemon={pokemon} />
        </div>

        {/* Detail Info - Bottom Left */}
        <div className="border border-black/10 rounded-xl p-4 h-full">
          <PokemonDetailInfo pokemon={pokemon} />
          {/* Stats Chart - Top Right */}
          <PokemonStatsChart stats={pokemon.stats} />
        </div>

        {/* Evolutions - Bottom Right */}
        <div className="p-4 h-full">
          {evolutions.length > 1 ? (
            <Evolutions evolutions={evolutions} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No evolutions available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
