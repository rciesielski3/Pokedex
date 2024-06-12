import { useEffect, useState } from "react";
import useGetDbData from "./useGetDbData";

const useCombinedPokemonData = (apiData) => {
  const [combinedPokemonData, setCombinedPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    data: arenaFightsData,
    loading: arenaFightsLoading,
    error: arenaFightsError,
  } = useGetDbData("arenaFights");

  const {
    data: pokemonsData,
    loading: pokemonsLoading,
    error: pokemonsError,
  } = useGetDbData("pokemons");

  useEffect(() => {
    if (arenaFightsData && pokemonsData && apiData) {
      const fetchCombinedData = async () => {
        try {
          const combinedData = [
            ...arenaFightsData.map((dbPokemon) => ({
              ...dbPokemon,
              fromDb: true,
            })),
            ...pokemonsData.map((dbPokemon) => ({
              ...dbPokemon,
              fromDb: true,
            })),
          ];

          for (const apiPokemon of apiData.results) {
            const response = await fetch(apiPokemon.url);
            const data = await response.json();

            const existingPokemon = combinedData.find(
              (p) => p.name === data.name
            );

            if (!existingPokemon) {
              combinedData.push({
                ...data,
                fromDb: false,
                url: apiPokemon.url,
              });
            }
          }
          setCombinedPokemonData(combinedData);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };

      fetchCombinedData();
    }
  }, [arenaFightsData, pokemonsData, apiData]);

  return { combinedPokemonData, loading, error };
};

export default useCombinedPokemonData;
