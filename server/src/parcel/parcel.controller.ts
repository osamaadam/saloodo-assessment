import { Controller } from "@nestjs/common";
import { ParcelService } from "./parcel.service";

@Controller("parcel")
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}
}
