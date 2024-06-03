import { useState, useEffect } from "react";
import useGetDbData from "../../../hooks/useGetDbData";
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
import Pagination from "../../../services/pagination/Pagination";
import PokemonList from "../../shared/pokemonList/PokemonList";
import PokemonModal from "../favorites/pokemonModal/PokemonModal";
import usePokemonApi from "../../../hooks/usePokemonApi";
import {
  PokemonListContainer,
  SortContainer,
  RadioGroupContainer,
  StatisticsContainer,
} from "./StatisticsPage.styles";
import { useTheme } from "../../../context/ThemeContext";
import { enqueueSnackbar } from "notistack";
import usePagination from "../../../hooks/usePagination";

const ITEMS_PER_PAGE = 10;

const StatisticsPage = () => {
  const { theme } = useTheme();

  const [pokemonStats, setPokemonStats] = useState([]);
  const [sortBy, setSortBy] = useState("base_experience");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPokemonId, setSelectedPokemonId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: arenaFightsData,
    loading: fightsLoading,
    error: fightsError,
  } = useGetDbData("arenaFights");

  const {
    data: selectedPokemon,
    loading: pokemonLoading,
    error: pokemonError,
  } = usePokemonApi(selectedPokemonId ? `pokemon/${selectedPokemonId}` : null);

  const {
    currentPage,
    totalPages,
    paginatedItems: slicedPokemonData,
    handlePageChange,
  } = usePagination(pokemonStats, ITEMS_PER_PAGE);

  useEffect(() => {
    if (arenaFightsData) {
      const sortedData = [...arenaFightsData].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
      setPokemonStats(sortedData);
      if (sortedData.length > 0) {
        setSelectedPokemonId(sortedData[0].id);
      }
    }
  }, [arenaFightsData, sortBy, sortOrder]);

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
  };

  const handleChangeSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  const handleMoreInfoClick = (id) => {
    setSelectedPokemonId(id);
    !selectedPokemonId ? pokemonLoading : setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedPokemonId(1);
  };

  if (fightsLoading || pokemonLoading) {
    return <CircularProgress />;
  }

  if (fightsError || pokemonError) {
    return enqueueSnackbar(
      `Error loading data: ${fightsError || pokemonError}`,
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
              Wins: {pokemon.win} / Losses: {pokemon.lose}
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
