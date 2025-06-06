import { useState, useEffect, useCallback } from "react";
import { fetchPokemonList, fetchPokemonByUrl } from "../api/pokemonApi";

export function usePokemonList(initialPage, itemsPerPage) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  const fetchPokemons = useCallback(
    async (page) => {
      setLoading(true);
      try {
        const data = await fetchPokemonList(page, itemsPerPage);
        setTotalItems(data.count);

        // Get detailed information for each Pokemon
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
            };
          })
        );

        setCharacters(characterDetails);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage]
  );

  return {
    characters,
    loading,
    error,
    totalItems,
    fetchPokemons,
  };
}
