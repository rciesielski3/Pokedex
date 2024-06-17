import { useContext } from "react";
import { ModalContainer, PokemonImage, Backdrop } from "./PokemonModal.styles";
import HeartIcon from "./HeartIcon";
import ArenaIcon from "./ArenaIcon";
import { useTheme } from "../../../context/ThemeContext";
import { LoginContext } from "../../../context/LoginContext";
import useTogglePokemonStatus from "./useTogglePokemonStatus";
import { POKEMON_IMG } from "../../../../../apiConfig";

const PokemonModal = ({ pokemon, onClose }) => {
  const { isLoggedIn } = useContext(LoginContext);
  const { name, stats } = pokemon;
  const { theme } = useTheme();
  const { isFavorite, inArena, arenaPokemons, togglePokemonStatus } =
    useTogglePokemonStatus(pokemon);

  return (
    <>
      <Backdrop onClick={onClose} />
      <ModalContainer theme={theme}>
        {isLoggedIn && (
          <ArenaIcon
            onClick={() => togglePokemonStatus("arena")}
            isSelected={inArena}
            count={arenaPokemons.length}
          />
        )}
        {isLoggedIn && (
          <HeartIcon
            onClick={() => togglePokemonStatus("favorite")}
            favorite={isFavorite}
          />
        )}
        <PokemonImage src={`${POKEMON_IMG}/${pokemon.id}.svg`} alt={name} />
        <h2 style={{ textTransform: "capitalize" }}>{name}</h2>
        <div>
          {stats.map((stat) => (
            <p key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </p>
          ))}
        </div>
      </ModalContainer>
    </>
  );
};

export default PokemonModal;
