import {
    Body,
    Controller,
    Get,
    Inject,
    Post,
    Req,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Role } from "../user/entities/user.entity";
import { AuthService } from "./auth.service";
import { RefreshTokenGuard } from "./guards/jwt-refresh.guard";
import { LocalAuthGuard } from "./guards/local.guard";
import { Public } from "./guards/public.guard";
import { AuthUser, RefreshTokenUser } from "./types/auth_user";

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
    description:
      "Creates a new user and returns the access token, and the refresh token.",
  })
  @Public()
  @Post("register")
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto, Role.CLIENT);
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
