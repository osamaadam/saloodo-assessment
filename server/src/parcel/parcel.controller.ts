import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Req,
} from "@nestjs/common";
import { Request } from "express";
import { Role } from "src/user/entities/user.entity";
import { CreateParcelDto } from "./dto/create-parcel.dto";
import { ParcelService } from "./parcel.service";

@Controller("parcel")
export class ParcelController {
  constructor(private readonly parcelService: ParcelService) {}

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
