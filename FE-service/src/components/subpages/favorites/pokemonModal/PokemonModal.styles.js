import styled from "styled-components";
import { darkTheme, lightTheme } from "../../../shared/theme/themes";

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 2;
  background-color: var(--card-bg-color);
  color: var(--text-color);

  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)}
`;

export const PokemonImage = styled.img`
  max-width: 170px;
  max-height: 170px;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1;
`;

export const SelectedPokemonLabel = styled.div`
  position: absolute;
  up: 10px;
  left: 60px;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`;
