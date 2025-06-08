import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import PokemonList from "./list/PokemonList";
import PokemonDetails from "./details/PokemonDetails";
import { usePokemonData } from "../../hooks/usePokemonData"; // Импорт объединенного хука
import { PaginationProvider } from "../../contexts/PaginationContext";

export default function KnowledgeBase({ onBackToMenu }) {
  // Константы и состояния
  const ITEMS_PER_PAGE = 40;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const searchTimeoutRef = useRef(null);

  // Используем объединенный хук
  const {
    loadPokemonPage,
    searchPokemon,
    fetchDetails,
    resetDetails,
    loading,
    error,
    pokemonDetails,
    evolutions,
    showDetails,
  } = usePokemonData();

  // Загрузка страницы покемонов (обертка над API хуком)
  const handleLoadPage = useCallback(
    async (page) => {
      if (loading) return;

      const newPokemons = await loadPokemonPage(page, ITEMS_PER_PAGE);

      // Добавляем только новых покемонов
      setAllPokemons((prevPokemons) => {
        const existingIds = new Set(prevPokemons.map((p) => p.id));
        const uniqueNewPokemons = newPokemons.filter(
          (p) => !existingIds.has(p.id)
        );
        return [...prevPokemons, ...uniqueNewPokemons];
      });

      setCurrentPage(page + 1);
    },
    [ITEMS_PER_PAGE, loading, loadPokemonPage]
  );

  // Загрузка следующей страницы (для infinite scroll)
  const loadMore = useCallback(async () => {
    if (loading || searchQuery) {
      return [];
    }

    try {
      const newPokemons = await loadPokemonPage(currentPage, ITEMS_PER_PAGE);

      if (newPokemons && newPokemons.length > 0) {
        setAllPokemons((prevPokemons) => {
          const existingIds = new Set(prevPokemons.map((p) => p.id));
          const uniqueNewPokemons = newPokemons.filter(
            (p) => !existingIds.has(p.id)
          );

          if (uniqueNewPokemons.length > 0) {
            setCurrentPage(currentPage + 1);
            return [...prevPokemons, ...uniqueNewPokemons];
          }

          return prevPokemons;
        });
      }

      return newPokemons || [];
    } catch (error) {
      console.error("Failed to load more Pokemon:", error);
      return [];
    }
  }, [currentPage, ITEMS_PER_PAGE, loading, searchQuery, loadPokemonPage]);

  // Первоначальная загрузка
  useEffect(() => {
    // Только при монтировании компонента
    loadPokemonPage(1, ITEMS_PER_PAGE).then((pokemons) => {
      setAllPokemons(pokemons || []);
      setCurrentPage(2);
    });
  }, []); // пустая зависимость для выполнения только при монтировании

  // Обработчик изменения поискового запроса
  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);

      // Отменяем предыдущий таймаут, если есть
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Устанавливаем новый таймаут для поиска
      searchTimeoutRef.current = setTimeout(async () => {
        if (!query.trim()) {
          setSearchResults([]);
          return;
        }

        const results = await searchPokemon(query);
        setSearchResults(results);
      }, 300);
    },
    [searchPokemon]
  );

  // Очистка таймаута при размонтировании
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Выбор покемона для просмотра деталей
  const handleSelectPokemon = useCallback(
    (id) => {
      fetchDetails(id);
    },
    [fetchDetails]
  );

  // Определяем, какой список покемонов показывать
  const displayedPokemons = searchQuery ? searchResults : allPokemons;

  return (
    <div className="container mx-auto px-4 py-8">
      {showDetails ? (
        <PokemonDetails
          pokemon={pokemonDetails}
          evolutions={evolutions}
          onBack={resetDetails}
          onSelectEvolution={handleSelectPokemon} // вот здесь!
        />
      ) : (
        <PaginationProvider
          characters={displayedPokemons}
          currentPage={currentPage}
          loadMorePokemon={loadMore}
          onSelect={handleSelectPokemon}
        >
          <>
            <PokemonList
              onBackToMenu={onBackToMenu}
              searchQuery={searchQuery}
              onSearch={handleSearch}
            />
            {loading && (
              <div className="flex justify-center my-4">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </>
        </PaginationProvider>
      )}
    </div>
  );
}
