import { Body, Req, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "./guards/jwt-refresh.guard";
import { LocalAuthGuard } from "./guards/local.guard";
import { Request } from "express";
import { Public } from "./guards/public.guard";
import { AuthUser, RefreshTokenUser } from "./types/auth_user";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: "Returns the access token, and the refresh token.",
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({
    description: "Sends an email for email verification to the provided email.",
  })
  @Public()
  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    description: "Returns the currently logged in user.",
  })
  @Get("me")
  async me(@Req() req: Request): Promise<AuthUser> {
    return req.user;
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Get("refresh")
  async refresh(@Req() req: Request) {
    return this.authService.refreshToken(req.user as RefreshTokenUser);
  }
}
