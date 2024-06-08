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
import useFetch from "../../../hooks/useFetch";

const ITEMS_PER_PAGE = 10;

const StatisticsPage = () => {
  const { theme } = useTheme();

  const [pokemonStats, setPokemonStats] = useState([]);
  const [sortBy, setSortBy] = useState("base_experience");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedPokemonId, setSelectedPokemonId] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const {
    data: arenaFightsData,
    loading: fightsLoading,
    error: fightsError,
  } = useGetDbData("arenaFights");

  const {
    data: allPokemonData,
    loading: apiLoading,
    error: apiError,
  } = usePokemonApi(`pokemon?limit=150`);

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
    if (arenaFightsData && allPokemonData) {
      const fetchAdditionalData = async () => {
        const apiData = await Promise.all(
          allPokemonData.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            const data = await response.json();
            return { ...data, fromDb: false };
          })
        );

        const uniquePokemons = [
          ...arenaFightsData.map((dbPokemon) => ({
            ...dbPokemon,
            fromDb: true,
          })),
        ];

        apiData.forEach((apiPokemon) => {
          if (!uniquePokemons.some((p) => p.name === apiPokemon.name)) {
            uniquePokemons.push(apiPokemon);
          }
        });

        const sortedData = [...uniquePokemons].sort((a, b) => {
          if (sortOrder === "asc") {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        });
        setPokemonStats(sortedData);
      };

      fetchAdditionalData();
    }
  }, [arenaFightsData, allPokemonData, sortBy, sortOrder]);

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

  if (fightsLoading || pokemonLoading || apiLoading) {
    return <CircularProgress />;
  }

  if (fightsError || pokemonError || apiError) {
    return enqueueSnackbar(
      `Error loading data: ${fightsError || pokemonError || apiError}`,
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
