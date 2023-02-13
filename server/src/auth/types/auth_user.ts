import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/user/entities/user.entity";

export class AuthUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;
}

export class RefreshTokenUser extends AuthUser {
  refreshToken: string;
}
