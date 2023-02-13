import { User } from "../../redux/user/userSlice";

export type LoginResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
