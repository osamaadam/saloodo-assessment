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
  create(dto: CreateParcelDto, userId: number) {
    dto.owner = { id: userId };
    return this.parcelRepository.save(dto);
  }

  pickUp(id: number, bikerId: number) {
    return this.parcelRepository.update(
      { id, biker: { id: bikerId }, status: Status.PENDING },
      { biker: { id: bikerId }, pickupTime: new Date() },
    );
  }

  deliver(id: number, bikerId: number) {
    return this.parcelRepository.update(
      { id, biker: { id: bikerId }, status: Status.PICKED_UP },
      { biker: { id: bikerId }, deliveryTime: new Date() },
    );
  }

  findClientParcels(userId: number) {
    return this.parcelRepository.find({ where: { owner: { id: userId } } });
  }

  findBikerParcels(userId: number) {
    return this.parcelRepository.find({ where: { biker: { id: userId } } });
  }
}
