import { motion } from "framer-motion";
import { getTypeColor, getMoveName } from "../../../../utils/getTypeColor";

export default function MovesList({ moves, selectedMove, onSelectMove }) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="flex flex-wrap gap-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {moves.map((move, index) => {
        const moveName = getMoveName(move);
        return (
          <motion.div
            key={moveName}
            variants={item}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 rounded-full text-white cursor-pointer ${
              selectedMove === move ? "ring-2 ring-white" : ""
            }`}
            style={{
              backgroundColor: getTypeColor(move.type?.name || "normal"),
            }}
            onClick={() => onSelectMove(move)}
          >
            {moveName}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
