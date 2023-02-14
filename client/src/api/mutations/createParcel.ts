import { axiosInstance } from "..";
import { Parcel } from "../types/Parcel";

export const createParcelMutation = ({
  pickupAddress,
  dropoffAddress,
}: {
  pickupAddress: string;
  dropoffAddress: string;
}) =>
  axiosInstance.post<Parcel>("parcel", {
    pickupAddress,
    dropoffAddress,
  });
