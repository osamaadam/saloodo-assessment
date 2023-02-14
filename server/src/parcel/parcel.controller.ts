import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { Role } from "src/user/entities/user.entity";
import { CreateParcelDto } from "./dto/create-parcel.dto";
import { ParcelService } from "./parcel.service";

@Controller("parcel")
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

  @Post("pickup")
  async pickUp(@Req() req: Request, @Query("id", ParseIntPipe) id: number) {
    const { user } = req;
    return this.parcelService.pickUp(id, user.id);
  }

  @Post("dropoff")
  async dropoff(@Req() req: Request, @Query("id", ParseIntPipe) id: number) {
    const { user } = req;
    return this.parcelService.deliver(id, user.id);
  }

  @Get("available")
  async findAllAvailableParcels(@Req() req: Request) {
    const { user } = req;
    if (![Role.BIKER, Role.ADMIN].includes(user.role))
      throw new ForbiddenException("This endpoint is only available to bikers");
    return this.parcelService.findAllAvailableParcels();
  }

  @Get()
  async findAllClientParcels(@Req() req: Request) {
    const { user } = req;
    switch (user.role) {
      case Role.CLIENT:
        return this.parcelService.findClientParcels(user.id);
      case Role.BIKER:
        return this.parcelService.findBikerParcels(user.id);
    }
  }

  @Post()
  async create(@Req() req: Request, @Body() body: CreateParcelDto) {
    const { user } = req;
    if (user.role !== Role.CLIENT)
      throw new ForbiddenException("Only a client could create a parcel");

    return this.parcelService.create(body, user.id);
  }
}
