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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Left: Main info and image */}
        <div className="border border-black/10 rounded-xl p-4 h-full flex flex-col items-center gap-4">
          <ChosenPokemon pokemon={pokemon} />
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold capitalize">
              {pokemon.name}{" "}
              <span className="text-gray-400">#{pokemon.id}</span>
            </h1>
            <div className="flex gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-white capitalize text-sm"
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-20 h-20 object-contain"
              />
              {pokemon.shinyImage && (
                <img
                  src={pokemon.shinyImage}
                  alt={pokemon.name + " shiny"}
                  className="w-20 h-20 object-contain"
                  title="Shiny"
                />
              )}
            </div>
          </div>
          <div className="mt-4 text-center text-gray-700">
            <p className="italic">{pokemon.description}</p>
          </div>
        </div>

        {/* Right: Stats and details */}
        <div className="border border-black/10 rounded-xl p-4 h-full flex flex-col gap-4">
          <h2 className="text-xl font-bold mb-2">Stats</h2>
          <PokemonStatsChart stats={pokemon.stats} />

          {/* Detail Info Block */}
          <PokemonDetailInfo pokemon={pokemon} />
        </div>

        {/* Evolutions */}
        <div className="md:col-span-2 border border-black/10 rounded-xl p-4 h-full mt-4">
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
    </div>
  );
}

// Helper for type color
function getTypeColor(type) {
  const typeColors = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  return typeColors[type] || "#777";
}
