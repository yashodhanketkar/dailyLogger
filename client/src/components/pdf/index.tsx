import { DownloadOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { usePDF } from "@react-pdf/renderer";
import { useState } from "react";
import { LogType } from "../../types/logs";
import { ProjectType } from "../../types/project";
import { PDFMaker } from "./pdfMaker";

type PDFGeneratorProps = {
  project: ProjectType;
  logs: LogType[];
};

export const PDFGenerator = ({ logs, project }: PDFGeneratorProps) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const projectName = project.name;
  const title = `${project.name.split(" ").join("_").toLowerCase()}_${new Date(
    Date.now()
  ).toLocaleDateString()}`;

  const [instance, update] = usePDF({
    document: PDFMaker(logs, projectName),
  });

  if (instance.loading || instance.error || !instance.url) return <></>;

  if (logs.length)
    return (
      <>
        <Button
          startIcon={<DownloadOutlined />}
          variant="contained"
          onClick={() => {
            update(PDFMaker(logs, projectName));
            onOpen();
          }}
        >
          Download
        </Button>
        <DownloadPopup
          open={open}
          onClose={onClose}
          url={instance.url}
          title={title}
        />
      </>
    );
};

const DownloadPopup = ({
  open,
  onClose,
  url,
  title,
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Work log is generated and ready to download!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<DownloadOutlined />}
          variant="contained"
          LinkComponent={"a"}
          href={url}
          download={`${title}.pdf`}
          onClick={onClose}
          color="success"
        >
          Download
        </Button>
        <Button variant="contained" onClick={onClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
