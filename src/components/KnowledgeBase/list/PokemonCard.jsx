import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

// Точно такие же константы, как в HoverMe
const ROTATION_RANGE = 40.5;
const HALF_ROTATION_RANGE = 32.5 / 2; // Явное значение, как в HoverMe

export default function PokemonCard({ character, onClick }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Добавляем настройки пружин для более быстрого отклика
  const xSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 400, damping: 25 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
          scale: 1.1,
          boxShadow: "0 10px 30px 0 rgba(80, 80, 200, 0.3)",
          zIndex: 10,
        }}
        className="relative h-48 w-36 sm:h-56 sm:w-44 md:h-64 md:w-52 border-1 border-slate-500/20 rounded-sm bg-white shadow-lg cursor-pointer grid place-content-center"
        onClick={() => onClick(character.id)}
      >
        <motion.div
          className="w-full h-full grid"
          style={{ transformStyle: "preserve-3d" }}
          initial={{ translateZ: "20px" }}
          whileHover={{ translateZ: "20px" }} // show up the image on hover
          whileTap={{ scale: 0.95 }} // Уменьшение при нажатии
          transition={{ duration: 0.2 }}
        >
          <motion.img
            src={character.image}
            alt={character.name}
            className="sm:w-24 sm:h-24 md:w-28 md:h-28 object-contain my-auto"
            whileHover={{ scale: 1.05 }} // Дополнительное небольшое увеличение
          />
          <motion.h3
            className="mt-2 text-center capitalize font-semibold text-base sm:text-lg md:text-xl"
            style={{ transform: "translateZ(10px)" }}
          >
            {character.name}
          </motion.h3>
        </motion.div>
      </motion.div>
    </div>
  );
}
