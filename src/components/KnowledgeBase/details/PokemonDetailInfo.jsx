import PokemonDescription from "./info/PokemonDescription";
import PokemonBasicInfo from "./info/PokemonBasicInfo";
import PokemonBreedingInfo from "./info/PokemonBreedingInfo";
import PokemonClassification from "./info/PokemonClassification";
import PokemonMoves from "./info/PokemonMoves";
import PokemonVarieties from "./info/PokemonVarieties";

export default function PokemonDetailInfo({ pokemon }) {
  return (
    <div className="p-5 rounded-lg mt-4 w-full">
      <h2 className="text-xl font-bold mb-4">About</h2>
      <PokemonDescription description={pokemon.description} />
      <div className="space-y-4">
        <PokemonBasicInfo pokemon={pokemon} />
        <PokemonBreedingInfo pokemon={pokemon} />
        <PokemonClassification pokemon={pokemon} />
        <PokemonMoves moves={pokemon.moves} />
        {pokemon.varieties.length > 1 && (
          <PokemonVarieties varieties={pokemon.varieties} />
        )}
      </div>
    </div>
  );
}
