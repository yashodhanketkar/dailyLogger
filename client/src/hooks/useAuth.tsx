import { useLayoutEffect, useState } from "react";
import { AuthResponse } from "../api/auth";

export const useAuth = () => {
  const [token, setToken] = useState<string>("");

  const logIn = async (identity: string, password: string) => {
    return AuthResponse.login({
      identity,
      password,
    })
      .then((res) => res.data)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("workloggerToken", data.token);
          window.location.href = "/";
        }
      })
      .catch((err) => err);
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("workloggerToken");
    window.location.href = "/";
  };

  const handleToken = async () => {
    const localToken = localStorage.getItem("workloggerToken");
    if (localToken) setToken(localToken);
  };

  useLayoutEffect(() => {
    handleToken();
  }, []);

  return {
    logIn,
    logOut,
    handleToken,
    token,
  };
};
