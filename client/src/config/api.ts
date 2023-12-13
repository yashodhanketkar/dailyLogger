import axios, { InternalAxiosRequestConfig } from "axios";

const localToken: string | null = localStorage.getItem("workloggerToken");

axios.defaults.baseURL = import.meta.env.VITE_DB + "api/collections";

axios.interceptors.request.use(
  async <T extends InternalAxiosRequestConfig>(value: T): Promise<T> => {
    const token = `Bearer ${localToken || ""}`;
    value.headers.Authorization = token;
    return value;
  }
);

export const APIHelper = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
};
