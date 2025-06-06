import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PokemonList from "./PokemonList";
import PokemonDetails from "./PokemonDetails";

export default function KnowledgeBase({ onBackToMenu }) {
  const location = useLocation();
  const returnToPage = location.state?.returnToPage || 1;

  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);

  // Используем возвращаемую страницу как начальное значение
  const [currentPage, setCurrentPage] = useState(returnToPage);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(20);

  useEffect(() => {
    fetchAllPokemons(currentPage);
  }, [currentPage]); // Изменим зависимость, чтобы реагировать на изменение currentPage

  // Function to fetch all pokemons
  const fetchAllPokemons = async (page = 1) => {
    setLoading(true);
    try {
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );
      if (!response.ok) throw new Error("Failed to fetch Pokemon data");

      const data = await response.json();

      // Сохраняем общее количество и вычисляем страницы
      const totalCount = data.count;
      setTotalPages(Math.ceil(totalCount / itemsPerPage));

      // Get detailed information for each Pokemon
      const characterDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          const details = await detailResponse.json();
          return {
            id: details.id,
            name: details.name,
            image: details.sprites.other["official-artwork"].front_default,
            url: pokemon.url,
          };
        })
      );

      setCharacters(characterDetails);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Function to fetch detailed information about a selected Pokemon
  const fetchPokemonDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const selected = characters.find((char) => char.id === id);
      if (!selected) return;

      const response = await fetch(selected.url);
      const data = await response.json();

      // Getting species data for description and other details
      const speciesResponse = await fetch(data.species.url);
      const speciesData = await speciesResponse.json();

      setPokemonDetails({
        ...selected,
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
      setDetailsLoading(false);
      setShowDetails(true);
    } catch (err) {
      console.error("Error fetching details:", err);
      setDetailsLoading(false);
    }
  };

  // Handler for selecting a pokemon directly from the list
  const handleSelectPokemon = (id) => {
    fetchPokemonDetails(id);
  };

  // Handler for returning to the list view
  const handleBackToList = () => {
    setShowDetails(false);
    setPokemonDetails(null);
  };

  // Добавляем функции для управления страницами
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchAllPokemons(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchAllPokemons(prevPage);
    }
  };

  // Добавляем новую функцию для прямого перехода на указанную страницу
  const handleGoToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchAllPokemons(page);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl font-bold">Loading pokemons...</p>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  if (detailsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-2xl font-bold">Loading pokemon details...</p>
      </div>
    );
  }

  // Show details view when a pokemon is selected
  if (showDetails && pokemonDetails) {
    return (
      <PokemonDetails pokemon={pokemonDetails} onBack={handleBackToList} />
    );
  }

  // Show list of all pokemons - now with pagination
  return (
    <>
      <PokemonList
        characters={characters}
        onSelect={handleSelectPokemon}
        onBackToMenu={onBackToMenu}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onGoToPage={handleGoToPage} // Добавляем новый проп
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
