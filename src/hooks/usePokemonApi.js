import { useState, useCallback } from "react";

// Форматирование данных о покемонах
const formatPokemonData = (pokemon) => {
  const id = pokemon.url.split("/")[6];
  return {
    id,
    name: pokemon.name,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    animatedImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
  };
};

export function usePokemonAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загрузка страницы покемонов
  const loadPokemonPage = useCallback(async (page, itemsPerPage) => {
    setLoading(true);
    setError(null);

    try {
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );

      if (!response.ok) throw new Error("Failed to fetch Pokémon data");

      const data = await response.json();
      const formattedPokemons = data.results.map(formatPokemonData);

      return formattedPokemons;
    } catch (err) {
      setError(err.message);
      console.error("Error loading Pokemon:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Поиск покемонов
  const searchPokemon = useCallback(async (query) => {
    if (!query.trim()) return [];

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1000"
      );
      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();

      const lowerQuery = query.toLowerCase();
      const matches = data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(lowerQuery)
      );

      return matches.map(formatPokemonData);
    } catch (err) {
      setError("Search failed: " + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loadPokemonPage,
    searchPokemon,
    loading,
    error,
  };
}
