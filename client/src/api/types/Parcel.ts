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
