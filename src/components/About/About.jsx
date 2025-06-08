import MenuButton from "../StartMenu/MenuButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center min-h-screen justify-center gap-6">
      <motion.div
        className="flex md:max-w-[50rem] flex-col items-center justify-center gap-6 p-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold">About This Game</h1>
        <p className="text-gray-700 text-center">
          This game is a fun and interactive way to learn about Pokémon. You can
          explore various Pokémon, their stats, and even battle them in a
          simulated environment.
        </p>
        <p className="text-gray-700 text-center">
          Developed by Mark Taratynov, this game aims to provide an engaging
          experience for Pokémon fans and newcomers alike.
        </p>
        <p className="text-gray-700">
          For more information, visit the repository{" "}
          <a
            className="text-blue-500"
            href="https://github.com/Prostecki/pokemon-app"
            target="_blank"
          >
            Pokemon App
          </a>
        </p>
      </motion.div>
      <MenuButton onClick={() => navigate("/")}>Back to menu</MenuButton>
    </div>
  );
}
