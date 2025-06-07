import { useState, useEffect } from "react";

// Custom hook to fetch and format detailed Pokémon data by ID
export function usePokemonDetailsData(id) {
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonData() {
      setLoading(true);
      try {
        // Fetch basic Pokémon data
        const pokemonData = await fetchPokemonById(id);

        // Fetch species data for additional info (like description and evolution chain)
        const speciesData = await fetchSpeciesData(pokemonData.species.url);

        // Fetch and process the evolution chain
        const evolutionData = await fetchEvolutionChain(
          speciesData.evolution_chain.url
        );

        // Format the Pokémon data for the UI
        const formattedPokemon = formatPokemonData(pokemonData, speciesData);
        setPokemon(formattedPokemon);
        setEvolutions(evolutionData);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemonData();
  }, [id]);

  return { pokemon, evolutions, loading, error };
}

// Helper function to fetch Pokémon data by ID
async function fetchPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
}

// Helper function to fetch species data (for description, evolution chain, etc.)
async function fetchSpeciesData(url) {
  const response = await fetch(url);
  return response.json();
}

// Helper function to fetch and process the evolution chain
async function fetchEvolutionChain(url) {
  const response = await fetch(url);
  const data = await response.json();

  // Extract evolution chain as a flat array
  const evolutionChain = [];
  let evoData = data.chain;

  // Add the first Pokémon in the chain
  evolutionChain.push({
    name: evoData.species.name,
    url: evoData.species.url,
  });

  // Process further evolutions in the chain
  while (evoData.evolves_to?.length > 0) {
    evoData = evoData.evolves_to[0];
    evolutionChain.push({
      name: evoData.species.name,
      url: evoData.species.url,
    });
  }

  // Fetch details for each evolution stage
  const detailedEvolutions = await Promise.all(
    evolutionChain.map(async (evo) => {
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

  return detailedEvolutions;
}

// Helper function to format Pokémon data for the UI
function formatPokemonData(pokemonData, speciesData) {
  // Calculate gender ratio (female %)
  let genderRate = speciesData.gender_rate;
  let genderRatio = null;
  if (genderRate === -1) {
    genderRatio = "Genderless";
  } else {
    genderRatio = {
      female: (genderRate / 8) * 100,
      male: ((8 - genderRate) / 8) * 100,
    };
  }

  // Get shiny sprite
  const shinyImage = pokemonData.sprites.other["official-artwork"].front_shiny;

  // Get egg groups
  const eggGroups = speciesData.egg_groups.map((g) => g.name);

  // Get habitat
  const habitat = speciesData.habitat?.name || "Unknown";

  // Get color
  const color = speciesData.color?.name || "Unknown";

  // Get growth rate
  const growthRate = speciesData.growth_rate?.name || "Unknown";

  // Get is legendary/mythical
  const isLegendary = speciesData.is_legendary;
  const isMythical = speciesData.is_mythical;

  // Get base experience
  const baseExperience = pokemonData.base_experience;

  // Get capture rate
  const captureRate = speciesData.capture_rate;

  // Get generation
  const generation = speciesData.generation?.name || "Unknown";

  // Get varieties (alternative forms)
  const varieties = speciesData.varieties
    ? speciesData.varieties.map((v) => ({
        name: v.pokemon.name,
        url: v.pokemon.url,
        is_default: v.is_default,
      }))
    : [];

  // Get up to 3 moves (for wow effect)
  const moves = pokemonData.moves
    .slice(0, 3)
    .map((m) => m.move.name.replace("-", " "));

  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.other["official-artwork"].front_default,
    shinyImage,
    height: pokemonData.height / 10, // meters
    weight: pokemonData.weight / 10, // kilograms
    types: pokemonData.types.map((t) => t.type.name),
    abilities: pokemonData.abilities.map((a) => a.ability.name),
    stats: pokemonData.stats.map((s) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    description:
      speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      )?.flavor_text || "No description available",
    genderRatio,
    eggGroups,
    habitat,
    color,
    growthRate,
    isLegendary,
    isMythical,
    baseExperience,
    captureRate,
    generation,
    varieties,
    moves,
  };
}
