import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import useDataHandler from "../../../hooks/useDataHandler";
import { POKEMON_API_POKEMON } from "../../../../../apiConfig";

const useHandleFight = (
  selectedPokemons,
  arenaFightsData,
  setSelectedPokemons
) => {
  const { deleteData: deleteArenaPokemonData } =
    useDataHandler("arenaPokemons");
  const { postData: postFightResultData, putData: putFightResultData } =
    useDataHandler("pokemons");

  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  const handleFight = async () => {
    if (selectedPokemons.length === 2) {
      const [pokemon1, pokemon2] = selectedPokemons;
      const pokemon1Score = pokemon1.base_experience * pokemon1.weight;
      const pokemon2Score = pokemon2.base_experience * pokemon2.weight;

      let fightWinner = null;
      let updatedWinnerData = null;

      if (pokemon1Score > pokemon2Score) {
        fightWinner = pokemon1;
        updatedWinnerData = {
          ...pokemon1,
          win: (pokemon1.win || 0) + 1,
          lose: pokemon1.lose || 0,
        };
      } else if (pokemon2Score > pokemon1Score) {
        fightWinner = pokemon2;
        updatedWinnerData = {
          ...pokemon2,
          win: (pokemon2.win || 0) + 1,
          lose: pokemon2.lose || 0,
        };
      } else {
        setDraw(true);
      }

      if (fightWinner) {
        setWinner(updatedWinnerData);
        setShowWinnerModal(true);
      }

      if (!draw) {
        try {
          await Promise.all(
            selectedPokemons.map(async (pokemon) => {
              const existingFightData = arenaFightsData.find(
                (data) => data.id === String(pokemon.id)
              );

              if (existingFightData) {
                await putFightResultData(existingFightData.id, {
                  ...existingFightData,
                  win:
                    existingFightData.win +
                    (fightWinner.id === pokemon.id ? 1 : 0),
                  lose:
                    existingFightData.lose +
                    (fightWinner.id !== pokemon.id ? 1 : 0),
                });
              } else {
                await postFightResultData({
                  id: String(pokemon.id),
                  name: pokemon.name,
                  height: pokemon.height,
                  weight: pokemon.weight,
                  base_experience: pokemon.base_experience + 10,
                  win: fightWinner.id === pokemon.id ? 1 : 0,
                  lose: fightWinner.id !== pokemon.id ? 1 : 0,
                  url: `${POKEMON_API_POKEMON}/${pokemon.id}`,
                });
              }
            })
          );
        } catch (error) {
          enqueueSnackbar(`Error storing data: ${error}`, {
            variant: "error",
          });
        }
      }
    }
  };

  const handleCloseWinnerModal = async () => {
    await handleLeaveArena();
    setShowWinnerModal(false);
  };

  const handleLeaveArena = async () => {
    try {
      selectedPokemons.map(async (pokemon) => {
        await deleteArenaPokemonData(pokemon.id);
      });
      setSelectedPokemons([]);
      setWinner(null);
      setDraw(false);
    } catch (error) {
      enqueueSnackbar(`Error clearing arena: ${error}`, {
        variant: "error",
      });
    }
  };

  const removePokemonFromArena = async (pokemonId) => {
    try {
      await deleteArenaPokemonData(pokemonId);
      setSelectedPokemons((prevPokemons) =>
        prevPokemons.filter((pokemon) => pokemon.id !== pokemonId)
      );
    } catch (error) {
      enqueueSnackbar(`Error removing Pokemon from arena: ${error}`, {
        variant: "error",
      });
    }
  };

  return {
    handleFight,
    winner,
    draw,
    showWinnerModal,
    handleCloseWinnerModal,
    handleLeaveArena,
    removePokemonFromArena,
  };
};

export default useHandleFight;
