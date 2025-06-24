import { useEffect, useState, useRef } from "react";
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

  // Add timeout ref to prevent infinite loading
  const loadingTimeoutRef = useRef(null);

  useEffect(() => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // Set loading state immediately when ID changes
    setIsChangingPokemon(true);

    if (id) {
      // Safety timeout - if loading takes more than 10 seconds, reset loading state
      loadingTimeoutRef.current = setTimeout(() => {
        console.log("Loading timeout reached, resetting loading state");
        setIsChangingPokemon(false);
      }, 10000);

      fetchDetails(id)
        .then(() => {
          // Clear the timeout when successful
          if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current);
          }
          setIsChangingPokemon(false);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon details:", error);
          // Make sure we reset loading state even on error
          setIsChangingPokemon(false);
        });
    }

    // Cleanup function to clear timeout
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [id, fetchDetails]);

  const handleBack = () => {
    navigate("/base");
    resetDetails();
  };

  const handleSelectEvolution = (evolutionId) => {
    // Ensure both are treated as numbers with explicit conversion
    const currentId = parseInt(id, 10);
    const targetId = parseInt(evolutionId, 10);

    // Add debug logging to see actual values
    console.log("Current ID:", currentId, "Target ID:", targetId);

    // Don't do anything if clicking the current Pokemon
    if (targetId === currentId) {
      console.log("Same Pokemon selected, no navigation needed");
      return;
    }

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
