import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import {
  CardContainer,
  PokemonImage,
  PokemonName,
  PokemonAttribute,
} from "./PokemonCard.styles";
import PokemonModal from "../pokemonModal/PokemonModal";
import usePokemonApi from "../../../hooks/usePokemonApi";
import { useTheme } from "../../../context/ThemeContext";
import { enqueueSnackbar } from "notistack";
import { POKEMON_IMG } from "../../../../../apiConfig";

const PokemonCard = ({ pokemon }) => {
  const { id, name, url, height, weight, base_experience } = pokemon;
  const endpoint = url ? url.split("api/v2/")[1] : null;
  const { data, loading, error } = usePokemonApi(endpoint);
  const { theme } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`Error loading Pokémon data: ${error}`, {
        variant: "error",
      });
    }
  }, [error]);

  if (loading) {
    return <CircularProgress />;
  }

  const abilities =
    data?.abilities?.map((ability) => ability.ability.name).join(", ") ||
    "Unknown";
  const stats = data?.stats;

  return (
    <>
      {modalOpen && data && (
        <PokemonModal
          pokemon={{ ...data, name, stats }}
          onClose={toggleModal}
          theme={theme}
        />
      )}
      <CardContainer onClick={toggleModal} theme={theme}>
        <PokemonImage src={`${POKEMON_IMG}/${id}.svg`} alt={name} />
        <PokemonName>{name}</PokemonName>
        <PokemonAttribute>Height: {height}</PokemonAttribute>
        <PokemonAttribute>Weight: {weight}</PokemonAttribute>
        <PokemonAttribute>Base Experience: {base_experience}</PokemonAttribute>
        <PokemonAttribute>Abilities: {abilities}</PokemonAttribute>
      </CardContainer>
    </>
  );
};

export default PokemonCard;
