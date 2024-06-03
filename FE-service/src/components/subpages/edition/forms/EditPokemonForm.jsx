import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import useGetDbData from "../../../../hooks/useGetDbData";
import useDataHandler from "../../../../hooks/useDataHandler";
import { createPortal } from "react-dom";
import {
  ModalOverlay,
  ModalContent,
  FormContent,
  PokemonName,
} from "../EditionPage.styles";
import { useTheme } from "../../../../context/ThemeContext";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  height: z.number().positive("Height must be a positive number"),
  weight: z.number().positive("Weight must be a positive number"),
  base_experience: z
    .number()
    .positive("Base Experience must be a positive number"),
});

const EditPokemonForm = ({ pokemonId, onClose }) => {
  const {
    data: pokemon,
    loading,
    error,
  } = useGetDbData(`pokemons/${pokemonId}`);
  const { putData } = useDataHandler("pokemons");
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (pokemon) {
      setValue("height", pokemon.height);
      setValue("weight", pokemon.weight);
      setValue("base_experience", pokemon.base_experience);
    }
    if (error) {
      enqueueSnackbar(`Error loading Pokémon data: ${error}`, {
        variant: "error",
      });
    }
  }, [pokemon, error, setValue]);

  const handleEditPokemon = async (data) => {
    const updatedPokemon = {
      ...pokemon,
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
    };

    try {
      await putData(pokemonId, updatedPokemon);
      enqueueSnackbar(`Attributes for ${pokemon.name} have been changed`, {
        variant: "success",
      });
      onClose();
    } catch (error) {
      enqueueSnackbar("Failed to update Pokémon. Please try again.", {
        variant: "error",
      });
    }
  };

  return createPortal(
    <ModalOverlay>
      <ModalContent theme={theme}>
        <Typography variant="h5">Edit Pokémon</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit(handleEditPokemon)}>
            <FormContent>
              <img
                src={pokemon.img}
                alt={pokemon.name}
                width={100}
                height={100}
              />
              <PokemonName style={{ textTransform: "capitalize" }}>
                {pokemon.name}
              </PokemonName>
              <TextField
                type="number"
                label="Height"
                {...register("height", { valueAsNumber: true })}
                error={!!errors.height}
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
              {errors.height && (
                <FormHelperText error>{errors.height.message}</FormHelperText>
              )}
              <TextField
                type="number"
                label="Weight"
                {...register("weight", { valueAsNumber: true })}
                error={!!errors.weight}
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
              {errors.weight && (
                <FormHelperText error>{errors.weight.message}</FormHelperText>
              )}
              <TextField
                type="number"
                label="Base Experience"
                {...register("base_experience", { valueAsNumber: true })}
                error={!!errors.base_experience}
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
              {errors.base_experience && (
                <FormHelperText error>
                  {errors.base_experience.message}
                </FormHelperText>
              )}
              <Button variant="contained" color="primary" type="submit">
                Change Attributes
              </Button>
              <Button variant="contained" color="error" onClick={onClose}>
                Close
              </Button>
            </FormContent>
          </form>
        )}
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default EditPokemonForm;
