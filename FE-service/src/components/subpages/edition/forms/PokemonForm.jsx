import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModalOverlay, ModalContent, FormContent } from "../EditionPage.styles";
import usePokemonApi from "../../../../hooks/usePokemonApi";
import useDataHandler from "../../../../hooks/useDataHandler";
import useGetDbData from "../../../../hooks/useGetDbData";
import { enqueueSnackbar } from "notistack";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  height: z.number().positive({ message: "Height must be a positive number" }),
  weight: z.number().positive({ message: "Weight must be a positive number" }),
  base_experience: z
    .number()
    .positive({ message: "Base Experience must be a positive number" }),
});

const PokemonForm = ({ onClose }) => {
  const [imgIndex, setImgIndex] = useState(152);
  const [usedImgIndexes, setUsedImgIndexes] = useState(new Set());
  const {
    data: pokemonData,
    loading,
    error,
  } = usePokemonApi(`pokemon/${imgIndex}`);
  const { postData } = useDataHandler("pokemons");
  const { data: pokemonsDbData } = useGetDbData("pokemons");

  const [img, setImg] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (pokemonData?.sprites) {
      const dreamWorldImg = pokemonData.sprites.other.dream_world.front_default;
      setImg(dreamWorldImg);
    }
    if (error) {
      enqueueSnackbar(`Error loading Pokémon data: ${error}`, {
        variant: "error",
      });
    }
  }, [pokemonData, error]);

  useEffect(() => {
    if (pokemonsDbData) {
      const usedIndexes = new Set(
        pokemonsDbData.map((pokemon) => parseInt(pokemon.id))
      );
      setUsedImgIndexes(usedIndexes);
    }
  }, [pokemonsDbData]);

  const onSubmit = async (data) => {
    if (usedImgIndexes.has(imgIndex)) {
      enqueueSnackbar(
        `The image index ${imgIndex} is already in use. Please choose another one.`,
        { variant: "error" }
      );
      return;
    }

    const newPokemon = {
      id: String(imgIndex),
      ...data,
      img,
    };

    try {
      await postData(newPokemon);
      enqueueSnackbar(`New Pokémon ${data.name} has been created`, {
        variant: "success",
      });
      setUsedImgIndexes((prev) => new Set(prev).add(imgIndex));
      reset();
      onClose();
    } catch (error) {
      enqueueSnackbar("Failed to create Pokémon. Please try again.", {
        variant: "error",
      });
    }
  };

  const handleImgNavigation = (direction) => {
    setImgIndex(imgIndex + direction);
  };

  return createPortal(
    <ModalOverlay>
      <ModalContent>
        <Typography variant="h5">Create New Pokémon</Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormContent>
              <TextField
                label="Name"
                {...register("name")}
                error={!!errors.name}
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
              {errors.name && (
                <FormHelperText error>{errors.name?.message}</FormHelperText>
              )}

              <TextField
                label="Height"
                type="number"
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
                label="Weight"
                type="number"
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
                label="Base Experience"
                type="number"
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

              <div>
                <Button
                  variant="contained"
                  onClick={() => handleImgNavigation(-1)}
                  disabled={imgIndex <= 152}
                >
                  Previous
                </Button>
                {img && (
                  <img
                    src={img}
                    alt="Pokemon"
                    width={150}
                    height={150}
                    style={{
                      filter: usedImgIndexes.has(imgIndex)
                        ? "grayscale(100%)"
                        : "none",
                    }}
                  />
                )}
                <Button
                  variant="contained"
                  onClick={() => handleImgNavigation(1)}
                  disabled={!img}
                >
                  Next
                </Button>
              </div>
              <Button variant="contained" color="success" type="submit">
                Create Pokémon
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

export default PokemonForm;
