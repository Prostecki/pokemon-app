export default function ChosenPokemon({ pokemon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-start gap-2">
        <div className="flex justify-center gap-2 items-center">
          <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
          <p className="text-gray-600">#{pokemon.id}</p>
        </div>
        <div>
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-92 object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-white/50 opacity-20 rounded-full"></div>
      </div>
    </div>
  );
}
