import { useState, useEffect } from "react";
import { getTypeColor } from "../../../utils/getTypeColor";

export default function ChosenPokemon({ pokemon }) {
  const [currentImage, setCurrentImage] = useState(pokemon.image);

  useEffect(() => {
    setCurrentImage(pokemon.image);
  }, [pokemon]);

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
      <div className="relative">
        <img
          src={currentImage}
          alt={pokemon.name}
          className="w-62 object-contain"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-lg">Versions</h2>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setCurrentImage(pokemon.image)}
            className={`p-1 border-2 rounded ${
              currentImage === pokemon.image
                ? "border-blue-500"
                : "border-gray-300"
            }`}
          >
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-20 h-20 object-contain"
            />
          </button>
          {pokemon.shinyImage && (
            <button
              onClick={() => setCurrentImage(pokemon.shinyImage)}
              className={`p-1 border-2 rounded ${
                currentImage === pokemon.shinyImage
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
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
