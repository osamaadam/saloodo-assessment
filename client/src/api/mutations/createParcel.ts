import axios from "axios";
import { User } from "../../redux/user/userSlice";

export type Parcel = {
  id: number;
  pickupAddress: string;
  dropoffAddress: string;
  status: "PENDING" | "PICKED_UP" | "DELIVERED";
  pickupTime: Date;
  deliveryTime: Date;
  createdAt: Date;
  owner: User;
  biker: User;
};

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
