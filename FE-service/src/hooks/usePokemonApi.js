import { POKEMON_API } from "../../../apiConfig";
import useFetch from "./useFetch";

const usePokemonApi = (endpoint) => {
  const url = `${POKEMON_API}/${endpoint}`;
  return useFetch(url);
};

export default usePokemonApi;
