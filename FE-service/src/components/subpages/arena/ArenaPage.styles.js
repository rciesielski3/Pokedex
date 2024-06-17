import styled from "styled-components";
import { lightTheme, darkTheme } from "../../shared/theme/themes";

export const ArenaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  color: var(--text-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)};
`;

export const ArenaContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const PokemonCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  position: relative;
`;

export const FightButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FightButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "#0056b3")};
  }
`;

export const PokemonListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export const PokemonListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TrashIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

export const EmptyCardContainer = styled.div`
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
  filter: brightness(0.6);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)}
`;

export const EmptyCardImage = styled.img`
  width: 150px;
  height: 150px;
  padding-bottom: 100px;
`;
