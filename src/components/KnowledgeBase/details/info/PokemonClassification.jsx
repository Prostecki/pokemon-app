export default function PokemonClassification({ pokemon }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-base mb-3">
      <li>
        <span className="font-semibold">Legendary:</span>{" "}
        {pokemon.isLegendary ? "Yes" : "No"}
      </li>
      <li>
        <span className="font-semibold">Mythical:</span>{" "}
        {pokemon.isMythical ? "Yes" : "No"}
      </li>
    </ul>
  );
}
