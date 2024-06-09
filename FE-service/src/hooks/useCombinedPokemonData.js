import { useEffect, useState } from "react";
import useGetDbData from "./useGetDbData";

const useCombinedPokemonData = (dbEndpoint, apiData) => {
  const [combinedPokemonData, setCombinedPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    data: dbData,
    loading: dbLoading,
    error: dbError,
  } = useGetDbData(dbEndpoint);

  useEffect(() => {
    if (dbData && apiData) {
      const fetchCombinedData = async () => {
        try {
          const combinedData = [
            ...dbData.map((dbPokemon) => ({ ...dbPokemon, fromDb: true })),
          ];

          for (const apiPokemon of apiData.results) {
            const response = await fetch(apiPokemon.url);
            const data = await response.json();

            const existingPokemon = combinedData.find(
              (p) => p.name === data.name
            );
            if (!existingPokemon) {
              combinedData.push({ ...data, fromDb: false });
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
  }, [dbData, apiData]);

  return { combinedPokemonData, loading, error };
};

export default useCombinedPokemonData;
