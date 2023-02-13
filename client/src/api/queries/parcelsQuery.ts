import axios from "axios";
import { Parcel } from "../types/Parcel";

export const parcelsQuery = () => axios.get<Parcel[]>("/parcel");
