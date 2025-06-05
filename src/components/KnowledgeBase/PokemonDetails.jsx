import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PokemonStatsChart } from "./PokemonStatsChart";
import ChosenPokemon from "./ChosenPokemon";

export default function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();
      setPokemon({
        id: data.id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
        height: data.height / 10,
        weight: data.weight / 10,
        types: data.types.map((t) => t.type.name),
        abilities: data.abilities.map((a) => a.ability.name),
        stats: data.stats.map((s) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
        description:
          speciesData.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          )?.flavor_text || "No description available",
      });
      setLoading(false);
    }
    fetchPokemon();
  }, [id]);

  if (loading || !pokemon) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <button
        onClick={() => navigate("/base")}
        className="mb-4 px-4 py-2 w-max bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Back to all Pokémon
      </button>
      <div className="flex flex-col gap-8 w-full items-center">
        <div className="bg-black/10 p-6 rounded-lg h-max shadow">
          <ChosenPokemon pokemon={pokemon} />
        </div>
        {/* Адаптивная верстка для stats и details */}
        <div className="flex flex-col justify-center lg:flex-row gap-5 w-full max-w-6xl">
          <div className="w-full lg:w-1/2 border border-black/10 rounded-2xl p-5 min-h-[350px]">
            <PokemonStatsChart stats={pokemon.stats} />
          </div>
          <div className="w-full lg:w-1/2 border border-black/10 rounded-2xl flex">
            <div className="p-5 rounded-lg mt-4 w-full">
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
    </div>
  );
}
