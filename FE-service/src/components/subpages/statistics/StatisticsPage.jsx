import { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import {
  PokemonListContainer,
  SortContainer,
  RadioGroupContainer,
  StatisticsContainer,
} from "./StatisticsPage.styles";
import Pagination from "../../../services/pagination/Pagination";
import PokemonList from "../../shared/pokemonList/PokemonList";
import PokemonModal from "../../shared/pokemonModal/PokemonModal";
import usePokemonApi from "../../../hooks/usePokemonApi";
import usePagination from "../../../hooks/usePagination";
import useCombinedPokemonData from "../../../hooks/useCombinedPokemonData";
import { useTheme } from "../../../context/ThemeContext";
import { enqueueSnackbar } from "notistack";

const ITEMS_PER_PAGE = 15;

const StatisticsPage = () => {
  const { theme } = useTheme();

  const [pokemonStats, setPokemonStats] = useState([]);
  const [sortBy, setSortBy] = useState("base_experience");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPokemonId, setSelectedPokemonId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: apiPokemonsData,
    loading: apiLoading,
    error: apiError,
  } = usePokemonApi(`pokemon?limit=150`);

  const {
    combinedPokemonData,
    loading: combinedLoading,
    error: combinedError,
  } = useCombinedPokemonData("arenaFights", apiPokemonsData);

  const {
    data: selectedPokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemonApi(
    selectedPokemonId ? `pokemon/${selectedPokemonId}` : `pokemon/1`
  );

  const {
    currentPage,
    totalPages,
    paginatedItems: slicedPokemonData,
    handlePageChange,
  } = usePagination(pokemonStats, ITEMS_PER_PAGE);

  useEffect(() => {
    if (combinedPokemonData && apiPokemonsData) {
      const sortedData = [...combinedPokemonData].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
      setPokemonStats(sortedData);
    }
  }, [combinedPokemonData, apiPokemonsData, sortBy, sortOrder]);

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const handleMoreInfoClick = (id) => {
    setSelectedPokemonId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPokemonId(1);
  };

  if (combinedLoading || pokemonLoading || apiLoading) {
    return <CircularProgress />;
  }

  if (combinedError || pokemonError || apiError) {
    return enqueueSnackbar(
      `Error loading data: ${combinedError || pokemonError || apiError}`,
      {
        variant: "error",
      }
    );
  }

  return (
    <StatisticsContainer theme={theme}>
      {modalOpen && selectedPokemon && !pokemonLoading && (
        <PokemonModal pokemon={selectedPokemon} onClose={handleCloseModal} />
      )}
      {pokemonLoading && <CircularProgress />}
      {pokemonError && <p>Error: {pokemonError}</p>}
      <Typography variant="h6">
        Here you can filter and sort the arena Pokémons
      </Typography>
      <SortContainer theme={theme}>
        <FormControl variant="filled">
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} onChange={handleChangeSortBy}>
            <MenuItem value="base_experience">Base Experience</MenuItem>
            <MenuItem value="weight">Weight</MenuItem>
            <MenuItem value="height">Height</MenuItem>
            <MenuItem value="win">Wins</MenuItem>
            <MenuItem value="lose">Losses</MenuItem>
          </Select>
        </FormControl>
        <RadioGroupContainer>
          <RadioGroup row value={sortOrder} onChange={handleChangeSortOrder}>
            <FormControlLabel
              value="asc"
              control={<Radio />}
              label="Ascending"
            />
            <FormControlLabel
              value="desc"
              control={<Radio />}
              label="Descending"
            />
          </RadioGroup>
        </RadioGroupContainer>
      </SortContainer>
      <PokemonListContainer>
        <PokemonList
          pokemonsData={slicedPokemonData}
          onClickHandle={handleMoreInfoClick}
          buttonText="More Info"
          extraInfo={(pokemon) => (
            <>
              {pokemon.fromDb ? (
                <>
                  Wins: {pokemon.win} / Losses: {pokemon.lose}
                </>
              ) : (
                <>No stats available</>
              )}
            </>
          )}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </PokemonListContainer>
    </StatisticsContainer>
  );
};

export default StatisticsPage;
