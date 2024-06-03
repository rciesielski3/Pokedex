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
import { enqueueSnackbar } from "notistack";
import useGetDbData from "../../../hooks/useGetDbData";
import {
  ModalOverlay,
  ModalContent,
  FormContent,
} from "../../subpages/edition/EditionPage.styles";
import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { useTheme } from "../../../context/ThemeContext";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .nonempty("Name is required"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .nonempty("Password is required"),
});

const LoginForm = ({ onClose }) => {
  const { theme } = useTheme();
  const { data: users, loading, error } = useGetDbData("users");
  const { setLoggedIn, setUserName } = useContext(LoginContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const user = users.find(
      (user) => user.name === data.name && user.password === data.password
    );

    if (user) {
      setLoggedIn(true);
      setUserName(user.name);
      localStorage.setItem("userIsLoggedIn", "true");
      localStorage.setItem("userName", user.name);
      enqueueSnackbar("Login successful", { variant: "success" });
      onClose();
    } else {
      enqueueSnackbar("Invalid name or password", { variant: "error" });
    }
  };

  return createPortal(
    <ModalOverlay>
      <ModalContent theme={theme}>
        <Typography variant="h5">Login</Typography>
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
                <FormHelperText error>{errors.name.message}</FormHelperText>
              )}

              <TextField
                label="Password"
                type="password"
                {...register("password")}
                error={!!errors.password}
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
              {errors.password && (
                <FormHelperText error>{errors.password.message}</FormHelperText>
              )}

              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
              <Button variant="contained" color="secondary" onClick={onClose}>
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

export default LoginForm;
