import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  FormHelperText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  ModalOverlay,
  ModalContent,
  FormContent,
} from "../../subpages/edition/EditionPage.styles";
import useDataHandler from "../../../hooks/useDataHandler";
import useGetDbData from "../../../hooks/useGetDbData";
import { useTheme } from "../../../context/ThemeContext";
import { enqueueSnackbar } from "notistack";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .nonempty("Name is required"),
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[\W_]/, {
        message: "Password must contain at least one special character",
      })
      .nonempty("Password is required"),
    repeatPassword: z.string().nonempty("Repeat password is required"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords must match",
    path: ["repeatPassword"],
  });

const RegisterForm = ({ onClose }) => {
  const { data: users, loading, error } = useGetDbData("users");
  const { postData } = useDataHandler("users");
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const userExists = users.some((user) => user.name === data.name);

    if (userExists) {
      enqueueSnackbar(
        `User ${data.name} already exists. Select another name.`,
        {
          variant: "error",
        }
      );
      return;
    }

    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      await postData(newUser);
      enqueueSnackbar("User registered successfully", { variant: "success" });
      reset();
      onClose();
    } catch (error) {
      enqueueSnackbar("Failed to register user. Please try again.", {
        variant: "error",
      });
    }
  };

  return createPortal(
    <ModalOverlay>
      <ModalContent theme={theme}>
        <Typography variant="h5">Register</Typography>
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
                label="Email"
                {...register("email")}
                error={!!errors.email}
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
              {errors.email && (
                <FormHelperText error>{errors.email.message}</FormHelperText>
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

              <Accordion
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{ fontSize: "0.8rem" }}
                >
                  Password requirements
                </AccordionSummary>
                <AccordionDetails sx={{ fontSize: "0.6rem" }}>
                  <ul>
                    <li key={0}>At least 8 characters</li>
                    <li key={1}>One uppercase letter</li>
                    <li key={2}>One number</li>
                    <li key={3}>One special character</li>
                  </ul>
                </AccordionDetails>
              </Accordion>

              <TextField
                label="Repeat Password"
                type="password"
                {...register("repeatPassword")}
                error={!!errors.repeatPassword}
                sx={{
                  backgroundColor: "var(--background-color)",
                  color: "var(--text-color)",
                }}
              />
              {errors.repeatPassword && (
                <FormHelperText error>
                  {errors.repeatPassword.message}
                </FormHelperText>
              )}

              <Button variant="contained" color="primary" type="submit">
                Register
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

export default RegisterForm;
