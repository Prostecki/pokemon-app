import { useEffect } from "react";
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

  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id, fetchDetails]);

  // Fix the back button to navigate directly to the base route
  const handleBack = () => {
    // Navigate back first, then reset details state
    navigate("/base");
    resetDetails(); // Optional: can be removed if resetDetails is called by route change
  };

  const handleSelectEvolution = (evolutionId) => {
    navigate(`/base/${evolutionId}`);
  };

  if (isLoadingDetails) {
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
