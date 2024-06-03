import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { NotFoundContainer } from "./NotFound.styles";

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <NotFoundContainer theme={theme}>
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Main Page
      </Button>
    </NotFoundContainer>
  );
};

export default NotFound;
