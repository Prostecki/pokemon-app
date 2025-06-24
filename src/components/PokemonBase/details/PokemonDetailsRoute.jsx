import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePokemonBase } from "../../../contexts/PokemonBaseContext";
import PokemonDetails from "./PokemonDetails";
import PokemonDetailsLoading from "./PokemonDetailsLoading";

export default function PokemonDetailsRoute() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    fetchDetails,
    pokemonDetails,
    evolutions,
    isLoadingDetails,
    resetDetails,
  } = usePokemonBase();

  // Add local loading state to handle route changes
  const [isChangingPokemon, setIsChangingPokemon] = useState(true);

  useEffect(() => {
    // Set loading state immediately when ID changes
    setIsChangingPokemon(true);

    if (id) {
      fetchDetails(id).finally(() => {
        setIsChangingPokemon(false);
      });
    }
  }, [id, fetchDetails]);

  const handleBack = () => {
    navigate("/base");
    resetDetails();
  };

  const handleSelectEvolution = (evolutionId) => {
    // Set loading state before navigation
    setIsChangingPokemon(true);
    navigate(`/base/${evolutionId}`);
  };

  // Show loading if either global or local loading state is true
  if (isLoadingDetails || isChangingPokemon) {
    return <PokemonDetailsLoading />;
  }

  if (!pokemonDetails) {
    return <PokemonDetailsLoading />;
  }

  return (
    <PokemonDetails
      pokemon={pokemonDetails}
      evolutions={evolutions}
      onBack={handleBack}
      onSelectEvolution={handleSelectEvolution}
    />
  );
}
