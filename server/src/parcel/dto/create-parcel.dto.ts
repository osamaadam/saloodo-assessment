import { IsEnum, IsInt, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";
import { Status } from "../entities/parcel.entity";

export class CreateParcelDto {
  @IsString()
  pickupAddress: string;

  @IsString()
  dropoffAddress: string;

  @IsInt()
  owner: Partial<User>;

  @IsEnum(Status)
  status: Status;
}
