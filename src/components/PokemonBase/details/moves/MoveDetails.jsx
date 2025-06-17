import { motion, AnimatePresence } from "framer-motion";
import { getTypeColor, getMoveName } from "../../../../utils/getTypeColor";
import { usePokemonMove } from "../../../../hooks/usePokemon";

export default function MoveDetails({ move }) {
  const { moveDetails, loading } = usePokemonMove(move);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl mt-4 shadow-md border border-gray-200"
      >
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                {getMoveName(move)}
              </h3>
              {moveDetails.type && (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="px-4 py-1 rounded-full text-sm font-medium text-white shadow-sm inline-block"
                  style={{
                    backgroundColor: getTypeColor(moveDetails.type.name),
                  }}
                >
                  {moveDetails.type.name.toUpperCase()}
                </motion.span>
              )}
              {moveDetails.damage_class && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 bg-gray-200 shadow-inner">
                  {moveDetails.damage_class.name.toUpperCase()}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {moveDetails.power !== null && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400"
                >
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                    Power
                  </div>
                  <div className="font-bold text-xl text-yellow-600">
                    {moveDetails.power}
                  </div>
                </motion.div>
              )}

              {moveDetails.accuracy !== null && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400"
                >
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                    Accuracy
                  </div>
                  <div className="font-bold text-xl text-blue-600">
                    {moveDetails.accuracy}%
                  </div>
                </motion.div>
              )}

              {moveDetails.pp !== null && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-400"
                >
                  <div className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                    PP
                  </div>
                  <div className="font-bold text-xl text-purple-600">
                    {moveDetails.pp}
                  </div>
                </motion.div>
              )}
            </div>

            {moveDetails.effect_entries &&
              moveDetails.effect_entries.length > 0 && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="font-bold text-gray-700 mb-2 uppercase text-sm tracking-wide">
                    Effect
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {moveDetails.effect_entries[0].effect}
                  </p>
                </div>
              )}

            {moveDetails.flavor_text_entries &&
              moveDetails.flavor_text_entries.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200 italic text-gray-600">
                  "
                  {moveDetails.flavor_text_entries[0].flavor_text.replace(
                    /\f/g,
                    " "
                  )}
                  "
                </div>
              )}
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
