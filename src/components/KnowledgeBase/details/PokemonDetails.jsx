import PokemonStatsChart from "./PokemonStatsChart";
import ChosenPokemon from "./ChosenPokemon";
import PokemonDetailInfo from "./PokemonDetailInfo";
import Evolutions from "./Evolutions";
import PokemonDetailsLoading from "./PokemonDetailsLoading";

export default function PokemonDetails({
  pokemon,
  evolutions,
  loading,
  onBack,
  onSelectEvolution,
}) {
  if (loading) {
    return <PokemonDetailsLoading />;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 flex flex-col items-start max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="mb-4 px-3 py-1.5 sm:px-4 sm:py-2 w-max bg-gray-500 text-white rounded hover:bg-gray-600 text-sm sm:text-base"
      >
        Back to all Pokémon
      </button>

      {/* Main content - flex col on mobile, row on larger screens */}
      <div className="flex flex-col md:flex-row w-full md:gap-6">
        {/* Left: Main info and image - full width on mobile, half on larger */}
        <div className="w-full md:w-1/2 md:pr-4">
          <ChosenPokemon pokemon={pokemon} />

          {/* Add Evolutions component here */}
          {evolutions && evolutions.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold mb-3">Evolution Chain</h2>
              <Evolutions
                evolutions={evolutions}
                onSelect={onSelectEvolution}
                currentPokemonId={pokemon.id} // Передаем ID текущего покемона
              />
            </div>
          )}
        </div>

        {/* Right: Stats and details - full width on mobile, half on larger */}
        <div className="w-full md:w-1/2 border border-black/10 rounded-xl p-3 sm:p-4 h-full flex flex-col gap-3 sm:gap-4 mt-4 md:mt-0">
          <div className="mb-2 sm:mb-3">
            <h2 className="text-lg sm:text-xl font-bold">About:</h2>
            {pokemon.description ? (
              <p className="mt-1 text-sm sm:text-base">{pokemon.description}</p>
            ) : (
              <p className="mt-1 text-sm sm:text-base text-gray-500">
                No description available
              </p>
            )}
          </div>
          <div className="h-56 sm:h-64">
            <PokemonStatsChart stats={pokemon.stats} />
          </div>
          {/* Detail Info Block */}
          <PokemonDetailInfo pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
