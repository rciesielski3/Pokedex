import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import {
  ModalOverlay,
  ModalContent,
  FormContent,
  PokemonName,
} from "../EditionPage.styles";
import { useTheme } from "../../../../context/ThemeContext";
import useDataHandler from "../../../../hooks/useDataHandler";
import usePokemonApi from "../../../../hooks/usePokemonApi";
import useGetDbData from "../../../../hooks/useGetDbData";
import { POKEMON_API_POKEMON, POKEMON_IMG } from "../../../../../../apiConfig";
import { enqueueSnackbar } from "notistack";

const schema = z.object({
  height: z.number().positive("Height must be a positive number"),
  weight: z.number().positive("Weight must be a positive number"),
  base_experience: z
    .number()
    .positive("Base Experience must be a positive number"),
});

const EditPokemonForm = ({ pokemonId, onClose, onPokemonUpdate }) => {
  const { theme } = useTheme();
  const [pokemonName, setPokemonName] = useState("");
  const { putData, postData } = useDataHandler("pokemons");
  const {
    data: pokemonData,
    loading: pokemonLoading,
    error: pokemonError,
  } = useGetDbData("pokemons");
  const {
    data: pokemon,
    loading: apiLoading,
    error: apiError,
  } = usePokemonApi(`pokemon/${pokemonId}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (pokemonData && pokemonData.length > 0) {
      const existingPokemon = pokemonData.find(
        (p) => p.id === String(pokemonId)
      );
      if (existingPokemon) {
        setPokemonName(existingPokemon.name);
        setValue("height", existingPokemon.height);
        setValue("weight", existingPokemon.weight);
        setValue("base_experience", existingPokemon.base_experience);
      } else {
        setPokemonName(pokemon.name);
        setValue("height", pokemon.height);
        setValue("weight", pokemon.weight);
        setValue("base_experience", pokemon.base_experience);
      }
    }
  }, [pokemonData, pokemon, setValue, pokemonId]);

  useEffect(() => {
    if (apiError) {
      enqueueSnackbar(`Error loading Pokémon data: ${apiError}`, {
        variant: "error",
      });
    }
  }, [apiError]);

  const handleEditPokemon = async (data) => {
    const updatedPokemon = {
      id: String(pokemon.id),
      name: pokemonName,
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
      url: `${POKEMON_API_POKEMON}/${pokemon.id}`,
    };

    try {
      if (pokemonData.find((p) => p.id === String(pokemon.id))) {
        await putData(pokemonId, updatedPokemon);
      } else {
        await postData(updatedPokemon);
      }
      enqueueSnackbar(`Attributes for ${pokemonName} have been changed`, {
        variant: "success",
      });
      onClose();
      onPokemonUpdate(updatedPokemon);
    } catch (error) {
      enqueueSnackbar("Failed to update Pokémon. Please try again.", {
        variant: "error",
      });
    }
  };

  if (pokemonLoading || apiLoading) {
    return <CircularProgress />;
  }

  if (pokemonError) {
    return enqueueSnackbar(`Error loading Pokémon data: ${pokemonError}`, {
      variant: "error",
    });
  }

  return createPortal(
    <ModalOverlay>
      <ModalContent theme={theme}>
        <Typography variant="h5">Edit Pokémon</Typography>
        <form onSubmit={handleSubmit(handleEditPokemon)}>
          <FormContent>
            <img
              src={`${POKEMON_IMG}/${pokemon.id}.svg`}
              alt={pokemon.name}
              width={150}
              height={150}
            />
            <PokemonName style={{ textTransform: "capitalize" }}>
              {pokemonName}
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
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default EditPokemonForm;
