import { useParams, useNavigate, useLocation } from "react-router-dom";
import PokemonStatsChart from "./PokemonStatsChart";
import ChosenPokemon from "./ChosenPokemon";
import PokemonDetailInfo from "./PokemonDetailInfo";
import Evolutions from "./Evolutions";
import PokemonDetailsLoading from "./PokemonDetailsLoading";
import { usePokemonDetailsData } from "../../../hooks/usePokemonDetailsData";
import getTypeColor from "../../../utils/getTypeColor";

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

      <div className="flex  w-full">
        {/* Left: Main info and image */}
        <div>
          <ChosenPokemon pokemon={pokemon} />
          {/* Evolutions */}
          <div className="md:col-span-2 rounded-xl p-4 h-full mt-4">
            <h2 className="text-xl font-bold mb-2">Evolutions</h2>
            {evolutions.length > 1 ? (
              <Evolutions evolutions={evolutions} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No evolutions available</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Stats and details */}
        <div className="border border-black/10 rounded-xl p-4 h-full flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">Stats</h2>
          <PokemonStatsChart stats={pokemon.stats} />

          {/* Detail Info Block */}
          <PokemonDetailInfo pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
