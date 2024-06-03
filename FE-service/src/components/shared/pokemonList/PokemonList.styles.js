import styled from "styled-components";
import { darkTheme, lightTheme } from "../../shared/theme/themes";

export const PokemonListContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const PokemonItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 100px;
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
  text-transform: capitalize;
`;

export const PokemonAttribute = styled.p`
  font-size: 14px;
  margin-bottom: 3px;
`;

export const PokemonExtraInfo = styled.div`
  top: 8px;
  left: 16px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
`;
