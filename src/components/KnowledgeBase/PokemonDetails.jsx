import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { PokemonStatsChart } from "./PokemonStatsChart";
import ChosenPokemon from "./ChosenPokemon";
import PokemonDetailInfo from "./PokemonDetailInfo";
import Evolutions from "./Evolutions";

export default function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      try {
        // Fetch basic Pokemon data
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        // Fetch species data
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();

        // Fetch evolution chain data
        const evolutionResponse = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionResponse.json();

        // Process evolution data
        const evolutionChain = [];
        let evoData = evolutionData.chain;

        // Process the first Pokemon in the chain
        const firstPokemon = {
          name: evoData.species.name,
          url: evoData.species.url,
        };
        evolutionChain.push(firstPokemon);

        // Process evolutions in the chain
        while (evoData.evolves_to?.length > 0) {
          evoData = evoData.evolves_to[0];
          evolutionChain.push({
            name: evoData.species.name,
            url: evoData.species.url,
          });
        }

        // Fetch additional details for each evolution
        const detailedEvolutions = await Promise.all(
          evolutionChain.map(async (evo) => {
            // Extract ID from URL
            const evoId = evo.url.split("/").filter(Boolean).pop();
            const evoResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${evoId}`
            );
            const evoData = await evoResponse.json();

            return {
              id: evoData.id,
              name: evoData.name,
              image: evoData.sprites.other["official-artwork"].front_default,
            };
          })
        );

        setEvolutions(detailedEvolutions);

        // Set Pokemon data
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
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
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
