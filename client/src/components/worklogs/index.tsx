import FilterIcon from "@mui/icons-material/FilterAltOffOutlined";
import {
  Box,
  Button,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { LogResponse } from "../../api/log";
import { ProjectResponse } from "../../api/project";
import { LogType } from "../../types/logs";
import { ProjectType } from "../../types/project";
import { PDFGenerator } from "../pdf";
import { FilterModal } from "./filter";

const TableCellStyle: SxProps = {
  backgroundColor: "primary.main",
  fontWeight: 600,
  color: "white",
};

export const LogListsPage = () => {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<ProjectType | null>(null);

  // greater than MD or 900px
  const gtMD = useMediaQuery("(min-width: 900px)");

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const { isLoading, error, data } = useQuery<LogType[]>(
    "logs",
    () => LogResponse.list().then((res) => res.data.items),
    {
      refetchInterval: 1000 * 60 * 60,
      refetchIntervalInBackground: true,
    }
  );

  const { data: projectData } = useQuery<ProjectType[]>(
    "projects",
    () => ProjectResponse.list().then((res) => res.data.items),
    {
      refetchInterval: 1000 * 60 * 60,
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading) return <>loading</>;

  if (error || !data || !projectData)
    return (
      <div className="flex-grow w-full h-full bg-red-50">
        <p>error</p>
      </div>
    );

  return (
    <>
      <TableContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Box gap={1} display={"inline-flex"}>
          {filter && (
            <PDFGenerator
              logs={data.filter((log) => log.project === filter.id)}
              project={filter}
            />
          )}
          <Button
            startIcon={<FilterIcon />}
            onClick={onOpen}
            variant="contained"
          >
            Filter
          </Button>
        </Box>
        <Table sx={{ marginY: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={TableCellStyle} className="w-1/12">
                Serial
              </TableCell>
              <TableCell sx={TableCellStyle} className="w-4/12">
                Name
              </TableCell>
              {gtMD && (
                <TableCell sx={TableCellStyle} className="w-4/12">
                  Description
                </TableCell>
              )}
              <TableCell sx={TableCellStyle} className="w-2/12">
                Project
              </TableCell>
              <TableCell sx={TableCellStyle} className="w-1/12">
                Created
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .filter((ele) => (filter ? ele.project === filter.id : true))
              .map((item, i) => (
                <TableRow
                  className={(i + 1) % 2 === 0 ? "bg-neutral-200" : "bg-white"}
                  key={i}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.task}</TableCell>
                  {gtMD && <TableCell>{item.description}</TableCell>}
                  <TableCell>
                    {projectData.find((ele) => ele.id === item.project)?.name}
                  </TableCell>
                  <TableCell>
                    {new Date(item.created).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <FilterModal
        open={open}
        onClose={onClose}
        projectData={projectData}
        setFilter={setFilter}
      />
    </>
  );
};
