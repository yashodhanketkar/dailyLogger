import { DeleteOutline } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ProjectResponse } from "../../api/project";
import { ProjectType } from "../../types/project";

export const ListProject = () => {
  const [open, setOpen] = useState(false);
  const [targetId, setTargetId] = useState("");

  const { isLoading, error, data, refetch } = useQuery<ProjectType[]>(
    "projects",
    () => ProjectResponse.list().then((res) => res.data.items),
    {
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
      enabled: true,
    }
  );

  if (isLoading) return <>loading</>;

  if (error || !data)
    return (
      <div className="w-full h-full bg-red-50">
        <p>error</p>
        <button onClick={() => refetch()} type="button">
          Refetch
        </button>
      </div>
    );

  return (
    <div className="grid w-full gap-4 px-2 py-4 mt-8 overflow-auto sm:grid-cols-2 lg:mt-4 lg:grid-cols-3">
      {data.map((project) => (
        <Paper
          key={project.id}
          sx={{
            aspectRatio: 2,
            borderRadius: 2,
            boxShadow: "0 0 0.25rem 0.1rem #00000033",
            padding: 4,
          }}
        >
          <Link to={project.id}>
            <Tooltip arrow title={project.name}>
              <Typography variant="h4" className="line-clamp-1">
                {project.name}
              </Typography>
            </Tooltip>
          </Link>
          <Typography variant="body2" gap={1} display="inline-flex">
            <span>
              {new Date(project.created).toLocaleString()}
              {project.updated > project.created && (
                <Typography variant="body2">(Edited)</Typography>
              )}
            </span>
          </Typography>
          <Typography variant="body1">{project.github || "No url"}</Typography>
          <IconButton
            onClick={() => {
              setTargetId(project.id);
              setOpen(true);
            }}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 99,
            }}
          >
            <DeleteOutline />
          </IconButton>
        </Paper>
      ))}
      <DeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        targetId={targetId}
      />
    </div>
  );
};

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  targetId: string;
};

const DeleteDialog = ({ open, onClose, targetId }: DeleteDialogProps) => {
  const handleDelete = async () => {
    ProjectResponse.delete(targetId);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete this item?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This is irreversible action, continue? {targetId}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
