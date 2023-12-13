import { APIHelper } from "../config/api";
import { NewUser, User } from "../types/auth";

class AuthResponseClass {
  login = async (body: User) => {
    return APIHelper.post("/users/auth-with-password", { ...body });
  };

  register = async (body: NewUser) => {
    return APIHelper.post("/users/records", { ...body });
  };
}

export const AuthResponse = new AuthResponseClass();
