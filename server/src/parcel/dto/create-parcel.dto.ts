import { IsInt, IsString } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateParcelDto {
  @IsString()
  pickupAddress: string;

  @IsString()
  dropoffAddress: string;

  @IsInt()
  owner: Partial<User>;
}
