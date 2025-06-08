import { useState, useCallback } from "react";

export function usePokemonData() {
  // Общие состояния из обоих хуков
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [evolutions, setEvolutions] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Функция форматирования из usePokemonAPI
  const formatPokemonData = (pokemon) => {
    const id = pokemon.url.split("/")[6];
    return {
      id,
      name: pokemon.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      animatedImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
    };
  };

  // Загрузка страницы покемонов из usePokemonAPI
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

      if (page === 1) {
        setTotalCount(data.count || 0);
      }

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

  // Поиск покемонов из usePokemonAPI
  const searchPokemon = useCallback(async (query) => {
    if (!query.trim()) return [];

    setLoading(true);
    setError(null);

    try {
      // Кешировать результаты всех покемонов в sessionStorage
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

      return matches.map(formatPokemonData);
    } catch (err) {
      setError("Search failed: " + err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Извлечение цепочки эволюции - объединяем обе версии, используя более полную из usePokemonDetails
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

      current = current.evolves_to[0]; // Переходим к следующей эволюции
    }

    return evolutions;
  }, []);

  // Получение деталей о конкретном покемоне - берем более полную версию из usePokemonDetails
  const fetchDetails = useCallback(
    async (id) => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        // Базовая информация о покемоне
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok)
          throw new Error("Не удалось получить данные о покемоне");

        const data = await response.json();

        // Запрос данных о виде для цепочки эволюции
        const speciesResponse = await fetch(data.species.url);
        if (!speciesResponse.ok)
          throw new Error("Не удалось получить данные о виде");

        const speciesData = await speciesResponse.json();

        // Запрос цепочки эволюции
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

        // Добавляем описание из данных о виде
        const description =
          speciesData.flavor_text_entries?.find(
            (entry) => entry.language.name === "en"
          )?.flavor_text || "Описание отсутствует";

        // Обрабатываем видимые данные
        const processedData = {
          id: data.id,
          name: data.name,
          height: data.height / 10, // переводим в метры
          weight: data.weight / 10, // переводим в кг
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
        };

        setPokemonDetails(processedData);
        setShowDetails(true);
      } catch (err) {
        setError(err.message);
        console.error("Ошибка при получении данных:", err);
      } finally {
        setLoading(false);
      }
    },
    [extractEvolutionChain]
  );

  // Сброс деталей
  const resetDetails = useCallback(() => {
    setShowDetails(false);
  }, []);

  return {
    // Функции из обоих хуков
    loadPokemonPage,
    searchPokemon,
    fetchDetails,
    resetDetails,

    // Состояния из обоих хуков
    loading,
    error,
    totalCount,
    pokemonDetails,
    evolutions,
    showDetails,
  };
}
