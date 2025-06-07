export default function PokemonVarieties({ varieties }) {
  return (
    <div>
      <span className="font-semibold">Varieties:</span>{" "}
      {varieties.map((v) => v.name).join(", ")}
    </div>
  );
}
