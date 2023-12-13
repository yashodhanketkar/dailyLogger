import { Button } from "@mui/material";
import { useState } from "react";
import { CreateProject } from "./create";
import { ListProject } from "./list";

export const Projects = () => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <div className="inline-flex h-[85vh] overflow-hidden p-4 gap-4 w-full">
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          zIndex: 99,
          backgroundColor: "primary.main",
          top: 0,
          right: 2,
        }}
        onClick={onOpen}
      >
        Create Project
      </Button>
      <ListProject />
      <CreateProject open={open} onClose={onClose} />
    </div>
  );
};
