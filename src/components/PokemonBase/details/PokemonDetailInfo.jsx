import { useState } from "react";
import { motion } from "framer-motion";
import PokemonBasicInfo from "./PokemonBasicInfo";
import PokemonMoves from "./moves/PokemonMoves";

export default function PokemonDetailInfo({ pokemon }) {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="p-5 rounded-lg mt-4 w-full">
      {/* Tab buttons */}
      <div className="flex mb-4 relative">
        <div className="relative mr-2">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "details"
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Details
            {activeTab === "details" && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
        </div>

        <div className="relative">
          <button
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === "moves"
                ? "text-blue-600 font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("moves")}
          >
            Moves
            {activeTab === "moves" && (
              <motion.div
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
              />
            )}
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div className="space-y-4">
        {activeTab === "details" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PokemonBasicInfo pokemon={pokemon} />
          </motion.div>
        )}

        {activeTab === "moves" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PokemonMoves moves={pokemon.moves} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
