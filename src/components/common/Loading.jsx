import { useState, useEffect } from "react";

export default function Loading() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Update to reach 100% within the 2000ms timeout in App.jsx
    const interval = setInterval(() => {
      setValue((prevValue) => {
        const newValue = prevValue + 5;
        return newValue >= 100 ? 100 : newValue;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="pokemon-font text-4xl mb-4">Pokémon App</div>
      <img
        src="/images/pokeball.png"
        alt="Pokeball"
        className="w-16 h-16 animate-spin mb-4"
      />
      <div className="w-64 md:w-96">
        {/* Custom progress bar implementation */}
        <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-red-500 rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${value}%`,
              boxShadow: "0 0 10px rgba(255, 0, 0, 0.5)",
            }}
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-xs font-bold text-white drop-shadow">
              {value}%
            </span>
          </div>
        </div>
      </div>
      <div className="text-lg mt-2 text-blue-600 font-bold">
        Loading Pokémon data...
      </div>
    </div>
  );
}
