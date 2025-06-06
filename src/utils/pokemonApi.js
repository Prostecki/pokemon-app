/**
 * Получает список покемонов с пагинацией
 */
export const fetchPokemonList = async (page = 1, itemsPerPage = 20) => {
  const offset = (page - 1) * itemsPerPage;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokemon data");
  }

  return await response.json();
};

/**
 * Получает детали покемона по URL
 */
export const fetchPokemonByUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon details from ${url}`);
  }
  return await response.json();
};

/**
 * Получает данные о виде покемона
 */
export const fetchPokemonSpecies = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon species from ${url}`);
  }
  return await response.json();
};
