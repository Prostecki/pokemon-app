import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { useSessionStorage } from "./hooks/useSessionStorage";
import "./index.css";
import "animate.css";
import { motion, AnimatePresence } from "framer-motion";
import DetailLoader from "./components/common/DetailLoader";
import { PokemonBaseProvider } from "./contexts/PokemonBaseContext";

// Lazy loading of components
const Loading = lazy(() => import("./components/common/Loading"));
const StartMenu = lazy(() => import("./components/StartMenu/StartMenu"));
const StartGame = lazy(() => import("./components/StartGame/StartGame"));
const About = lazy(() => import("./components/About/About"));
const PokemonBase = lazy(() => import("./components/PokemonBase/PokemonBase"));
const PokemonDetailsRoute = lazy(() =>
  import("./components/PokemonBase/details/PokemonDetailsRoute")
);

const NotFoundPage = lazy(() => import("./components/common/NotFoundPage"));

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
    return <PokemonBase onBackToMenu={goToStartMenu} />;
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
      }, 2000); // Increased time for debugging
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
            <PokemonBaseProvider>
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
                    <Route path="/base" element={<PokemonBase />} />
                    <Route path="/startgame" element={<StartGame />} />
                    <Route path="/profile" element={<NotFoundPage />} />
                    <Route path="/base/:id" element={<PokemonDetailsRoute />} />
                  </Routes>
                </Suspense>
              </Router>
            </PokemonBaseProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
