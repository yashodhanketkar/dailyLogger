import { Button, Divider, Modal, Stack } from "@mui/material";
import { ProjectType } from "../../types/project";

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
  projectData: ProjectType[];
  setFilter: React.Dispatch<React.SetStateAction<ProjectType | null>>;
};

export const FilterModal = ({
  open,
  onClose,
  projectData,
  setFilter,
}: FilterModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "white",
          paddingX: 2,
          paddingY: 1,
          borderRadius: 2,
        }}
        divider={<Divider flexItem />}
      >
        {projectData.map((project) => (
          <Button
            key={project.id}
            fullWidth
            variant="text"
            sx={{
              textTransform: "none",
              textAlign: "center",
            }}
            onClick={() => {
              setFilter(project);
              onClose();
            }}
          >
            {project.name}
          </Button>
        ))}
        <Button
          fullWidth
          sx={{
            textTransform: "none",
            textAlign: "center",
          }}
          onClick={() => {
            setFilter(null);
            onClose();
          }}
        >
          Reset
        </Button>
      </Stack>
    </Modal>
  );
};
