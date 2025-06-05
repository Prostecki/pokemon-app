import { PokemonStatsChart } from "./PokemonStatsChart";
import ChosenPokemon from "./ChosenPokemon";

export default function PokemonDetails({ pokemon, onBack }) {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back to all Pokémon
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - chosen pokemon */}
        <div className="bg-white p-6 rounded-lg shadow">
          <ChosenPokemon pokemon={pokemon} />
        </div>

        {/* Right column - details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <PokemonStatsChart stats={pokemon.stats} />
          <div className="bg-gray-500/10 p-5 border-1 border-gray-500/50 rounded-lg mt-4">
            <h2 className="text-xl font-bold mb-4">Details</h2>

            <div className="mb-3">
              <h3 className="font-semibold">Description:</h3>
              <p className="mt-1">{pokemon.description}</p>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold">Physical:</h3>
              <p className="mt-1">Height: {pokemon.height}m</p>
              <p>Weight: {pokemon.weight}kg</p>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold">Types:</h3>
              <div className="flex gap-2 mt-1">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <h3 className="font-semibold">Abilities:</h3>
              <ul className="list-disc pl-5 mt-1">
                {pokemon.abilities.map((ability) => (
                  <li key={ability}>{ability}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
