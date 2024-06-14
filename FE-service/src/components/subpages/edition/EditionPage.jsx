import { useState, useEffect } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { EditionContainer } from "./EditionPage.styles";
import PokemonForm from "./forms/PokemonForm";
import EditPokemonForm from "./forms/EditPokemonForm";
import PokemonList from "../../shared/pokemonList/PokemonList";
import { useTheme } from "../../../context/ThemeContext";
import Pagination from "../../../services/pagination/Pagination";
import usePagination from "../../../hooks/usePagination";
import useCombinedPokemonData from "../../../hooks/useCombinedPokemonData";
import { enqueueSnackbar } from "notistack";

const ITEMS_PER_PAGE = 15;

const EditionPage = () => {
  const { theme } = useTheme();
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editPokemonId, setEditPokemonId] = useState(null);

  const {
    combinedPokemonData,
    loading: combinedLoading,
    error: combinedError,
    fetchData,
  } = useCombinedPokemonData();

  useEffect(() => {
    if (combinedPokemonData) {
      setPokemonDetails(combinedPokemonData);
    }
  }, [combinedPokemonData]);

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleEditClick = (id) => {
    setEditPokemonId(id);
  };

  const handleCloseForm = async () => {
    setShowCreateForm(false);
    setEditPokemonId(null);
  };

  const handlePokemonUpdate = (updatedPokemon) => {
    setPokemonDetails((prevDetails) =>
      prevDetails.map((pokemon) =>
        pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
      )
    );
  };

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedPokemonsData,
    handlePageChange,
  } = usePagination(pokemonDetails, ITEMS_PER_PAGE);

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
    <EditionContainer theme={theme}>
      <Typography variant="h6">
        Here you can create or edit existing Pokémon.
      </Typography>
      <Button variant="contained" color="warning" onClick={handleCreateClick}>
        Create Pokémon
      </Button>
      {pokemonDetails.length === 0 ? (
        <Typography variant="h6">
          Here you will find your created Pokémons.
        </Typography>
      ) : (
        <>
          <Typography variant="h6">Created Pokémons:</Typography>
          <PokemonList
            pokemonsData={paginatedPokemonsData}
            onClickHandle={handleEditClick}
            buttonText="Edit"
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      {showCreateForm && <PokemonForm onClose={handleCloseForm} />}
      {editPokemonId && (
        <EditPokemonForm
          onClose={handleCloseForm}
          pokemonId={editPokemonId}
          onPokemonUpdate={handlePokemonUpdate}
        />
      )}
    </EditionContainer>
  );
};

export default EditionPage;
