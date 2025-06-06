import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./startmenu.css";
import MenuButton from "./MenuButton";

const buttonVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function StartMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-yellow-100 pokemon-bg relative overflow-hidden">
      <AnimatePresence>
        <motion.div
          key="start-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white p-8 rounded-lg shadow-lg border-4 border-yellow-400 transform transition-all z-10"
        >
          {/* Тематический заголовок */}
          <div className="flex justify-center mb-4">
            <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-red-500 via-blue-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pokemon-font">
              POKEMON TRAINER ADVENTURE
            </h1>
          </div>

          {/* Стилизованный текст */}
          <p className="mb-6 text-center text-gray-800/60 font-light">
            Professor Oak: "Welcome to the world of Pokémon! Your very own
            Pokémon legend is about to unfold!"
          </p>

          {/* Кнопки с анимацией появления */}
          <div className="flex flex-col gap-4 items-center">
            {[
              {
                onClick: () => navigate("/base"),
                className: "hover:bg-red-100 border-red-500 w-62",
                img: "images/pokemon-go.png",
                text: "Pokédex Database",
              },
              {
                onClick: () => navigate("/startgame"),
                className:
                  "hover:bg-yellow-100 border-yellow-500 animate-pulse",
                img: "images/go.png",
                text: "Start Journey!",
              },
              {
                onClick: undefined,
                className: "hover:bg-purple-100 border-purple-500",
                img: "images/start.png",
                text: "Poké Melody",
              },
              {
                onClick: () => navigate("/about"),
                className: "hover:bg-blue-100 border-blue-500",
                img: "images/pokemon-trainer.png",
                text: "About Project",
              },
            ].map((btn, i) => (
              <motion.div
                key={btn.text}
                custom={i}
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? -5 : 5 }}
              >
                <MenuButton onClick={btn.onClick} className={btn.className}>
                  <span className="flex items-center">
                    <img src={btn.img} className="w-10 mr-2" />
                    {btn.text}
                  </span>
                </MenuButton>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
