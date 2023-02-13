import axios from "axios";
import { Parcel } from "../types/Parcel";

export const createParcelMutation = ({
  pickupAddress,
  dropoffAddress,
}: {
  pickupAddress: string;
  dropoffAddress: string;
}) =>
  axios.post<Parcel>("parcel", {
    pickupAddress,
    dropoffAddress,
  });
