import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { AccessTokenGuard } from "./auth/guards/jwt-access.guard";
import { ParcelModule } from "./parcel/parcel.module";
import { UserModule } from "./user/user.module";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE, NODE_ENV } =
  process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      synchronize: NODE_ENV === "development",
      autoLoadEntities: true,
    }),
    UserModule,
    ParcelModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
