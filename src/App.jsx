import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { useSessionStorage } from "./hooks/useSessionStorage";
import "./index.css";
import "animate.css";
import { motion, AnimatePresence } from "framer-motion";
import DetailLoader from "./components/common/DetailLoader";

// Ленивая загрузка компонентов
const Loading = lazy(() => import("./components/common/Loading"));
const StartMenu = lazy(() => import("./components/StartMenu/StartMenu"));
const StartGame = lazy(() => import("./components/StartGame/StartGame"));
const About = lazy(() => import("./components/About/About"));
const KnowledgeBase = lazy(() =>
  import("./components/KnowledgeBase/KnowledgeBase")
);
const PokemonDetails = lazy(() =>
  import("./components/KnowledgeBase/details/PokemonDetails")
);

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
            className="flex items-center justify-center h-screen bg-gray-100 inset-0 z-50"
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
            <Suspense>
              <Loading />
            </Suspense>
          </motion.div>
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Router>
              <Suspense
                fallback={
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/10 bg-opacity-50">
                    <DetailLoader />
                  </div>
                }
              >
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/base" element={<KnowledgeBase />} />
                  <Route path="/startgame" element={<StartGame />} />
                  <Route path="/base/:id" element={<PokemonDetails />} />
                </Routes>
              </Suspense>
            </Router>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
