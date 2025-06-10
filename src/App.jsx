import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/common/Loading";
import StartMenu from "./components/StartMenu/StartMenu";
import StartGame from "./components/StartGame/StartGame";
import About from "./components/About/About";
import KnowledgeBase from "./components/KnowledgeBase/KnowledgeBase";
import PokemonDetails from "./components/KnowledgeBase/details/PokemonDetails";
import { useState, useEffect } from "react";
import { useSessionStorage } from "./hooks/useSessionStorage";
import "./index.css";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [gameStage, setGameStage] = useState("startMenu");

  const knowledgeBase = () => {
    setGameStage("knowledgeBase");
  };

  const goToStartMenu = () => {
    setGameStage("startMenu");
  };

  if (gameStage === "startMenu") {
    return <StartMenu onKnowledgeBase={knowledgeBase} />;
  } else if (gameStage === "knowledgeBase") {
    return <KnowledgeBase onBackToMenu={goToStartMenu} />;
  }
}

export default function RouterApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenLoading, setHasSeenLoading] = useSessionStorage(
    "hasSeenLoading",
    false
  );

  useEffect(() => {
    // If user hasn't seen loading screen yet
    if (!hasSeenLoading) {
      // Show loading for a bit longer to see animation
      setTimeout(() => {
        setIsLoading(false);
        setHasSeenLoading(true);
      }, 2000); // Увеличил время для отладки
    } else {
      // Skip loading screen
      setIsLoading(false);
    }
  }, [hasSeenLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !hasSeenLoading ? (
          <motion.div
            key="loading-screen"
            className="flex items-center justify-center h-screen bg-gray-100 fixed inset-0 z-50"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            animate={{
              opacity: 1,
              transition: { duration: 0.3 },
            }}
          >
            <Loading />
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Router>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/about" element={<About />} />
                <Route path="/base" element={<KnowledgeBase />} />
                <Route path="/startgame" element={<StartGame />} />
                <Route path="/base/:id" element={<PokemonDetails />} />
              </Routes>
            </Router>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
