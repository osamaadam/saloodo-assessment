import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { ParcelModule } from "src/parcel/parcel.module";
import { UserModule } from "src/user/user.module";
import { SeederService } from "./seeder.service";

@Module({
  imports: [UserModule, ParcelModule, AuthModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
