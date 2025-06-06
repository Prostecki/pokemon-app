import { useState, useEffect } from "react";

export function usePokemonDetailsData(id) {
  const [pokemon, setPokemon] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemonData() {
      setLoading(true);
      try {
        // Fetch basic Pokemon data
        const pokemonData = await fetchPokemonById(id);

        // Fetch species data
        const speciesData = await fetchSpeciesData(pokemonData.species.url);

        // Fetch and process evolution chain
        const evolutionData = await fetchEvolutionChain(
          speciesData.evolution_chain.url
        );

        // Format the Pokemon data
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

// Вспомогательные функции
async function fetchPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return response.json();
}

async function fetchSpeciesData(url) {
  const response = await fetch(url);
  return response.json();
}

async function fetchEvolutionChain(url) {
  const response = await fetch(url);
  const data = await response.json();

  // Extract evolution chain
  const evolutionChain = [];
  let evoData = data.chain;

  // First Pokemon in chain
  evolutionChain.push({
    name: evoData.species.name,
    url: evoData.species.url,
  });

  // Process evolutions in the chain
  while (evoData.evolves_to?.length > 0) {
    evoData = evoData.evolves_to[0];
    evolutionChain.push({
      name: evoData.species.name,
      url: evoData.species.url,
    });
  }

  // Fetch details for each evolution
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

function formatPokemonData(pokemonData, speciesData) {
  return {
    id: pokemonData.id,
    name: pokemonData.name,
    image: pokemonData.sprites.other["official-artwork"].front_default,
    height: pokemonData.height / 10,
    weight: pokemonData.weight / 10,
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
  };
}
