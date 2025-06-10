import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTypeColor } from "../../../utils/getTypeColor";

export default function ChosenPokemon({ pokemon }) {
  const [currentImage, setCurrentImage] = useState(pokemon.image);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [direction, setDirection] = useState(0); // -1: left, 1: right, 0: initial
  const [animationKey, setAnimationKey] = useState(pokemon.id); // Отдельный ключ для анимации

  // Отслеживаем изменение покемона для анимации
  useEffect(() => {
    if (previousPokemon && previousPokemon.id !== pokemon.id) {
      // Определяем направление анимации по ID покемона
      setDirection(pokemon.id > previousPokemon.id ? 1 : -1);
      // Обновляем ключ анимации при смене покемона
      setAnimationKey(pokemon.id);
    }

    setPreviousPokemon(pokemon);
    setCurrentImage(pokemon.image);
  }, [pokemon]);

  // Обработчик для shiny версии - без обновления ключа анимации
  const handleVersionChange = (newImage) => {
    setCurrentImage(newImage);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-center gap-2 items-center">
          <h1 className="text-3xl font-bold capitalize">
            {pokemon.name} <span className="text-gray-400">#{pokemon.id}</span>
          </h1>
        </div>
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full text-white capitalize text-sm"
              style={{ backgroundColor: getTypeColor(type) }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* Анимированный контейнер для изображения */}
      <div className="relative w-full h-64 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={animationKey} // Используем animationKey вместо currentImage
            custom={direction}
            initial={{
              opacity: 0,
              x: direction * 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{
              opacity: 0,
              x: direction * -100,
              transition: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={currentImage} // Текущее изображение (обычное или shiny)
              alt={pokemon.name}
              className="w-auto h-full max-h-64 object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-lg">Versions</h2>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleVersionChange(pokemon.image)}
            className={`p-1 border-2 rounded ${
              currentImage === pokemon.image
                ? "border-blue-500"
                : "border-gray-300"
            } transition-all hover:shadow-md`}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-20 h-20 object-contain"
            />
          </button>
          {pokemon.shinyImage && (
            <button
              onClick={() => handleVersionChange(pokemon.shinyImage)}
              className={`p-1 border-2 rounded ${
                currentImage === pokemon.shinyImage
                  ? "border-blue-500"
                  : "border-gray-300"
              } transition-all hover:shadow-md`}
              title="Shiny"
            >
              <img
                src={pokemon.shinyImage}
                alt={pokemon.name + " shiny"}
                className="w-20 h-20 object-contain"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
