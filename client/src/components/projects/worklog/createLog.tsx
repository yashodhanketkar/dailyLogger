import SaveIcon from "@mui/icons-material/Save";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { LogResponse } from "../../../api/log";
import { NewLogType } from "../../../types/logs";

export const CreateLog = () => {
  const [snackbar, setSnackbar] = useState(false);

  const { id } = useParams();
  console.log({ id });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewLogType>({
    defaultValues: {
      project: id,
    },
  });

  const submit: SubmitHandler<NewLogType> = async (data) => {
    LogResponse.create(data).then(() => {
      setSnackbar(true);
      reset();
      document.getElementById("autoFocusField")?.focus();
    });
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(submit)}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        justifyContent: "space-between",
        width: "100%",
        gap: {
          xs: 2,
          md: 1,
        },
        marginY: 2,
      }}
    >
      <TextField
        autoFocus
        id="autoFocusField"
        variant="filled"
        InputProps={{ sx: { backgroundColor: "white" } }}
        sx={{
          width: {
            sx: "100%",
            md: "40%",
          },
        }}
        label="Name"
        {...register("task", { required: true })}
        error={!!errors.task}
        helperText={!!errors.task && "Name is required"}
      />

      <TextField
        sx={{
          width: {
            sx: "100%",
            md: "50%",
          },
        }}
        variant="filled"
        InputProps={{ sx: { backgroundColor: "white" } }}
        label="Description"
        {...register("description", { required: true })}
        error={!!errors.task}
        helperText={!!errors.task && "Description is required"}
      />
      <Button
        variant="contained"
        sx={{
          marginLeft: "auto",
          width: {
            xs: "50%",
            md: "10%",
          },
        }}
        startIcon={<SaveIcon />}
        type="submit"
      >
        Save
      </Button>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={() => setSnackbar(false)}
      >
        <Alert onClose={() => setSnackbar(false)} severity="success">
          Project stored
        </Alert>
      </Snackbar>
    </Box>
  );
};
