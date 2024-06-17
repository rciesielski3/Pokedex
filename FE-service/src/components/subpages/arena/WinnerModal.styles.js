import styled from "styled-components";
import { lightTheme, darkTheme } from "../../shared/theme/themes";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: var(--card-bg-color);
  color: var(--text-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)}
  border-radius: 8px;
  padding: 20px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  margin-bottom: 10px;
`;

export const PokemonName = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
  text-transform: capitalize;
`;

export const PokemonAttribute = styled.p`
  font-size: 14px;
  margin-bottom: 3px;
`;

export const LeaveButton = styled.button`
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;
