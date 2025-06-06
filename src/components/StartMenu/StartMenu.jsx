import { useNavigate } from "react-router-dom";
import "./StartMenu.css";
import MenuButton from "./MenuButton";

export default function StartMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-blue-200 to-yellow-100 pokemon-bg relative overflow-hidden">
      {/* Анимированные элементы фона */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 animate-float">
          <img
            src="/pokeball.png"
            className="w-12 h-12 opacity-30"
            alt="Poké Ball"
          />
        </div>
        <div className="absolute bottom-10 right-16 animate-float-delay">
          <img
            src="/pikachu-tail.png"
            className="w-16 h-16 opacity-40"
            alt="Pikachu Tail"
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg border-4 border-yellow-400 transform transition-all z-10">
        {/* Тематический заголовок */}
        <div className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-red-500 via-blue-500 to-yellow-400 bg-clip-text text-transparent tracking-wide pokemon-font">
            POKEMON TRAINER ADVENTURE
          </h1>
        </div>

        {/* Стилизованный текст */}
        <p className="mb-6 text-center text-gray-800/60 font-light">
          Professor Oak: "Welcome to the world of Pokémon! Your very own Pokémon
          legend is about to unfold!"
        </p>

        {/* Кнопки в стиле покеболов */}
        <div className="flex flex-col gap-4 items-center">
          <MenuButton
            onClick={() => navigate("/base")}
            className="hover:bg-red-100 border-red-500 w-62"
          >
            <span className="flex items-center">
              <img src="images/pokemon-go.png" className="w-10 mr-2" />
              Pokédex Database
            </span>
          </MenuButton>

          <MenuButton
            onClick={() => navigate("/about")}
            className="hover:bg-blue-100 border-blue-500"
          >
            <span className="flex items-center">
              <img src="images/pokemon-trainer.png" className="w-10 mr-2" />
              Trainer Profiles
            </span>
          </MenuButton>

          <MenuButton
            onClick={() => navigate("/startgame")}
            className="hover:bg-yellow-100 border-yellow-500 animate-pulse"
          >
            <span className="flex items-center">
              <img src="images/go.png" className="w-10 mr-2" />
              Start Journey!
            </span>
          </MenuButton>

          <MenuButton className="hover:bg-purple-100 border-purple-500">
            <span className="flex items-center">
              <img src="images/start.png" className="w-10 mr-2" />
              Poké Melody
            </span>
          </MenuButton>
        </div>
      </div>
    </div>
  );
}
