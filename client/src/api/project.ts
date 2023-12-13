import { APIHelper } from "../config/api";
import { NewProjectType } from "../types/project";

class ProjectResponseClass {
  list = async () => {
    return APIHelper.get("/projects/records?perPage=100");
  };

  read = async (id: string) => {
    return APIHelper.get("/projects/records/" + id);
  };

  create = async (body: NewProjectType) => {
    return APIHelper.post("/projects/records", { ...body });
  };

  delete = async (id: string) => {
    return APIHelper.delete("/projects/records/" + id);
  };
}

export const ProjectResponse = new ProjectResponseClass();
