import { useState } from "react";
import MovesList from "./MovesList";
import MoveDetails from "./MoveDetails";

export default function PokemonMoves({ moves }) {
  const [selectedMove, setSelectedMove] = useState(null);

  const handleSelectMove = (move) => {
    setSelectedMove(selectedMove === move ? null : move);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Moves ({moves.length})</h3>

      {/* List of moves component */}
      <MovesList
        moves={moves}
        selectedMove={selectedMove}
        onSelectMove={handleSelectMove}
      />

      {/* Move details component */}
      {selectedMove && <MoveDetails move={selectedMove} />}
    </div>
  );
}
