import { Modal, Typography, Button } from "@mui/material";
import { ModalContent } from "./ModalComponent.styles";
import { useTheme } from "../../../context/ThemeContext";

const ModalComponent = ({ open, onClose, title, message }) => {
  const { theme } = useTheme();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent theme={theme}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {message}
        </Typography>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponent;
