import axios from "axios";
import { User } from "../../redux/user/userSlice";

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const loginMutation = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => axios.post<LoginResponse>("/auth/login", { email, password });
