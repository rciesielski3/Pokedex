import { useEffect, useState } from "react";
import useGetDbData from "./useGetDbData";
import usePokemonApi from "./usePokemonApi";

const useCombinedPokemonData = () => {
  const [combinedPokemonData, setCombinedPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    data: pokemonsData,
    loading: pokemonsLoading,
    error: pokemonsError,
  } = useGetDbData("pokemons");

  const {
    data: apiPokemonData,
    loading: apiLoading,
    error: apiError,
  } = usePokemonApi(`pokemon?limit=150`);

  useEffect(() => {
    if (!pokemonsLoading && !apiLoading) {
      if (pokemonsData && apiPokemonData) {
        const fetchCombinedData = async () => {
          try {
            const combinedData = [
              ...pokemonsData.map((dbPokemon) => ({
                ...dbPokemon,
                fromDb: true,
              })),
            ];

            for (const apiPokemon of apiPokemonData.results) {
              const response = await fetch(apiPokemon.url);
              const data = await response.json();

              const existingPokemon = combinedData.find(
                (p) => p.id === String(data.id)
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
    }
  }, [pokemonsLoading, apiLoading, pokemonsData, apiPokemonData]);

  useEffect(() => {
    if (pokemonsError || apiError) {
      setError(pokemonsError || apiError);
      setLoading(false);
    }
  }, [pokemonsError, apiError]);

  return { combinedPokemonData, loading, error };
};

export default useCombinedPokemonData;
