export default function PokemonDetailsLoading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-semibold">Loading Pokémon details...</p>
      </div>
    </div>
  );
}
