import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ProjectResponse } from "../../../api/project";
import { ProjectType } from "../../../types/project";
import { CreateLog } from "./createLog";
import { LogLists } from "./logList";

export const Logs = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useQuery<ProjectType>(
    "project",
    () => ProjectResponse.read(id!).then((res) => res.data),
    {
      refetchOnWindowFocus: false,
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
    <div className="flex flex-col w-full text-center">
      <div>
        <h1 className="text-2xl font-semibold">{data.name}</h1>
        <a
          href={data.github}
          target="_blank"
          rel="norefferer noopener"
          className="text-sm text-neutral-600"
        >
          {data.github}
        </a>
      </div>
      <CreateLog />
      <LogLists />
    </div>
  );
};
