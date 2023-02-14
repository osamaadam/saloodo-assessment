import { axiosInstance } from "..";
import { Parcel } from "../types/Parcel";

export const parcelsQuery = () => axiosInstance.get<Parcel[]>("/parcel");
