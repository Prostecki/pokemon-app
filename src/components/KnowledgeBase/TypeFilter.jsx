import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { pokemonTypes } from "@/utils/getTypeColor";

export default function TypeFilter({ onFilterChange, activeTypes = [] }) {
  const [selectedTypes, setSelectedTypes] = useState(activeTypes);

  // When selected types change, notify parent component
  useEffect(() => {
    onFilterChange(selectedTypes);
  }, [selectedTypes, onFilterChange]);

  // Toggle type selection
  const handleToggle = (typeId) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  // Reset all filters
  const clearFilters = () => {
    setSelectedTypes([]);
  };

  return (
    <div className="filter__container my-6 w-full max-w-sm">
      <div className="shadow__input"></div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-bold text-black/80">Filter by type</h3>
          {selectedTypes.length > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-black hover:text-[#e9b50b] transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {pokemonTypes.map((item) => {
            const isSelected = selectedTypes.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className="flex items-center p-1.5 cursor-pointer border-b border-[#0000001a] hover:bg-[#f9f9f9] transition-colors text-left"
              >
                <div className="relative flex items-center">
                  <div
                    className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "border-black bg-[#e9b50b]"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    <Check
                      className={`w-2 h-2 text-black transition-opacity ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                </div>

                <div className="ml-1.5 flex-1 truncate">
                  <div className="flex items-center space-x-1">
                    <span
                      className="w-2 h-2 rounded-full border border-[#0000001a]"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-xs font-medium text-black truncate">
                      {item.label}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
