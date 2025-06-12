import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTypeColor } from "@/utils/getTypeColor";

// List of all Pokémon types
const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "grass",
  "electric",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

export default function TypeFilter({ onFilterChange, activeTypes = [] }) {
  const [selectedTypes, setSelectedTypes] = useState(activeTypes);
  const [isExpanded, setIsExpanded] = useState(false);

  // When selected types change, notify parent component
  useEffect(() => {
    onFilterChange(selectedTypes);
  }, [selectedTypes, onFilterChange]);

  // Toggle type selection
  const toggleType = (type) => {
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  // Reset all filters
  const clearFilters = () => {
    setSelectedTypes([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">Filter by type</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm underline text-blue-500"
        >
          {isExpanded ? "Show less" : "Show all types"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {/* Show the first 6 types or all types if expanded */}
        {POKEMON_TYPES.slice(0, isExpanded ? POKEMON_TYPES.length : 6).map(
          (type) => (
            <motion.button
              key={type}
              onClick={() => toggleType(type)}
              className={`px-3 py-1 rounded-full text-white capitalize text-sm border-2 transition-all`}
              style={{
                backgroundColor: selectedTypes.includes(type)
                  ? getTypeColor(type)
                  : "transparent",
                borderColor: getTypeColor(type),
                color: selectedTypes.includes(type)
                  ? "white"
                  : getTypeColor(type),
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type}
            </motion.button>
          )
        )}

        {selectedTypes.length > 0 && (
          <motion.button
            onClick={clearFilters}
            className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm ml-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Clear all
          </motion.button>
        )}
      </div>
    </div>
  );
}
