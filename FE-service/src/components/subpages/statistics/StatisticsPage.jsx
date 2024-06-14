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
import Pagination from "../../../services/pagination/Pagination";
import PokemonList from "../../shared/pokemonList/PokemonList";
import PokemonModal from "../../shared/pokemonModal/PokemonModal";
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
import useCombinedPokemonData from "../../../hooks/useCombinedPokemonData";

const ITEMS_PER_PAGE = 10;

const StatisticsPage = () => {
  const { theme } = useTheme();

  const [pokemonStats, setPokemonStats] = useState([]);
  const [sortBy, setSortBy] = useState("base_experience");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPokemonId, setSelectedPokemonId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    combinedPokemonData,
    loading: combinedLoading,
    error: combinedError,
  } = useCombinedPokemonData();

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
    if (combinedPokemonData) {
      const sortedData = [...combinedPokemonData].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
      setPokemonStats(sortedData);
    }
  }, [combinedPokemonData, sortBy, sortOrder]);

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

  if (pokemonLoading || combinedLoading) {
    return <CircularProgress />;
  }

  if (pokemonError || combinedError) {
    return enqueueSnackbar(
      `Error loading data: ${pokemonError || combinedError}`,
      {
        variant: "error",
      }
    );
  }

  const modalData = selectedPokemonId
    ? {
        ...selectedPokemon,
        name:
          combinedPokemonData.find((p) => p.id === selectedPokemonId)?.name ||
          selectedPokemon?.name,
      }
    : null;

  return (
    <StatisticsContainer theme={theme}>
      {modalOpen && modalData && (
        <PokemonModal pokemon={modalData} onClose={handleCloseModal} />
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
          extraInfo={(pokemon) =>
            pokemon.fromDb ? (
              pokemon.win !== undefined && pokemon.lose !== undefined ? (
                <>
                  Wins: {pokemon.win} / Losses: {pokemon.lose}
                </>
              ) : (
                <>No stats available</>
              )
            ) : null
          }
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
