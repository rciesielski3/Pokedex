import { useState } from "react";
import usePokemonApi from "../../../hooks/usePokemonApi";
import {
  PokemonListContainer,
  SearchInput,
  PokemonListWrapper,
} from "./Home.styles";
import { CircularProgress, Typography } from "@mui/material";
import Pagination from "../../../services/pagination/Pagination";
import PokemonCard from "../../shared/pokemonCard/PokemonCard";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "../../../context/ThemeContext";
import Footer from "../../shared/login/Footer";

const ITEMS_PER_PAGE = 15;

const Home = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: allPokemonData,
    loading,
    error,
  } = usePokemonApi(`pokemon?limit=150`);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return enqueueSnackbar(`Error loading Pokémon data: ${error}`, {
      variant: "error",
    });
  }

  let filteredPokemon = searchTerm
    ? allPokemonData.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allPokemonData.results;

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const slicedPokemonData = filteredPokemon.slice(startIndex, endIndex);

  return (
    <PokemonListContainer theme={theme}>
      <SearchInput
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredPokemon.length === 0 ? (
        <Typography variant="h6" align="center" color="textSecondary">
          No Pokémon found.
          <Typography paragraph color="error">
            Change the search criteria!
          </Typography>
        </Typography>
      ) : (
        <>
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
          <Footer />
        </>
      )}
    </PokemonListContainer>
  );
};

export default Home;
