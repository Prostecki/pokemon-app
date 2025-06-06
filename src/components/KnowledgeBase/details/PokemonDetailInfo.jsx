export default function PokemonDetailInfo({ pokemon }) {
  return (
    <div className="p-5 rounded-lg mt-4 w-full">
      <h2 className="text-xl font-bold mb-4">About</h2>
      <div className="mb-3">
        <h3 className="font-semibold">Description:</h3>
        <p className="mt-1">{pokemon.description}</p>
      </div>
      <div className="flex items-start gap-2">
        <div className="mb-3 border border-gray-200 w-max p-4 rounded-xl drop-shadow-md">
          <div>
            <h3 className="font-semibold text-center">Abilities:</h3>
            <ul className="list-none mt-1">
              {pokemon.abilities.map((ability) => (
                <li key={ability}>{ability}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border border-gray-200 w-max p-4 rounded-xl drop-shadow-md">
          <p className="mt-1">Height: {pokemon.height}m</p>
        </div>
        <div className="border border-gray-200 w-max p-4 rounded-xl drop-shadow-md">
          <p>Weight: {pokemon.weight}kg</p>
        </div>
      </div>
    </div>
  );
}
