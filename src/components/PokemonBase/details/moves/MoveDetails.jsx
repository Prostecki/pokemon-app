import { motion, AnimatePresence } from "framer-motion";
import { getTypeColor, getMoveName } from "../../../../utils/getTypeColor";
import { usePokemonMove } from "../../../../hooks/usePokemon";
import "./styles/MoveDetails.css";

export default function MoveDetails({ move }) {
  const { moveDetails, loading } = usePokemonMove(move);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="move-details"
      >
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            <div className="move-header">
              <h3 className="move-name">{getMoveName(move)}</h3>
              {moveDetails.type && (
                <motion.span
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="move-type"
                  style={{
                    backgroundColor: getTypeColor(moveDetails.type.name),
                  }}
                >
                  {moveDetails.type.name.toUpperCase()}
                </motion.span>
              )}
              {moveDetails.damage_class && (
                <span className="move-class">
                  {moveDetails.damage_class.name.toUpperCase()}
                </span>
              )}
            </div>

            <div className="stats-grid">
              {moveDetails.power !== null && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="stat-card power-card"
                >
                  <div className="stat-label">Power</div>
                  <div className="power-value">{moveDetails.power}</div>
                </motion.div>
              )}

              {moveDetails.accuracy !== null && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="stat-card accuracy-card"
                >
                  <div className="stat-label">Accuracy</div>
                  <div className="accuracy-value">{moveDetails.accuracy}%</div>
                </motion.div>
              )}

              {moveDetails.pp !== null && (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="stat-card pp-card"
                >
                  <div className="stat-label">PP</div>
                  <div className="pp-value">{moveDetails.pp}</div>
                </motion.div>
              )}
            </div>

            {moveDetails.effect_entries &&
              moveDetails.effect_entries.length > 0 && (
                <div className="effect-container">
                  <div className="effect-title">Effect</div>
                  <p className="effect-text">
                    {moveDetails.effect_entries[0].effect}
                  </p>
                </div>
              )}

            {moveDetails.flavor_text_entries &&
              moveDetails.flavor_text_entries.length > 0 && (
                <div className="flavor-text">
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
