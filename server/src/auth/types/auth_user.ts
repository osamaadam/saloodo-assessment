import { ApiProperty } from "@nestjs/swagger";

export class AuthUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;
}

export class RefreshTokenUser extends AuthUser {
  refreshToken: string;
}
