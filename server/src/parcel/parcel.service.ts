import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateParcelDto } from "./dto/create-parcel.dto";
import { Parcel, Status } from "./entities/parcel.entity";

@Injectable()
export class ParcelService {
  constructor(
    @InjectRepository(Parcel)
    private readonly parcelRepository: Repository<Parcel>,
  ) {}
  async parcelsCount() {
    return this.parcelRepository.count();
  }

  create(dto: CreateParcelDto, userId: number) {
    dto.owner = { id: userId };
    dto.status = Status.PENDING;
    return this.parcelRepository.save(dto);
  }

  async pickUp(id: number, bikerId: number) {
    await this.parcelRepository.update(
      { id, status: Status.PENDING },
      {
        biker: { id: bikerId },
        pickupTime: new Date(),
        status: Status.PICKED_UP,
      },
    );

    return this.parcelRepository.findOneBy({ id });
  }

  async deliver(id: number, bikerId: number) {
    await this.parcelRepository.update(
      { id, status: Status.PICKED_UP },
      {
        biker: { id: bikerId },
        deliveryTime: new Date(),
        status: Status.DELIVERED,
      },
    );

    return this.parcelRepository.findOneBy({ id });
  }

  findClientParcels(userId: number) {
    return this.parcelRepository.find({ where: { owner: { id: userId } } });
  }

  findBikerParcels(userId: number) {
    return this.parcelRepository.find({ where: { biker: { id: userId } } });
  }

  findAllAvailableParcels() {
    return this.parcelRepository.find({ where: { status: Status.PENDING } });
  }
}
