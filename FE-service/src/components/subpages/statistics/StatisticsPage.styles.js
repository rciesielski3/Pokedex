import styled from "styled-components";
import {
  Select as MUISelect,
  FormControl as MUIFormControl,
} from "@mui/material";
import { lightTheme, darkTheme } from "../../shared/theme/themes";

export const StatisticsContainer = styled.div`
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
`;

export const PokemonListWrapper = styled.div`
  display: grid;
  gap: 20px;
  padding: 20px;
`;

export const CardContainer = styled.div`
  position: relative;
`;

export const SortContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  justify-content: center;
  background-color: var(--card-bg-color);
  color: var(--text-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)};
`;

export const FormControl = styled(MUIFormControl)`
  margin-right: 16px;
`;

export const InputLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: #3f51b5;
  padding-right: 10px;
`;

export const Select = styled(MUISelect)`
  font-size: 1rem;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  margin-top: 4px;
`;

export const RadioGroupContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 8px;
  margin-left: 10px;
  border-radius: 4px;
`;
