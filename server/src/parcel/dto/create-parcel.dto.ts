import { IsInt, IsString } from "class-validator";

export class CreateParcelDto {
  @IsString()
  pickupAddress: string;

  @IsString()
  dropoffAddress: string;

  @IsInt()
  ownerId: number;
}
