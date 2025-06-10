import { motion } from "framer-motion";
import { useCard3DEffect } from "../../hooks/useCard3DEffect";

export function Card3D({
  onClick,
  topSectionBackground,
  topSectionContent,
  bottomSectionContent,
}) {
  const { ref, transform, handleMouseMove, handleMouseLeave } =
    useCard3DEffect();

  return (
    <div style={{ perspective: "1200px" }} className="relative">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform,
          willChange: "transform",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 30px 0 rgba(80, 80, 200, 0.3)",
          zIndex: 10,
        }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="card"
      >
        <motion.div
          className="top-section"
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            background: topSectionBackground,
          }}
          initial={{ translateZ: "10px" }}
        >
          <div
            className="border"
            style={{
              position: "absolute",
              zIndex: 30,
              top: 0,
              left: 0,
            }}
          />
          {topSectionContent}
        </motion.div>

        <motion.div
          className="bottom-section"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ translateZ: "10px" }}
        >
          {bottomSectionContent}
        </motion.div>
      </motion.div>
    </div>
  );
}
