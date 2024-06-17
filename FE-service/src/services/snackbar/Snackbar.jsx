import { SnackbarProvider } from "notistack";
import "./SnackbarStyles.css";

const Snackbar = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      classes={{
        variantSuccess: "snackbar-success",
        variantError: "snackbar-error",
        variantDefault: "snackbar-default",
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default Snackbar;
