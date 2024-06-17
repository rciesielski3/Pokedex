import styled from "styled-components";
import { darkTheme, lightTheme } from "../../shared/theme/themes";

export const CardContainer = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: transform 0.3s ease;
  text-align: center;
  background-color: var(--card-bg-color);
  color: var(--text-color);

  &:hover {
    transform: scale(1.05);
  }

  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)}
`;

export const PokemonImage = styled.img`
  width: 150px;
  height: 150px;
  margin-bottom: 10px;
  justify-self: center;
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
