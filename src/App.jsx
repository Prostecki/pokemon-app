import Loading from "./components/Loading";
import StartMenu from "./components/StartMenu/StartMenu";
import KnowledgeBase from "./components/KnowledgeBase/KnowledgeBase";
import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [gameStage, setGameStage] = useState("loading"); // loading, startMenu, knowledgeBase

  useEffect(() => {
    const timer = setTimeout(() => {
      setGameStage("startMenu");
    }, 3000); // 3 seconds delay for loading screen

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

export default App;
