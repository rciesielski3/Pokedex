import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppBar, Tabs, Tab, Typography } from "@mui/material";
import {
  NavigationContainer,
  Logo,
  NavigationTabs,
  StyledButton,
  ThemeSwitchContainer,
  ButtonContainer,
  NavigationWrapper,
  HeaderImg,
} from "./Navigation.styles";
import pokemonLogo from "../../../icons/pokemon-logo.png";
import headerImg from "../../../icons/pokemon-header.png";
import CustomizedSwitches from "../../../services/switch/CustomizedSwitches";
import { useTheme } from "../../../context/ThemeContext";
import { LoginContext } from "../../../context/LoginContext";

const Navigation = ({ handleLogin, handleRegister }) => {
  const { theme } = useTheme();
  const { isLoggedIn, userName, setLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("userIsLoggedIn", "false");
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <NavigationWrapper theme={theme}>
      <HeaderImg src={headerImg} alt="Pokemon header" />
      {isLoggedIn && <Typography variant="h5">Welcome, {userName}!</Typography>}
      <AppBar position="static">
        <Tabs>
          <Tab
            component={Link}
            to="/"
            icon={<Logo src={pokemonLogo} alt="Pokemon Logo" />}
            value={0}
          />
          <NavigationContainer>
            {isLoggedIn ? (
              <>
                <NavigationTabs>
                  <Tab
                    component={Link}
                    to="/favorites"
                    label="Favorites"
                    value={1}
                  />
                  <Tab component={Link} to="/arena" label="Arena" value={2} />
                  <Tab
                    component={Link}
                    to="/statistics"
                    label="Statistics"
                    value={3}
                  />
                  <Tab
                    component={Link}
                    to="/edition"
                    label="Edition"
                    value={4}
                  />
                </NavigationTabs>
                <StyledButton
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </StyledButton>
              </>
            ) : (
              <ButtonContainer>
                <StyledButton
                  color="secondary"
                  variant="contained"
                  onClick={handleLogin}
                >
                  LOGIN
                </StyledButton>
                <StyledButton
                  color="warning"
                  variant="contained"
                  onClick={handleRegister}
                >
                  REGISTER
                </StyledButton>
              </ButtonContainer>
            )}
          </NavigationContainer>
          <ThemeSwitchContainer>
            <CustomizedSwitches onClick={theme} />
          </ThemeSwitchContainer>
        </Tabs>
      </AppBar>
    </NavigationWrapper>
  );
};

export default Navigation;
