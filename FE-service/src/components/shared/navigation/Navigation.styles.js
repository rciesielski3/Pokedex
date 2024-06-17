import styled from "styled-components";
import { Button, AppBar } from "@mui/material";
import { darkTheme, lightTheme } from "../../shared/theme/themes";

export const NavigationWrapper = styled.div`
  text-align: center;
  background-color: var(--card-bg-color);
  color: var(--text-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)}
`;

export const HeaderImg = styled.img`
  height: 150px;
  gap: 20px;
`;

export const StyledAppBar = styled(AppBar)`
  padding-top: 20px;
  display: flex;
`;

export const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
  color: var(--text-color);
  background-color: var(--navigation-color);
`;

export const ButtonContainer = styled(Button)`
  justify-content: space-between;
  gap: 20px;
`;

export const Logo = styled.img`
  width: 100px;
`;

export const NavigationTabs = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const StyledButton = styled(Button)`
  border: none;
  cursor: pointer;
  gap: 20px;
`;

export const ThemeSwitchContainer = styled.div`
  display: flex;
`;
