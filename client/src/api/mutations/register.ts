import axios from "axios";
import { LoginResponse } from "./login";

export const registerMutation = (credentials: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => axios.post<LoginResponse>("/auth/register", credentials);
