export default function CharacterSelector({
  characters,
  selectedId,
  isSelecting,
  disabledIds = [],
  onSelect,
}) {
  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      {characters.map((char) => {
        const disabled = disabledIds.includes(char.id);
        return (
          <div
            key={char.id}
            onClick={() => !disabled && onSelect(char.id)}
            style={{
              border:
                selectedId === char.id && isSelecting
                  ? "4px solid gold"
                  : "2px solid #555",
              borderRadius: "12px",
              padding: "1rem",
              background:
                selectedId === char.id && isSelecting ? "#333" : "#111",
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
    </div>
  );
}
