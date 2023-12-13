import LockIcon from "@mui/icons-material/LockOutlined";
import PeopleIcon from "@mui/icons-material/PeopleOutline";
import SendIcon from "@mui/icons-material/SendOutlined";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";

type InputType = {
  identity: string;
  password: string;
};

export const Login = () => {
  const { logIn } = useAuth();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    mode: "onSubmit",
  });

  const onsubmit: SubmitHandler<InputType> = async (data) => {
    logIn(data.identity, data.password)
      .then((res) => res.response.data.message)
      .then((msg) => {
        setErrorMessage(msg);
        setIsError(true);
      });
    reset();
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onsubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        padding: 4,
        gap: 2,
        marginX: "auto",
        marginTop: "20vh",
        borderRadius: 4,
        boxShadow: "0.25rem 0.25rem 0.1rem 0.1rem #00000011",
        width: {
          xs: "100%",
          md: "50%",
          lg: "25%",
        },
      }}
    >
      <FormLabel>Login Form</FormLabel>
      <FormControl variant="outlined">
        <InputLabel error={!!errors.identity} htmlFor="identity-input">
          Identity
        </InputLabel>
        <OutlinedInput
          id="identity-input"
          label="identity"
          placeholder="Identity"
          {...register("identity", {
            required: true,
          })}
          error={!!errors.identity}
          endAdornment={
            <InputAdornment position="end">
              <PeopleIcon color={!errors.password ? "primary" : "error"} />
            </InputAdornment>
          }
        />
        {!!errors.identity && (
          <FormHelperText
            sx={{
              color: "error.main",
            }}
          >
            {"* Username/Email required"}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel error={!!errors.password} htmlFor="password-input">
          Password
        </InputLabel>
        <OutlinedInput
          type="password"
          id="password-input"
          label="Password"
          placeholder="password"
          {...register("password", {
            required: true,
          })}
          error={!!errors.password}
          endAdornment={
            <InputAdornment position="end">
              <LockIcon color={!errors.password ? "primary" : "error"} />
            </InputAdornment>
          }
        />
        {!!errors.password && (
          <FormHelperText
            sx={{
              color: "error.main",
            }}
          >
            {"* Password required"}
          </FormHelperText>
        )}
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="success"
        sx={{
          padding: 1.5,
        }}
        startIcon={<SendIcon />}
      >
        Login
      </Button>
      <Snackbar
        open={isError}
        autoHideDuration={1000}
        onClose={() => setIsError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={() => setIsError(false)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
