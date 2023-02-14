import { axiosInstance } from "..";
import { Parcel } from "../types/Parcel";

export const dropoff = (id: number) =>
  axiosInstance.post<Parcel>("/parcel/dropoff", null, { params: { id } });
