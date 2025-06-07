export default function PlayerAvatar({
  label,
  color,
  selected,
  isSelecting,
  tempSelect,
  getChar,
  animatedCircle,
}) {
  const char = getChar(isSelecting ? tempSelect : selected);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: selected || isSelecting ? 1 : 0.5,
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 8, color }}>{label}</div>
      <div
        style={{
          width: 160,
          height: 160,
          border: `6px solid ${color}`,
          borderRadius: "50%",
          background: "#111",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...(isSelecting
            ? {
                ...animatedCircle,
                boxShadow: `0 0 32px 0 ${color}, 0 0 16px 4px #fff2`,
              }
            : { boxShadow: `0 0 32px 0 ${color}` }),
          transition: "box-shadow 0.3s",
        }}
      >
        {selected || isSelecting ? (
          <img
            src={char.img}
            alt={char.name}
            style={{
              width: 120,
              height: 120,
              animation: isSelecting
                ? "fighter-bounce 0.7s infinite"
                : undefined,
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
          color,
        }}
      >
        {selected || isSelecting ? char.name : "Not selected"}
      </div>
    </div>
  );
}
