export default function PokemonMoves({ moves }) {
  return (
    <div>
      <span className="font-semibold">Moves:</span> {moves.join(", ")}
    </div>
  );
}
