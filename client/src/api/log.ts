import { APIHelper } from "../config/api";
import { NewLogType } from "../types/logs";

class LogResponseClass {
  today = new Date().setHours(0, 0, 0, 0).toLocaleString();

  list = async () => {
    return APIHelper.get(
      `/logs/records/?perPage=100&filter=(created>"${this.today}")`
    );
  };

  listByProject = async (id: string) => {
    return APIHelper.get(`/logs/records/?perPage=100&filter=(project="${id}")`);
  };

  read = async (id: string) => {
    return APIHelper.get("/logs/records/" + id);
  };

  create = async (body: NewLogType) => {
    return APIHelper.post("/logs/records", { ...body });
  };

  delete = async (id: string) => {
    return APIHelper.delete("/logs/records/" + id);
  };
}

export const LogResponse = new LogResponseClass();
