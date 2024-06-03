import styled from "styled-components";
import { darkTheme, lightTheme } from "../../shared/theme/themes";

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

export const SearchInput = styled.input`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  font-size: 16px;
`;
