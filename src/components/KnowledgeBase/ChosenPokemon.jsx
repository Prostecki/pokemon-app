export default function ChosenPokemon({ pokemon }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
      <div className="relative">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-48 h-48 object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-white/50 opacity-20 rounded-full"></div>
      </div>
      <div className="text-center">
        <p className="text-gray-600">Pokémon #{pokemon.id}</p>
      </div>
    </div>
  );
}
