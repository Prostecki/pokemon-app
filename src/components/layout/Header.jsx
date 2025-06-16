import MenuButton from "../common/MenuButton";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PokeInput from "../common/PokeInput";
import { ShinyButton } from "../magicui/shiny-button";

export default function Header({ searchQuery, onSearch }) {
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();

  return (
    <header
      className={`fixed z-22 w-full ${
        isTransparent ? "bg-white/30" : "bg-white/95"
      } flex items-center justify-center gap-10 p-4 shadow-md duration-300 transition-colors`}
    >
      <h1 className="text-4xl w-1/3 drop-shadow-2xl text-start font-bold animate__animated animate__backInDown">
        Choose your Pokemon!
      </h1>
      <PokeInput searchQuery={searchQuery} onSearch={onSearch} />
      {/* <MenuButton onClick={() => navigate("/")}>Back to Menu</MenuButton> */}
      <ShinyButton
        onClick={() => navigate("/")}
        className="border-black/20 bg-white"
      >
        Back to menu
      </ShinyButton>
    </header>
  );
}
