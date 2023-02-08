import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { hash, compare } from "bcrypt";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { AuthUser, RefreshTokenUser } from "./types/auth_user";

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return hash(password, saltRounds);
  }

  async register(dto: CreateUserDto) {
    dto.password = await this.hashPassword(dto.password);
    return this.usersService.create(dto);
  }

  async validateUser(email: string, password: string): Promise<AuthUser> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const matches = await compare(password, user.password);
      if (matches) {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      }
    }

    return null;
  }

  async login(user: AuthUser) {
    const { accessToken, refreshToken } = await this.genTokens(user);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private async genTokens(user: AuthUser) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const accessTokenPromise = this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.accessToken.expiresIn,
    });

    const refreshTokenPromise = this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.refreshToken.expiresIn,
    });

    const [accessToken, refreshToken] = await Promise.all([accessTokenPromise, refreshTokenPromise]);

    return { accessToken, refreshToken };
  }

  async refreshToken(reqUser: RefreshTokenUser) {
    const { id, refreshToken } = reqUser;

    if (!id || !refreshToken) throw new ForbiddenException();

    const user = await this.usersService.findOne(id);
    if (!user) throw new ForbiddenException();

    if (user.refreshToken !== refreshToken) throw new ForbiddenException();

    return this.login(user as AuthUser);
  }
}
