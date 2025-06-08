import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "./components/common/Loading";
import StartMenu from "./components/StartMenu/StartMenu";
import StartGame from "./components/StartGame/StartGame";
import About from "./components/About/About";
import KnowledgeBase from "./components/KnowledgeBase/KnowledgeBase";
import PokemonDetails from "./components/KnowledgeBase/details/PokemonDetails";
import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [gameStage, setGameStage] = useState("loading"); // loading, startMenu, knowledgeBase

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStage("startMenu");
    }, 1000); // 3 seconds delay for loading screen

    return () => clearTimeout(timer);
  }, []);

  const knowledgeBase = () => {
    setGameStage("knowledgeBase");
  };

  const goToStartMenu = () => {
    setGameStage("startMenu");
  };

  if (gameStage === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Loading />
      </div>
    );
  } else if (gameStage === "startMenu") {
    return <StartMenu onKnowledgeBase={knowledgeBase} />;
  } else if (gameStage === "knowledgeBase") {
    return <KnowledgeBase onBackToMenu={goToStartMenu} />;
  }
}

export default function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/base" element={<KnowledgeBase />} />
        <Route path="/startgame" element={<StartGame />} />
        <Route path="/base/:id" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
}
