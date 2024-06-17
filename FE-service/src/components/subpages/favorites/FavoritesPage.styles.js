import styled from "styled-components";
import { lightTheme, darkTheme } from "../../shared/theme/themes";

export const FavoritesContainer = styled.div`
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
  align-items: center;
  background-color: var(--background-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)};
`;

export const PokemonListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
