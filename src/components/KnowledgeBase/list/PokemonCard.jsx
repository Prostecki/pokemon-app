import React from "react";

export default function PokemonCard({ character, onClick }) {
  return (
    <div
      className="p-2 md:p-3 lg:p-4 bg-stone-400/40 shadow cursor-pointer transition transform hover:scale-105"
      onClick={() => onClick(character.id)}
    >
      <h3 className="mt-1 md:mt-2 text-center capitalize font-medium text-xs sm:text-sm md:text-base bg-gradient-to-r from-stone-400/40 via-stone-200 to-stone-400/40 rounded px-2 py-1">
        {character.name}
      </h3>
      <img
        src={character.image}
        alt={character.name}
        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain mx-auto"
      />
    </div>
  );
}
