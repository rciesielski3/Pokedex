import { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import {
  ArenaContainer,
  ArenaContent,
  PokemonListContainer,
  PokemonListWrapper,
  PokemonCardContainer,
  FightButtonContainer,
  FightButton,
  EmptyCardImage,
  TrashIcon,
  EmptyCardContainer,
  SummaryContainer,
} from "./ArenaPage.styles";
import TrashImage from "../../../icons/trash.png";
import PokeballImage from "../../../icons/pokeball.png";
import PokemonCard from "../../shared/pokemonCard/PokemonCard";
import { useTheme } from "../../../context/ThemeContext";
import useGetDbData from "../../../hooks/useGetDbData";
import WinnerModal from "./WinnerModal";
import useHandleFight from "./useHandleFight";
import { enqueueSnackbar } from "notistack";

const ArenaPage = () => {
  const {
    data: arenaPokemonData,
    loading: arenaLoading,
    error: arenaError,
  } = useGetDbData("arenaPokemons");
  const {
    data: arenaFightsData,
    loading: fightsLoading,
    error: fightsError,
  } = useGetDbData("arenaFights");

  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (arenaPokemonData) {
      setSelectedPokemons(arenaPokemonData);
    }
  }, [arenaPokemonData]);

  const {
    handleFight,
    winner,
    draw,
    showWinnerModal,
    handleCloseWinnerModal,
    handleLeaveArena,
    removePokemonFromArena,
  } = useHandleFight(selectedPokemons, arenaFightsData, setSelectedPokemons);

  if (arenaLoading || fightsLoading) {
    return <CircularProgress />;
  }

  if (arenaError || fightsError) {
    enqueueSnackbar(`Error: ${arenaError || fightsError}`, {
      variant: "error",
    });
    return null;
  }

  return (
    <ArenaContainer theme={theme}>
      <Typography variant="h6">
        The Arena is a location that allows you to perform battle of selected
        Pokémons.
      </Typography>
      {selectedPokemons.length !== 2 && (
        <Typography variant="h5">Select two Pokémons for fight!</Typography>
      )}
      <ArenaContent>
        <PokemonListContainer>
          <PokemonListWrapper>
            <PokemonCardContainer>
              {selectedPokemons[0] ? (
                <PokemonCard pokemon={selectedPokemons[0]} />
              ) : (
                <EmptyCardContainer>
                  <EmptyCardImage src={PokeballImage} alt="Pokeball" />
                  <Typography variant="h7">Select pokemon!</Typography>
                </EmptyCardContainer>
              )}
              {selectedPokemons[0] && (
                <TrashIcon
                  src={TrashImage}
                  alt="Remove Pokemon"
                  onClick={() => removePokemonFromArena(selectedPokemons[0].id)}
                />
              )}
            </PokemonCardContainer>
            <FightButtonContainer>
              <FightButton
                onClick={handleFight}
                disabled={selectedPokemons.length !== 2}
              >
                FIGHT!
              </FightButton>
            </FightButtonContainer>
            <PokemonCardContainer>
              {selectedPokemons[1] ? (
                <PokemonCard pokemon={selectedPokemons[1]} />
              ) : (
                <EmptyCardContainer>
                  <EmptyCardImage src={PokeballImage} alt="Pokeball" />
                  <Typography variant="h7">Select Pokémon!</Typography>
                </EmptyCardContainer>
              )}
              {selectedPokemons[1] && (
                <TrashIcon
                  src={TrashImage}
                  alt="Remove Pokemon"
                  onClick={() => removePokemonFromArena(selectedPokemons[1].id)}
                />
              )}
            </PokemonCardContainer>
          </PokemonListWrapper>
        </PokemonListContainer>
      </ArenaContent>
      {showWinnerModal && winner && (
        <WinnerModal winner={winner} onClose={handleCloseWinnerModal} />
      )}
      {draw && (
        <SummaryContainer onClose={handleLeaveArena}>
          <Typography variant="h5">It's a draw!</Typography>
        </SummaryContainer>
      )}
    </ArenaContainer>
  );
};

export default ArenaPage;
