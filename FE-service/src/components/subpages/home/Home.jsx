import { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import {
  PokemonListContainer,
  SearchInput,
  PokemonListWrapper,
} from "./Home.styles";
import { useTheme } from "../../../context/ThemeContext";
import Pagination from "../../../services/pagination/Pagination";
import PokemonCard from "../../shared/pokemonCard/PokemonCard";
import Footer from "../../shared/login/Footer";
import usePokemonApi from "../../../hooks/usePokemonApi";
import { enqueueSnackbar } from "notistack";
import useCombinedPokemonData from "../../../hooks/useCombinedPokemonData";

const ITEMS_PER_PAGE = 15;

const Home = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    combinedPokemonData,
    loading: combinedLoading,
    error: combinedError,
  } = useCombinedPokemonData();

  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [slicedPokemonData, setSlicedPokemonData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (combinedPokemonData) {
      const filtered = searchTerm
        ? combinedPokemonData.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : combinedPokemonData;

      setFilteredPokemon(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
      setSlicedPokemonData(
        filtered.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      );
    }
  }, [combinedPokemonData, searchTerm, currentPage]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (combinedLoading) {
    return <CircularProgress />;
  }

  if (combinedError) {
    enqueueSnackbar(`Error loading Pokémon data: ${combinedError}`, {
      variant: "error",
    });
    return null;
  }

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
