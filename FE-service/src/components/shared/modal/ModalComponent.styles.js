import styled from "styled-components";
import { darkTheme, lightTheme } from "../theme/themes";

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px;
  outline: none;
  background-color: var(--card-bg-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  ${({ theme }) => (theme === "dark" ? darkTheme : lightTheme)};
`;
