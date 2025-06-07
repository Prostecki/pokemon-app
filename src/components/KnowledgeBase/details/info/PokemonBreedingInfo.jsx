export default function PokemonBreedingInfo({ pokemon }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-base mb-3">
      <li>
        <span className="font-semibold">Gender Ratio:</span>{" "}
        {pokemon.genderRatio === "Genderless"
          ? "Genderless"
          : `♀ ${pokemon.genderRatio.female}% ♂ ${pokemon.genderRatio.male}%`}
      </li>
      <li>
        <span className="font-semibold">Egg Groups:</span>{" "}
        {pokemon.eggGroups.join(", ")}
      </li>
    </ul>
  );
}
