import { createPortal } from "react-dom";
import { Typography } from "@mui/material";
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  LeaveButton,
  PokemonName,
  PokemonImage,
} from "./WinnerModal.styles";
import { useTheme } from "../../../context/ThemeContext";
import { POKEMON_IMG } from "../../../../../apiConfig";

const WinnerModal = ({ winner, onClose }) => {
  const handleClose = () => {
    onClose();
  };
  const { theme } = useTheme();
  return createPortal(
    <ModalOverlay onClick={onClose}>
      <ModalContainer theme={theme}>
        <ModalContent>
          <Typography variant="h4">Winner</Typography>
          <PokemonImage
            src={`${POKEMON_IMG}/${winner.id}.svg`}
            alt={winner.name}
          />
          <PokemonName>{winner.name}</PokemonName>
          <Typography variant="body1">
            Win: {winner.win}, Lost: {winner.lost || 0}
          </Typography>

          <Typography variant="body1" color="green" fontSize={30}>
            New Base Experience: {winner.base_experience + 10}
          </Typography>
          <LeaveButton variant="contained" onClick={handleClose}>
            Leave Arena
          </LeaveButton>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>,
    document.body
  );
};

export default WinnerModal;
