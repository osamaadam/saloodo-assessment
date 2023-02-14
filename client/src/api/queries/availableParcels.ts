import { axiosInstance } from "..";
import { Parcel } from "../types/Parcel";

export const availableParcelsQuery = () =>
  axiosInstance.get<Parcel[]>("/parcel/available");
