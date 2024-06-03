import { useState } from "react";
import useGetDbData from "../../../hooks/useGetDbData";
import { Button, CircularProgress, Typography } from "@mui/material";
import PokemonForm from "./forms/PokemonForm";
import EditPokemonForm from "./forms/EditPokemonForm";
import PokemonList from "../../shared/pokemonList/PokemonList";
import { enqueueSnackbar } from "notistack";
import { useTheme } from "../../../context/ThemeContext";
import { EditionContainer } from "./EditionPage.styles";
import Pagination from "../../../services/pagination/Pagination";
import usePagination from "../../../hooks/usePagination";

const ITEMS_PER_PAGE = 10;

const EditionPage = () => {
  const { theme } = useTheme();
  const {
    data: pokemonsData,
    loading: pokemonsLoading,
    error: pokemonsError,
  } = useGetDbData("pokemons");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editPokemonId, setEditPokemonId] = useState(null);

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleEditClick = (id) => {
    setEditPokemonId(id);
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditPokemonId(null);
  };

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedPokemonsData,
    handlePageChange,
  } = usePagination(pokemonsData || [], ITEMS_PER_PAGE);

  if (pokemonsLoading) {
    return <CircularProgress />;
  }

  if (pokemonsError) {
    enqueueSnackbar(`Error loading Pokémon data: ${pokemonsError}`, {
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
      {pokemonsData.length === 0 ? (
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
        <EditPokemonForm onClose={handleCloseForm} pokemonId={editPokemonId} />
      )}
    </EditionContainer>
  );
};

export default EditionPage;
