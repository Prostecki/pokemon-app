import { motion } from "framer-motion";
import { useCard3DEffect } from "@/hooks/useCard3DEffect";

export function Card3D({
  onClick,
  topSectionBackground,
  topSectionContent,
  bottomSectionContent,
}) {
  const { ref, transform, handleMouseMove, handleMouseLeave } =
    useCard3DEffect();

  // Base container styles
  const containerStyles = {
    perspective: "1200px",
  };

  // Card styles
  const cardStyles = {
    transformStyle: "preserve-3d",
    transform,
    willChange: "transform",
  };

  // Card animations
  const cardAnimations = {
    whileHover: {
      scale: 1.05,
      boxShadow: "0 10px 30px 0 rgba(80, 80, 200, 0.3)",
      zIndex: 10,
    },
    whileTap: {
      scale: 0.98,
    },
  };

  // Top section styles
  const topSectionStyles = {
    transformStyle: "preserve-3d",
    position: "relative",
    background: topSectionBackground,
  };

  // Border styles
  const borderStyles = {
    position: "absolute",
    zIndex: 30,
    top: 0,
    left: 0,
  };

  // Bottom section styles
  const bottomSectionStyles = {
    transformStyle: "preserve-3d",
  };

  return (
    <div style={containerStyles} className="relative">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={cardStyles}
        whileHover={cardAnimations.whileHover}
        whileTap={cardAnimations.whileTap}
        onClick={onClick}
        className="card border-2 border-black/70 bg-gradient-to-r from-slate-500/80 to-gray-700/80 cursor-pointer"
      >
        <motion.div
          className="top-section"
          style={topSectionStyles}
          initial={{ translateZ: "10px" }}
        >
          <div className="border" style={borderStyles} />
          {topSectionContent}
        </motion.div>

        <motion.div
          className="bottom-section"
          style={bottomSectionStyles}
          initial={{ translateZ: "10px" }}
        >
          {bottomSectionContent}
        </motion.div>
      </motion.div>
    </div>
  );
}
