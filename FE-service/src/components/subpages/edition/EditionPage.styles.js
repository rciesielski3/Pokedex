import styled from "styled-components";
import { lightTheme, darkTheme } from "../../shared/theme/themes";

export const EditionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: var(--background-color);
  color: var(--text-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)};
`;

export const PokemonListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

export const PokemonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  martin-left: 10px;
  martin-right: 10px;
  gap: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: var(--card-bg-color);
  color: var(--text-color);

  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)}
`;
export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PokemonName = styled.h2`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const PokemonAttribute = styled.p`
  font-size: 14px;
  margin-bottom: 3px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

export const ModalContent = styled.div`
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  background-color: var(--card-bg-color);
  color: var(--text-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)}
`;

export const FormContent = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;
