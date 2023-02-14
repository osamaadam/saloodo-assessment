import { axiosInstance } from "..";
import { Parcel } from "../types/Parcel";

export const pickup = (id: number) =>
  axiosInstance.post<Parcel>("/parcel/pickup", null, { params: { id } });
