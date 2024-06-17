import { Button } from "@mui/material";
import { useTheme } from "../../../context/ThemeContext";
import {
  PokemonListContainer,
  PokemonItem,
  PokemonInfo,
  PokemonName,
  PokemonAttribute,
  PokemonExtraInfo,
} from "./PokemonList.styles";
import { POKEMON_IMG } from "../../../../../apiConfig";

const PokemonList = ({
  pokemonsData,
  onClickHandle,
  buttonText,
  extraInfo,
}) => {
  const { theme } = useTheme();

  return (
    <PokemonListContainer>
      {pokemonsData.map((pokemon) => (
        <PokemonItem key={pokemon.id} theme={theme}>
          <img
            src={`${POKEMON_IMG}/${pokemon.id}.svg`}
            alt={pokemon.name}
            width={100}
            height={100}
          />
          <PokemonInfo>
            <PokemonName>{pokemon.name}</PokemonName>
            <PokemonAttribute>
              Height: {pokemon.height}, Weight: {pokemon.weight}, Base
              Experience: {pokemon.base_experience}
            </PokemonAttribute>
            {extraInfo && (
              <PokemonExtraInfo>{extraInfo(pokemon)}</PokemonExtraInfo>
            )}
          </PokemonInfo>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onClickHandle(pokemon.id)}
          >
            {buttonText}
          </Button>
        </PokemonItem>
      ))}
    </PokemonListContainer>
  );
};

export default PokemonList;
