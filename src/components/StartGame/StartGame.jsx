import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Пример данных персонажей
const characters = [
  {
    id: 1,
    name: "Pikachu",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  },
  {
    id: 2,
    name: "Bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  },
  {
    id: 3,
    name: "Charmander",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
  },
  {
    id: 4,
    name: "Squirtle",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
  },
];

// Цвета бордера для игроков
const borderColors = {
  p1: "#FFD700", // gold
  p2: "#00BFFF", // deep sky blue
};

export default function StartGame() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 - P1, 2 - P2, 3 - оба выбрали
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);
  const [tempSelect, setTempSelect] = useState(characters[0].id);
  const [isSelecting, setIsSelecting] = useState(false);

  const handleAccept = () => {
    if (step === 1) {
      setP1(tempSelect);
      setTempSelect(characters.find((c) => c.id !== tempSelect).id);
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
      setTempSelect(p1 ?? characters[0].id);
    } else if (step === 2) {
      setTempSelect(p2 ?? characters.find((c) => c.id !== p1).id);
    }
  };

  // Для отображения выбранного персонажа
  const getChar = (id) => characters.find((c) => c.id === id);

  // Анимация для выбранного, но не подтвержденного персонажа
  const animatedCircle = {
    animation: "pulse 1s infinite alternate",
    boxShadow: "0 0 32px 0 gold, 0 0 16px 4px #fff2",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "#222",
        color: "#fff",
        fontFamily: "sans-serif",
        justifyContent: "space-between",
        padding: "2rem 0",
      }}
    >
      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 0 32px 0 gold, 0 0 16px 4px #fff2; }
            100% { box-shadow: 0 0 64px 8px gold, 0 0 32px 8px #fff5; }
          }
          @keyframes fighter-bounce {
            0% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.08) translateY(-10px); }
            100% { transform: scale(1) translateY(0); }
          }
        `}
      </style>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          gap: 12,
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "0.5rem 1.5rem",
            fontSize: 16,
            fontWeight: "bold",
            background: "#444",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginRight: 32,
          }}
        >
          Выйти в меню
        </button>
      </div>
      <h2 style={{ marginBottom: 24 }}>Choose Your Fighters</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flex: 1,
          gap: "6rem",
        }}
      >
        {/* P1 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: step === 1 || step === 3 ? 1 : 0.5,
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 8, color: borderColors.p1 }}>P1</div>
          <div
            style={{
              width: 160,
              height: 160,
              border: `6px solid ${borderColors.p1}`,
              borderRadius: "50%",
              background: "#111",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(step === 1 && isSelecting
                ? { ...animatedCircle, boxShadow: `0 0 32px 0 ${borderColors.p1}, 0 0 16px 4px #fff2` }
                : { boxShadow: `0 0 32px 0 ${borderColors.p1}` }),
              transition: "box-shadow 0.3s",
            }}
          >
            {p1 || (step === 1 && isSelecting) ? (
              <img
                src={getChar(step === 1 && isSelecting ? tempSelect : p1).img}
                alt={getChar(step === 1 && isSelecting ? tempSelect : p1).name}
                style={{
                  width: 120,
                  height: 120,
                  animation: step === 1 && isSelecting ? "fighter-bounce 0.7s infinite" : undefined,
                }}
              />
            ) : (
              <span style={{ color: "#888" }}>?</span>
            )}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              letterSpacing: 2,
              color: borderColors.p1,
            }}
          >
            {p1 || (step === 1 && isSelecting)
              ? getChar(step === 1 && isSelecting ? tempSelect : p1).name
              : "Not selected"}
          </div>
        </div>
        {/* VS */}
        <div
          style={{
            fontSize: 36,
            fontWeight: "bold",
            color: "gold",
          }}
        >
          VS
        </div>
        {/* P2 */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: step === 2 || step === 3 ? 1 : 0.5,
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 8, color: borderColors.p2 }}>P2</div>
          <div
            style={{
              width: 160,
              height: 160,
              border: `6px solid ${borderColors.p2}`,
              borderRadius: "50%",
              background: "#111",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...(step === 2 && isSelecting
                ? { ...animatedCircle, boxShadow: `0 0 32px 0 ${borderColors.p2}, 0 0 16px 4px #fff2` }
                : { boxShadow: `0 0 32px 0 ${borderColors.p2}` }),
              transition: "box-shadow 0.3s",
            }}
          >
            {p2 || (step === 2 && isSelecting) ? (
              <img
                src={getChar(step === 2 && isSelecting ? tempSelect : p2).img}
                alt={getChar(step === 2 && isSelecting ? tempSelect : p2).name}
                style={{
                  width: 120,
                  height: 120,
                  animation: step === 2 && isSelecting ? "fighter-bounce 0.7s infinite" : undefined,
                }}
              />
            ) : (
              <span style={{ color: "#888" }}>?</span>
            )}
          </div>
          <div
            style={{
              fontSize: 22,
              fontWeight: "bold",
              letterSpacing: 2,
              color: borderColors.p2,
            }}
          >
            {p2 || (step === 2 && isSelecting)
              ? getChar(step === 2 && isSelecting ? tempSelect : p2).name
              : "Not selected"}
          </div>
        </div>
      </div>

      {/* Нижняя часть: выбор персонажа */}
      {step < 3 && (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            padding: "2rem 0",
            background: "rgba(0,0,0,0.5)",
            borderTop: "2px solid #444",
          }}
        >
          {characters.map((char) => {
            // Нельзя выбрать уже выбранного персонажа
            const disabled = step === 2 && char.id === p1;
            return (
              <div
                key={char.id}
                onClick={() => {
                  if (!disabled) {
                    setTempSelect(char.id);
                    setIsSelecting(true);
                  }
                }}
                style={{
                  border:
                    tempSelect === char.id && isSelecting
                      ? "4px solid gold"
                      : "2px solid #555",
                  borderRadius: "12px",
                  padding: "1rem",
                  background:
                    tempSelect === char.id && isSelecting ? "#333" : "#111",
                  cursor: disabled ? "not-allowed" : "pointer",
                  textAlign: "center",
                  opacity: disabled ? 0.3 : 1,
                  transition: "border 0.2s, background 0.2s",
                }}
              >
                <img
                  src={char.img}
                  alt={char.name}
                  style={{ width: 80, height: 80, marginBottom: 8 }}
                />
                <div>{char.name}</div>
              </div>
            );
          })}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginLeft: 32 }}>
            <button
              onClick={handleAccept}
              disabled={!isSelecting}
              style={{
                padding: "1rem 2rem",
                fontSize: 18,
                fontWeight: "bold",
                background: isSelecting ? "gold" : "#888",
                color: "#222",
                border: "none",
                borderRadius: 8,
                cursor: isSelecting ? "pointer" : "not-allowed",
                alignSelf: "center",
                height: 48,
                marginBottom: 8,
                transition: "background 0.2s",
              }}
            >
              Accept
            </button>
            <button
              onClick={handleCancel}
              disabled={!isSelecting}
              style={{
                padding: "0.7rem 2rem",
                fontSize: 16,
                fontWeight: "bold",
                background: isSelecting ? "#444" : "#888",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: isSelecting ? "pointer" : "not-allowed",
                alignSelf: "center",
                height: 40,
                transition: "background 0.2s",
              }}
            >
              Отмена
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div
          style={{
            marginTop: 32,
            fontSize: 24,
            color: "gold",
          }}
        >
          Fighters ready!
        </div>
      )}
    </div>
  );
}
