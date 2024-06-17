import styled from "styled-components";
import arenaIcon from "../../../icons/arena.png";
import arenaIconSelected from "../../../icons/arena-select.png";

const StyledArenaIcon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  background-image: url(${({ isSelected }) =>
    isSelected ? arenaIconSelected : arenaIcon});
  background-size: cover;
  cursor: pointer;
`;

const SelectedPokemonsCount = styled.div`
  position: absolute;
  top: 30px;
  left: 70px;
  transform: translate(-20%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`;

const ArenaIcon = ({ isSelected, count, onClick }) => (
  <>
    <StyledArenaIcon isSelected={isSelected} onClick={onClick} />
    {isSelected ? (
      <SelectedPokemonsCount>In Arena</SelectedPokemonsCount>
    ) : (
      <SelectedPokemonsCount>{count}/2</SelectedPokemonsCount>
    )}
  </>
);

export default ArenaIcon;
