import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/subpages/home/Home";
import { ThemeProvider } from "./context/ThemeContext";
import Navigation from "./components/shared/navigation/Navigation";
import FavoritesPage from "./components/subpages/favorites/FavoritesPage";
import ArenaPage from "./components/subpages/arena/ArenaPage";
import StatisticsPage from "./components/subpages/statistics/StatisticsPage";
import EditionPage from "./components/subpages/edition/EditionPage";
import Snackbar from "./services/snackbar/Snackbar";
import { LoginProvider } from "./context/LoginContext";
import UserAuth from "./components/shared/login/UserAuth";
import NotFound from "./components/subpages/notFound/NotFound";
import ProtectedRoute from "./components/shared/login/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <LoginProvider>
        <Snackbar>
          <Router basename="/Pokedex">
            <UserAuth>
              {({ handleLogin, handleRegister }) => (
                <Navigation
                  handleLogin={handleLogin}
                  handleRegister={handleRegister}
                />
              )}
            </UserAuth>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/favorites"
                element={<ProtectedRoute component={FavoritesPage} />}
              />
              <Route
                path="/arena"
                element={<ProtectedRoute component={ArenaPage} />}
              />
              <Route
                path="/statistics"
                element={<ProtectedRoute component={StatisticsPage} />}
              />
              <Route
                path="/edition"
                element={<ProtectedRoute component={EditionPage} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </Snackbar>
      </LoginProvider>
    </ThemeProvider>
  );
}

export default App;
