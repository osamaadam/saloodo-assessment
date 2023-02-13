import { Injectable, Req } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { AuthUser, RefreshTokenUser } from "../types/auth_user";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  validate(@Req() req: Request, user: AuthUser): RefreshTokenUser {
    const { id, email, firstName, lastName, role } = user;
    const refreshTokenExtractor = ExtractJwt.fromAuthHeaderAsBearerToken();
    const refreshToken = refreshTokenExtractor(req);
    return {
      id,
      email,
      refreshToken,
      firstName,
      lastName,
      role,
    };
  }
}
