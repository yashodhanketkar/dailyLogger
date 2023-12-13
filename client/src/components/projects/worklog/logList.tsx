import { DeleteOutline } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { LogResponse } from "../../../api/log";
import { LogType } from "../../../types/logs";

export const LogLists = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery<LogType[]>(
    "logs",
    () => LogResponse.listByProject(id!).then((res) => res.data.items),
    {
      refetchInterval: 1000,
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading) return <>loading</>;

  if (error || !data)
    return (
      <div className="flex-grow w-full h-full bg-red-50">
        <p>error</p>
      </div>
    );

  return (
    <Table className="my-4">
      <TableHead>
        <TableRow>
          <TableCell className="w-1/12 bg-neutral-700">
            <span className="text-white">Serial</span>
          </TableCell>
          <TableCell className="w-4/12 bg-neutral-700">
            <span className="text-white">Name</span>
          </TableCell>
          <TableCell className="w-5/12 bg-neutral-700">
            <span className="text-white">Description</span>
          </TableCell>
          <TableCell className="w-1/12 bg-neutral-700">
            <span className="text-white">Created</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, i) => (
          <TableRow
            className={(i + 1) % 2 === 0 ? "bg-neutral-200" : "bg-white"}
            key={item.task}
          >
            <TableCell>{i + 1}</TableCell>
            <TableCell>{item.task}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell
              sx={{
                display: "inline-flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {new Date(item.created).toLocaleDateString()}
              <IconButton
                size="small"
                onClick={() => LogResponse.delete(item.id)}
              >
                <DeleteOutline color="error" />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
