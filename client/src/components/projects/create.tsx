import SaveIcon from "@mui/icons-material/Save";
import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProjectResponse } from "../../api/project";
import { NewProjectType } from "../../types/project";

type CreateProjectProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateProject = ({ open, onClose }: CreateProjectProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewProjectType>();

  const submit: SubmitHandler<NewProjectType> = async (data) => {
    ProjectResponse.create(data).then(() => {
      reset();
      onClose();
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        draggable
        component="form"
        onSubmit={handleSubmit(submit)}
        sx={{
          alignItems: "center",
          flexDirection: "column",
          marginX: "auto",
          padding: 4,
          boxShadow: "0 0 1rem 0.5rem #00000033",
          borderRadius: 4,
          gap: 2,
          component: "form",
          display: "flex",
          width: { xs: "90%", sm: "75%", md: "50%", lg: "25%" },
        }}
      >
        <Typography variant="h5">New Project</Typography>
        <TextField
          fullWidth
          variant="outlined"
          label="name"
          InputProps={{
            sx: {
              backgroundColor: "white",
            },
          }}
          {...register("name", { required: true })}
          error={!!errors.name}
          helperText={!!errors.name && "Name is reqired"}
        />
        <TextField
          fullWidth
          type="url"
          label="url"
          InputProps={{
            sx: {
              backgroundColor: "white",
            },
          }}
          {...register("github")}
        />
        <Button
          fullWidth
          sx={{
            paddingY: 2,
            paddingX: 4,
            width: "fit-content",
          }}
          variant="contained"
          startIcon={<SaveIcon />}
          type="submit"
        >
          Save
        </Button>
      </Paper>
    </Modal>
  );
};
