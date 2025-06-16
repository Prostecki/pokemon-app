import { useState, useCallback } from "react";
import { fetchPokemonList, fetchPokemonByUrl } from "../utils/pokemonApi";

export function usePokemon(itemsPerPage = 40) {
  // List of pokemons for display
  const [pokemons, setPokemons] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Details of the selected pokemon
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  // Load a page of pokemons with detailed images
  const loadPokemonPage = useCallback(
    async (page) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPokemonList(page, itemsPerPage);
        setTotalCount(data.count);

        // Fetch details for each pokemon card (for better images)
        const characterDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetchPokemonByUrl(pokemon.url);
            return {
              id: details.id,
              name: details.name,
              image: details.sprites.other["official-artwork"].front_default,
              animatedImage:
                details.sprites.versions?.["generation-v"]?.["black-white"]
                  ?.animated?.front_default || null,
              url: pokemon.url,
              types: details.types.map((t) => t.type.name),
              baseExp: details.base_experience,
            };
          })
        );

        setPokemons(characterDetails);
        return characterDetails;
      } catch (err) {
        setError(err.message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage]
  );

  // Search pokemons by name (basic info, no details)
  const searchPokemon = useCallback(async (query) => {
    if (!query.trim()) return [];
    setLoading(true);
    setError(null);
    try {
      let allPokemon = sessionStorage.getItem("all_pokemon");
      if (!allPokemon) {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        allPokemon = JSON.stringify(data.results);
        sessionStorage.setItem("all_pokemon", allPokemon);
      } else {
        allPokemon = JSON.parse(allPokemon);
      }
      const lowerQuery = query.toLowerCase();
      const matches = allPokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerQuery)
      );
      // For search, use basic images, no details
      return matches.map((pokemon) => {
        const id = pokemon.url.split("/")[6];
        return {
          id,
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        };
      });
    } catch (err) {
      setError("Search failed: " + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Extract evolution chain for a pokemon
  const extractEvolutionChain = useCallback(async (chain) => {
    const evolutions = [];
    let current = chain;
    while (current) {
      const id = current.species.url.split("/").filter(Boolean).pop();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      evolutions.push({
        id,
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
      });
      current = current.evolves_to[0];
    }
    return evolutions;
  }, []);

  // Fetch detailed info for a selected pokemon
  const fetchDetails = useCallback(
    async (id) => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) throw new Error("Failed to fetch pokemon data");
        const data = await response.json();

        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok)
          throw new Error("Failed to fetch species data");
        const speciesData = await speciesResponse.json();

        // Fetch evolution chain
        if (speciesData.evolution_chain?.url) {
          const evolutionResponse = await fetch(
            speciesData.evolution_chain.url
          );
          if (evolutionResponse.ok) {
            const evolutionData = await evolutionResponse.json();
            const evolutionChain = await extractEvolutionChain(
              evolutionData.chain
            );
            setEvolutions(evolutionChain);
          }
        }

        // Get description from species data
        const description =
          speciesData.flavor_text_entries?.find(
            (entry) => entry.language.name === "en"
          )?.flavor_text || "No description available";

        setPokemonDetails({
          id: data.id,
          name: data.name,
          height: data.height / 10,
          weight: data.weight / 10,
          types: data.types.map((t) => t.type.name),
          stats: data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
          abilities: data.abilities.map((a) => a.ability.name),
          baseExperience: data.base_experience,
          description: description,
          moves: data.moves
            .map((m) => ({
              name: m.move.name,
              url: m.move.url,
            }))
            .slice(0, 20),
          image:
            data.sprites.other["official-artwork"].front_default ||
            data.sprites.front_default,
          shinyImage:
            data.sprites.other["official-artwork"].front_shiny ||
            data.sprites.front_shiny,
          habitat: speciesData.habitat?.name || "Unknown",
          color: speciesData.color?.name || "Unknown",
          growthRate: speciesData.growth_rate?.name || "Unknown",
          captureRate: speciesData.capture_rate || "Unknown",
          generation: speciesData.generation?.name || "Unknown",
        });
        setShowDetails(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [extractEvolutionChain]
  );

  // Reset pokemon details view
  const resetDetails = useCallback(() => {
    setShowDetails(false);
  }, []);

  return {
    pokemons, // list for display
    totalCount,
    loading,
    error,
    loadPokemonPage,
    searchPokemon,
    fetchDetails,
    resetDetails,
    pokemonDetails,
    evolutions,
    showDetails,
  };
}
