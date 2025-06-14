import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTypeColor, getMoveName } from "../../../../utils/getTypeColor";

export default function MoveDetails({ move }) {
  const [moveDetails, setMoveDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch move details when a move is selected
  useEffect(() => {
    if (!move) return;

    const fetchMoveDetails = async () => {
      setLoading(true);
      try {
        // Extract move ID from URL if it's an object with URL
        const moveId =
          typeof move === "object" && move.url
            ? move.url.split("/").filter(Boolean).pop()
            : move.toLowerCase().replace(/\s+/g, "-");

        const response = await fetch(
          `https://pokeapi.co/api/v2/move/${moveId}`
        );
        const data = await response.json();
        setMoveDetails(data);
      } catch (error) {
        console.error("Error fetching move details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoveDetails();
  }, [move]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-gray-100 p-4 rounded-lg mt-4"
      >
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-lg">{getMoveName(move)}</h4>
              {moveDetails.type && (
                <span
                  className="px-2 py-1 rounded text-xs text-white"
                  style={{
                    backgroundColor: getTypeColor(moveDetails.type.name),
                  }}
                >
                  {moveDetails.type.name}
                </span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {moveDetails.power && (
                <div className="bg-white p-2 rounded">
                  <div className="text-xs text-gray-500">Power</div>
                  <div className="font-semibold">{moveDetails.power}</div>
                </div>
              )}

              {moveDetails.accuracy && (
                <div className="bg-white p-2 rounded">
                  <div className="text-xs text-gray-500">Accuracy</div>
                  <div className="font-semibold">{moveDetails.accuracy}%</div>
                </div>
              )}

              {moveDetails.pp && (
                <div className="bg-white p-2 rounded">
                  <div className="text-xs text-gray-500">PP</div>
                  <div className="font-semibold">{moveDetails.pp}</div>
                </div>
              )}
            </div>

            {moveDetails.effect_entries &&
              moveDetails.effect_entries.length > 0 && (
                <div className="mt-3">
                  <div className="font-semibold">Effect</div>
                  <p className="text-sm mt-1">
                    {moveDetails.effect_entries[0].effect}
                  </p>
                </div>
              )}

            {moveDetails.damage_class && (
              <div className="mt-3">
                <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                  {moveDetails.damage_class.name.toUpperCase()}
                </span>
              </div>
            )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
