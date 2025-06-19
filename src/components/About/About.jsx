import MenuButton from "../common/MenuButton";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./about.css";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <motion.div
        className="about-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="about-title">About This Game</h1>
        <p className="about-paragraph-center">
          This game is a fun and interactive way to learn about Pokémon. You can
          explore various Pokémon, their stats, and even battle them in a
          simulated environment.
        </p>
        <p className="about-paragraph-center">
          Developed by Mark Taratynov, this game aims to provide an engaging
          experience for Pokémon fans and newcomers alike.
        </p>
        <p className="about-paragraph">
          For more information, visit the repository{" "}
          <a
            className="about-link"
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
