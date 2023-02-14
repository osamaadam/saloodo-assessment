import { axiosInstance } from "..";
import { LoginResponse } from "../types/LoginResponse";

export const loginMutation = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => axiosInstance.post<LoginResponse>("/auth/login", { email, password });
