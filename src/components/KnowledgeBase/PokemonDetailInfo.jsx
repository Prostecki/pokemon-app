export default function PokemonDetailInfo({ pokemon }) {
  return (
    <div className="p-5 rounded-lg mt-4 w-full">
      <h2 className="text-xl font-bold mb-4">Details</h2>

      <div className="mb-3">
        <h3 className="font-semibold">Description:</h3>
        <p className="mt-1">{pokemon.description}</p>
      </div>

      <div className="mb-3">
        <h3 className="font-semibold">Physical:</h3>
        <p className="mt-1">Height: {pokemon.height}m</p>
        <p>Weight: {pokemon.weight}kg</p>
      </div>

      <div className="mb-3">
        <h3 className="font-semibold">Types:</h3>
        <div className="flex gap-2 mt-1">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <h3 className="font-semibold">Abilities:</h3>
        <ul className="list-disc pl-5 mt-1">
          {pokemon.abilities.map((ability) => (
            <li key={ability}>{ability}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
