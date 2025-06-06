import { useState, useCallback } from "react";
import { fetchPokemonByUrl, fetchPokemonSpecies } from "../utils/pokemonApi";

export function usePokemonDetails() {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchDetails = useCallback(async (pokemonData) => {
    if (!pokemonData || !pokemonData.url) {
      setError("No pokemon data provided");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchPokemonByUrl(pokemonData.url);
      const speciesData = await fetchPokemonSpecies(data.species.url);

      setPokemonDetails({
        ...pokemonData,
        height: data.height / 10, // converting to meters
        weight: data.weight / 10, // converting to kilograms
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
      setShowDetails(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetDetails = useCallback(() => {
    setShowDetails(false);
    setPokemonDetails(null);
  }, []);

  return {
    pokemonDetails,
    loading,
    error,
    showDetails,
    fetchDetails,
    resetDetails,
  };
}
