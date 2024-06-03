import { useState, useEffect } from "react";
import useGetDbData from "../../../hooks/useGetDbData";
import { CircularProgress, Typography } from "@mui/material";
import PokemonCard from "../../shared/pokemonCard/PokemonCard";
import Pagination from "../../../services/pagination/Pagination";
import { enqueueSnackbar } from "notistack";
import {
  FavoritesContainer,
  PokemonListContainer,
  PokemonListWrapper,
} from "./FavoritesPage.styles";
import { useTheme } from "../../../context/ThemeContext";
import usePagination from "../../../hooks/usePagination";

const ITEMS_PER_PAGE = 15;

const FavoritesPage = () => {
  const {
    data: favoritePokemonsData,
    loading,
    error,
  } = useGetDbData("favoritePokemons");
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (favoritePokemonsData) {
      setFavoritePokemons(favoritePokemonsData);
    }
  }, [favoritePokemonsData]);

  const {
    currentPage,
    totalPages,
    paginatedItems: slicedPokemonData,
    handlePageChange,
  } = usePagination(favoritePokemons, ITEMS_PER_PAGE);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    enqueueSnackbar(`Error loading Pokémon data: ${error}`, {
      variant: "error",
    });
    return null;
  }

  return (
    <FavoritesContainer theme={theme}>
      {favoritePokemons.length === 0 ? (
        <Typography variant="h6">
          Here you will find your Favorites pokemons. Add pokemon to the list
          via heart icon.
        </Typography>
      ) : (
        <PokemonListContainer theme={theme}>
          <Typography variant="h6">
            Below you will find your Favorites pokemons.
          </Typography>
          <PokemonListWrapper>
            {slicedPokemonData.map((pokemon, index) => (
              <PokemonCard pokemon={pokemon} key={index} />
            ))}
          </PokemonListWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </PokemonListContainer>
      )}
    </FavoritesContainer>
  );
};

export default FavoritesPage;
