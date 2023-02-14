import { Module } from "@nestjs/common";
import { ParcelService } from "./parcel.service";
import { ParcelController } from "./parcel.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Parcel } from "./entities/parcel.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  controllers: [ParcelController],
  providers: [ParcelService],
  exports: [ParcelService],
})
export class ParcelModule {}
