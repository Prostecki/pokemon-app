import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTypeColor } from "../../../utils/getTypeColor";

// Добавьте объект с градиентами для разных типов
const typeGradients = {
  fire: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  water: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  grass: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
  electric: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
  bug: "linear-gradient(135deg, #f6d365 0%, #96e6a1 100%)",
  normal: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
  // ...добавьте остальные типы по необходимости
};

export default function ChosenPokemon({ pokemon }) {
  const [currentImage, setCurrentImage] = useState(pokemon.image);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [direction, setDirection] = useState(0); // -1: left, 1: right, 0: initial
  const [animationKey, setAnimationKey] = useState(pokemon.id); // Separate key for animation

  // Monitor changes in pokemon for animation
  useEffect(() => {
    if (previousPokemon && previousPokemon.id !== pokemon.id) {
      // Determine animation direction based on the pokemon ID
      setDirection(pokemon.id > previousPokemon.id ? 1 : -1);
      // Update the animation key when the pokemon changes
      setAnimationKey(pokemon.id);
    }

    setPreviousPokemon(pokemon);
    setCurrentImage(pokemon.image);
  }, [pokemon]);

  // Handler for shiny version - without updating the animation key
  const handleVersionChange = (newImage) => {
    setCurrentImage(newImage);
  };

  // Получаем основной тип покемона
  const mainType = pokemon.types[0];
  const gradientBg =
    typeGradients[mainType] || "linear-gradient(135deg, #fff 0%, #eee 100%)";

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

      {/* Animated container for the pokemon image */}
      <div
        className="relative w-full h-64 overflow-hidden rounded-2xl"
        style={{
          background: gradientBg,
          transition: "background 0.5s",
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={animationKey}
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
              src={currentImage}
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
                alt={`${pokemon.name} shiny`}
                className="w-20 h-20 object-contain"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
