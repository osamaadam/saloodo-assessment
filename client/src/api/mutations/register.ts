import { axiosInstance } from "..";
import { LoginResponse } from "../types/LoginResponse";

export const registerMutation = (credentials: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => axiosInstance.post<LoginResponse>("/auth/register", credentials);
