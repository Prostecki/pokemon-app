import { useNavigate } from "react-router-dom";
import { usePaginationContext } from "../../../contexts/PaginationContext";
import { useState, useRef, useEffect, useMemo } from "react";
import PokemonCard from "./PokemonCard";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { AnimatePresence, motion } from "framer-motion";
import UiverseInput from "./UiverseInput";
import { FixedSizeGrid } from "react-window";
import { SparklesText } from "@/components/magicui/sparkles-text";

export default function PokemonList({ searchQuery, onSearch }) {
  const navigate = useNavigate();
  const { characters, loadMorePokemon, onSelect } = usePaginationContext();
  const [isLoading, setIsLoading] = useState(false);
  const [prevCharactersCount, setPrevCharactersCount] = useState(0);
  const newPokemonRef = useRef(null);
  // Добавляем состояние для ширины окна
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Размеры и параметры для виртуализации
  const CARD_WIDTH = 240;
  const CARD_HEIGHT = 350;
  const GAP = 8;

  // Обработчик изменения размера окна
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Теперь columnCount зависит от windowWidth и будет пересчитываться при изменении размера окна
  const columnCount = useMemo(() => {
    return Math.max(1, Math.floor((windowWidth - 100) / (CARD_WIDTH + GAP)));
  }, [windowWidth, CARD_WIDTH, GAP]);

  // Динамический расчёт высоты грида на основе количества элементов
  const gridHeight = useMemo(() => {
    const rows = Math.ceil(characters.length / columnCount);
    return rows * CARD_HEIGHT; // Высота равна количеству строк * высоту карточки
  }, [characters.length, columnCount, CARD_HEIGHT]);

  const handlePokemonClick = (id) => {
    if (onSelect) {
      onSelect(id);
    }
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPrevCharactersCount(characters.length);
    setTimeout(() => {
      loadMorePokemon().finally(() => {
        setIsLoading(false);
      });
    }, 100);
  };

  // Функция рендеринга ячейки для FixedSizeGrid
  const Cell = ({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= characters.length) return null;

    const character = characters[index];
    const isNewlyLoaded = index >= prevCharactersCount;

    return (
      <div
        style={{
          ...style,
          padding: `${GAP}px`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <motion.div
          key={character.id}
          initial={{ opacity: isNewlyLoaded ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          ref={index === prevCharactersCount ? newPokemonRef : null}
        >
          <PokemonCard character={character} onClick={handlePokemonClick} />
        </motion.div>
      </div>
    );
  };

  return (
    <div className="p-10 pokemon-list-bg flex flex-col items-center min-h-screen overflow-x-hidden">
      <div className="flex w-full justify-between items-center mb-4">
        <ShinyButton onClick={() => navigate("/")}>Back to menu</ShinyButton>
        {/* <h1
          id="top"
          className="text-7xl w-4/6 font-medium pokemon-font animate__animated animate__lightSpeedInLeft"
        >
          Choose your Pokemon!
        </h1> */}
        <SparklesText className="text-7xl w-4/6 font-light pokemon-font animate__animated animate__backInDown">
          Choose your Pokemon!
        </SparklesText>
      </div>

      <UiverseInput searchQuery={searchQuery} onSearch={onSearch} />

      {characters.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-lg shadow">
          <p className="text-xl font-semibold text-gray-600">
            No Pokémon found with that name!
          </p>
          <p className="mt-2 text-gray-500">Try a different search term</p>
        </div>
      ) : (
        <>
          <div className="mt-5 w-full flex justify-center">
            <FixedSizeGrid
              style={{ overflow: "hidden" }} // Убираем скролл
              columnCount={columnCount}
              columnWidth={CARD_WIDTH}
              height={gridHeight} // Динамическая высота
              rowCount={Math.ceil(characters.length / columnCount)}
              rowHeight={CARD_HEIGHT}
              width={Math.min(
                columnCount * CARD_WIDTH + GAP * (columnCount - 1),
                windowWidth - 80
              )}
            >
              {Cell}
            </FixedSizeGrid>
          </div>

          {!searchQuery && characters.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-200 disabled:bg-blue-300"
              >
                {isLoading ? "Loading..." : "Load more..."}
              </button>
            </div>
          )}
        </>
      )}
      <ShinyButton
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="fixed bottom-2 border border-black/10 right-2 bg-slate-200/40"
      >
        Up
      </ShinyButton>
    </div>
  );
}
