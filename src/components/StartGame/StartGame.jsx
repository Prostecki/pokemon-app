import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../../hooks/usePokemon";
import CharacterSelector from "./CharacterSelector";
import PlayerAvatar from "./PlayerAvatar";
import "./../../index.css";

const ITEMS_COUNT = 40;

export default function StartGame() {
  const navigate = useNavigate();
  const { characters, loading } = usePokemon(ITEMS_COUNT);
  const [step, setStep] = useState(1);
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [tempSelect, setTempSelect] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const borderColors = {
    p1: "#FFD700",
    p2: "#00BFFF",
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

  const getChar = (id) => characters?.find((c) => c.id === id);

  const animatedCircle = {
    animation: "pulse 1s infinite alternate",
    boxShadow: "0 0 32px 0 gold, 0 0 16px 4px #fff2",
  };

  if (loading) {
    return (
      <div
        className="startgame-root"
        style={{
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          fontSize: 22,
          color: "#38bdf8",
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        <div>Loading pokemons...</div>
      </div>
    );
  }

  return (
    <div
      className="startgame-root"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(120deg, #f0f9ff 0%, #e0e7ff 100%)",
        padding: "32px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        className="startgame-header"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          marginBottom: 24,
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="startgame-menu-btn"
          style={{
            background: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 18px",
            fontWeight: 600,
            fontSize: 16,
            color: "#38bdf8",
            boxShadow: "0 2px 8px #38bdf822",
            cursor: "pointer",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          ← Back to Menu
        </button>
      </div>
      <h2
        className="startgame-title"
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: "#0ea5e9",
          marginBottom: 32,
          letterSpacing: "0.04em",
          textShadow: "0 2px 8px #38bdf822",
        }}
      >
        Choose Your Fighters
      </h2>
      <div
        className="startgame-players-row"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 48,
          marginBottom: 36,
        }}
      >
        <PlayerAvatar
          label="P1"
          color={borderColors.p1}
          selected={p1}
          isSelecting={step === 1 && isSelecting}
          tempSelect={tempSelect}
          getChar={getChar}
          animatedCircle={animatedCircle}
        />
        <div
          className="startgame-vs"
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#64748b",
            letterSpacing: "0.08em",
            textShadow: "0 2px 8px #38bdf822",
          }}
        >
          VS
        </div>
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
        <div
          className="startgame-bottom"
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: 32,
            marginTop: 24,
          }}
        >
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
              style={{
                background: isSelecting
                  ? "linear-gradient(90deg, #38bdf8 0%, #0ea5e9 100%)"
                  : "#94a3b8",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 18,
                padding: "12px 32px",
                marginBottom: 8,
                cursor: isSelecting ? "pointer" : "not-allowed",
                boxShadow: isSelecting
                  ? "0 2px 12px #38bdf822"
                  : "0 1px 4px #94a3b822",
                transition: "background 0.2s, box-shadow 0.2s",
              }}
            >
              Accept
            </button>
            <button
              onClick={handleCancel}
              disabled={!isSelecting}
              className="startgame-btn-cancel"
              style={{
                background: "#fff",
                color: "#0ea5e9",
                border: "2px solid #0ea5e9",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 18,
                padding: "12px 32px",
                cursor: isSelecting ? "pointer" : "not-allowed",
                boxShadow: "0 1px 4px #38bdf822",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div
          className="startgame-fighters-ready"
          style={{
            marginTop: 48,
            fontSize: 28,
            fontWeight: 700,
            color: "#22c55e",
            letterSpacing: "0.04em",
            textShadow: "0 2px 8px #22c55e22",
            background: "#f0fdf4",
            borderRadius: 12,
            padding: "18px 48px",
            boxShadow: "0 2px 12px #22c55e22",
          }}
        >
          Fighters ready!
        </div>
      )}
    </div>
  );
}
