export default function CharacterSelector({
  characters,
  selectedId,
  isSelecting,
  disabledIds = [],
  onSelect,
}) {
  if (!Array.isArray(characters) || characters.length === 0) {
    return <div>No characters available</div>;
  }
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {characters.map((char) => {
        const disabled = disabledIds.includes(char.id);
        const isActive = selectedId === char.id && isSelecting;
        return (
          <div
            key={char.id}
            onClick={() => !disabled && onSelect(char.id)}
            style={{
              border: isActive ? "3px solid #38bdf8" : "2px solid #e5e7eb",
              borderRadius: "18px",
              padding: "1.2rem 1.2rem 0.8rem 1.2rem",
              background: isActive
                ? "linear-gradient(135deg, #f0f9ff 0%, #bae6fd 100%)"
                : "#fff",
              cursor: disabled ? "not-allowed" : "pointer",
              textAlign: "center",
              opacity: disabled ? 0.4 : 1,
              boxShadow: isActive
                ? "0 4px 24px 0 #38bdf855"
                : "0 2px 8px 0 #0001",
              transition:
                "border 0.2s, background 0.2s, box-shadow 0.2s, opacity 0.2s",
              position: "relative",
              minWidth: 120,
              minHeight: 160,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            className="character-card"
          >
            <img
              src={char.img}
              alt={char.name}
              style={{
                width: 80,
                height: 80,
                marginBottom: 12,
                filter: disabled ? "grayscale(1)" : "none",
                borderRadius: "50%",
                background: "#f1f5f9",
                boxShadow: "0 2px 8px 0 #0001",
                transition: "filter 0.2s",
              }}
            />
            <div
              style={{
                fontWeight: 600,
                fontSize: 18,
                color: isActive ? "#0ea5e9" : "#222",
                marginBottom: 4,
                letterSpacing: "0.02em",
                textTransform: "capitalize",
              }}
            >
              {char.name}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "#64748b",
                opacity: 0.7,
              }}
            >
              #{char.id}
            </div>
            {isActive && (
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#38bdf8",
                  boxShadow: "0 0 8px #38bdf8aa",
                  border: "2px solid #fff",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
