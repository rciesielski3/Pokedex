import { useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import useDataHandler from "../../../hooks/useDataHandler";
import useGetDbData from "../../../hooks/useGetDbData";
import { POKEMON_API_POKEMON } from "../../../../../apiConfig";

const useTogglePokemonStatus = (pokemon) => {
  const { name, height, weight, base_experience } = pokemon;
  const favoritePokemonDataHandler = useDataHandler("favoritePokemons");
  const arenaPokemonDataHandler = useDataHandler("arenaPokemons");
  const { data: favoritePokemonData } = useGetDbData("favoritePokemons");
  const { data: arenaPokemonsData } = useGetDbData("arenaPokemons");
  const [isFavorite, setIsFavorite] = useState(false);
  const [inArena, setInArena] = useState(false);
  const [arenaPokemons, setArenaPokemons] = useState([]);

  useEffect(() => {
    if (!favoritePokemonData) return;
    const isAlreadyFavorite = favoritePokemonData.some(
      (favPokemon) => favPokemon.name === name
    );
    setIsFavorite(isAlreadyFavorite);
  }, [favoritePokemonData, name]);

  useEffect(() => {
    if (!arenaPokemonsData) return;
    const inArena = arenaPokemonsData.some(
      (arenaPokemon) => arenaPokemon.name === name
    );
    setInArena(inArena);
    setArenaPokemons(arenaPokemonsData);
  }, [arenaPokemonsData, name]);

  const togglePokemonStatus = async (type) => {
    const isType = type === "favorite" ? isFavorite : inArena;
    const dataHandler =
      type === "favorite"
        ? favoritePokemonDataHandler
        : arenaPokemonDataHandler;
    const statusHandler = type === "favorite" ? setIsFavorite : setInArena;
    const message =
      type === "favorite" ? ["favorite", "favorites"] : ["arena", "arena"];

    try {
      if (isType) {
        await dataHandler.deleteData(pokemon.id);
        statusHandler(false);
        if (type === "arena") {
          setArenaPokemons(arenaPokemons.filter((poke) => poke.name !== name));
        }
        enqueueSnackbar(`Pokémon ${pokemon.name} removed from ${message[1]}!`, {
          variant: "error",
        });
      } else {
        if (type === "arena" && arenaPokemons.length >= 2) {
          enqueueSnackbar("You can only select 2 Pokémon for the arena!", {
            variant: "error",
          });
          return;
        }
        await dataHandler.postData({
          id: String(pokemon.id),
          name,
          height,
          weight,
          base_experience,
          url: `${POKEMON_API_POKEMON}/${pokemon.id}`,
        });
        statusHandler(true);
        if (type === "arena") {
          setArenaPokemons([...arenaPokemons, { id: pokemon.id, name }]);
        }
        enqueueSnackbar(`Pokémon ${pokemon.name} added to ${message[0]}!`, {
          variant: "success",
        });
      }
    } catch (error) {
      enqueueSnackbar(
        `Failed to ${isType ? "remove" : "add"} Pokémon from ${
          message[0]
        }. Please try again.`,
        {
          variant: "default",
        }
      );
    }
  };

  return {
    isFavorite,
    inArena,
    arenaPokemons,
    togglePokemonStatus,
  };
};

export default useTogglePokemonStatus;
