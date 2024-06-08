import styled from "styled-components";
import heartIcon from "../../../icons/heart.png";
import heartIconFav from "../../../icons/heart-fav.png";

const StyledHeartIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 24px;
  height: 24px;
  background-image: url(${({ favorite }) =>
    favorite ? heartIconFav : heartIcon});
  background-size: cover;
  cursor: pointer;
`;

const HeartIcon = ({ favorite, onClick }) => (
  <StyledHeartIcon favorite={favorite} onClick={onClick} />
);

export default HeartIcon;
