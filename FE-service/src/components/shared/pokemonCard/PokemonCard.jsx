import { useState } from "react";
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

const PokemonCard = ({ pokemon }) => {
  const { name, url } = pokemon;
  const endpoint = url.split("api/v2/")[1];
  const { data, loading, error } = usePokemonApi(endpoint);
  const { theme } = useTheme();

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  if (loading || !data) {
    return <CircularProgress />;
  }

  if (error) {
    return enqueueSnackbar(`Error loading Pokémon data: ${error}`, {
      variant: "error",
    });
  }

  const { sprites, height, weight, base_experience, abilities } = data;

  return (
    <>
      {modalOpen && (
        <PokemonModal pokemon={data} onClose={toggleModal} theme={theme} />
      )}
      <CardContainer onClick={toggleModal} theme={theme}>
        <PokemonImage
          src={sprites.other.dream_world.front_default}
          alt={name}
        />
        <PokemonName>{name}</PokemonName>
        <PokemonAttribute>Height: {height}</PokemonAttribute>
        <PokemonAttribute>Weight: {weight}</PokemonAttribute>
        <PokemonAttribute>Base Experience: {base_experience}</PokemonAttribute>
        <PokemonAttribute>
          Ability: {abilities[0].ability.name}
        </PokemonAttribute>
      </CardContainer>
    </>
  );
};

export default PokemonCard;
