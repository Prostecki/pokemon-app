export default function PokemonBasicInfo({ pokemon }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-base mb-3">
      <li>
        <span className="font-semibold">Abilities:</span>{" "}
        {pokemon.abilities.join(", ")}
      </li>
      <li>
        <span className="font-semibold">Height:</span> {pokemon.height} m
      </li>
      <li>
        <span className="font-semibold">Weight:</span> {pokemon.weight} kg
      </li>
      <li>
        <span className="font-semibold">Base XP:</span> {pokemon.baseExperience}
      </li>
      <li>
        <span className="font-semibold">Catch Rate:</span> {pokemon.captureRate}
      </li>
      <li>
        <span className="font-semibold">Habitat:</span> {pokemon.habitat}
      </li>
      <li>
        <span className="font-semibold">Color:</span> {pokemon.color}
      </li>
      <li>
        <span className="font-semibold">Growth Rate:</span> {pokemon.growthRate}
      </li>
      <li>
        <span className="font-semibold">Generation:</span> {pokemon.generation}
      </li>
    </ul>
  );
}
