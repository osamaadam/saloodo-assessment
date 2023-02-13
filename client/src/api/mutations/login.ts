import axios from "axios";
import { LoginResponse } from "../types/LoginResponse";

export const loginMutation = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => axios.post<LoginResponse>("/auth/login", { email, password });
