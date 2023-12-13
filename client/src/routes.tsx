import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/login";
import { Home } from "./components/home";
import { Projects } from "./components/projects";
import { Logs } from "./components/projects/worklog";
import { LogListsPage } from "./components/worklogs";
import { useAuth } from "./hooks/useAuth";

export const PageRouter = () => {
  const { token } = useAuth();

  return (
    <>
      <Routes>
        {token ? (
          <>
            <Route element={<Projects />} path="/projects" />
            <Route element={<Logs />} path="/projects/:id" />
            <Route element={<LogListsPage />} path="/logs" />
            <Route element={<Home />} path="/" />
          </>
        ) : (
          <>
            <Route element={<Login />} path="*" />
          </>
        )}
      </Routes>
      <Outlet />
    </>
  );
};
