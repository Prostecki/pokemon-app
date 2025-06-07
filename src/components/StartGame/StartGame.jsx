import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CharacterSelector from "./CharacterSelector";
import PlayerAvatar from "./PlayerAvatar";
import "./StartGame.css";

const ITEMS_COUNT = 40;

export default function StartGame() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1 - P1, 2 - P2, 3 - both have chosen
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [tempSelect, setTempSelect] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Fetch 40 pokemons on mount
  useEffect(() => {
    async function fetchPokemons() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_COUNT}`
        );
        const data = await res.json();
        // Fetch details for each pokemon to get images
        const details = await Promise.all(
          data.results.map(async (poke) => {
            const resp = await fetch(poke.url);
            const info = await resp.json();
            return {
              id: info.id,
              name: info.name,
              img: info.sprites.front_default,
            };
          })
        );
        setCharacters(details);
        setTempSelect(details[0]?.id || null);
      } catch (e) {
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemons();
  }, []);

  const borderColors = {
    p1: "#FFD700", // gold
    p2: "#00BFFF", // deep sky blue
  };

  const handleAccept = () => {
    if (step === 1) {
      setP1(tempSelect);
      setTempSelect(characters.find((c) => c.id !== tempSelect)?.id || null);
      setStep(2);
      setIsSelecting(false);
    } else if (step === 2) {
      setP2(tempSelect);
      setStep(3);
      setIsSelecting(false);
    }
  };

  const handleCancel = () => {
    setIsSelecting(false);
    if (step === 1) {
      setTempSelect(p1 ?? characters[0]?.id);
    } else if (step === 2) {
      setTempSelect(p2 ?? characters.find((c) => c.id !== p1)?.id);
    }
  };

  const getChar = (id) => characters.find((c) => c.id === id);

  const animatedCircle = {
    animation: "pulse 1s infinite alternate",
    boxShadow: "0 0 32px 0 gold, 0 0 16px 4px #fff2",
  };

  if (loading) {
    return (
      <div className="startgame-root" style={{ justifyContent: "center" }}>
        <div>Loading pokemons...</div>
      </div>
    );
  }

  return (
    <div className="startgame-root">
      <div className="startgame-header">
        <button onClick={() => navigate("/")} className="startgame-menu-btn">
          Back to Menu
        </button>
      </div>
      <h2 className="startgame-title">Choose Your Fighters</h2>
      <div className="startgame-players-row">
        <PlayerAvatar
          label="P1"
          color={borderColors.p1}
          selected={p1}
          isSelecting={step === 1 && isSelecting}
          tempSelect={tempSelect}
          getChar={getChar}
          animatedCircle={animatedCircle}
        />
        <div className="startgame-vs">VS</div>
        <PlayerAvatar
          label="P2"
          color={borderColors.p2}
          selected={p2}
          isSelecting={step === 2 && isSelecting}
          tempSelect={tempSelect}
          getChar={getChar}
          animatedCircle={animatedCircle}
        />
      </div>
      {step < 3 && (
        <div className="startgame-bottom">
          <CharacterSelector
            characters={characters}
            selectedId={tempSelect}
            isSelecting={isSelecting}
            disabledIds={step === 2 ? [p1] : []}
            onSelect={(id) => {
              setTempSelect(id);
              setIsSelecting(true);
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginLeft: 32,
            }}
          >
            <button
              onClick={handleAccept}
              disabled={!isSelecting}
              className="startgame-btn-accept"
              style={
                isSelecting ? {} : { background: "#888", cursor: "not-allowed" }
              }
            >
              Accept
            </button>
            <button
              onClick={handleCancel}
              disabled={!isSelecting}
              className="startgame-btn-cancel"
              style={
                isSelecting ? {} : { background: "#888", cursor: "not-allowed" }
              }
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="startgame-fighters-ready">Fighters ready!</div>
      )}
    </div>
  );
}
