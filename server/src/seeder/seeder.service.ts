import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { CreateParcelDto } from "src/parcel/dto/create-parcel.dto";
import { ParcelService } from "src/parcel/parcel.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { Role } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class SeederService {
  constructor(
    private readonly userService: UserService,
    private readonly parcelService: ParcelService,
    private readonly authService: AuthService,
  ) {}

  async seedUsers(num: number) {
    const currentNum = await this.userService.usersCount();

    if (currentNum > 0) return;

    let userPromises: Promise<any>[] = [];
    for (let i = 0; i < num; i++) {
      let user = new CreateUserDto();
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.email = `client.${i}@test.com`;
      user.password = "123";
      userPromises.push(this.authService.register(user, Role.CLIENT));
    }

    await Promise.all(userPromises);
    userPromises = [];

    for (let i = 0; i < num; i++) {
      let user = new CreateUserDto();
      user.firstName = faker.name.firstName();
      user.lastName = faker.name.lastName();
      user.email = `biker.${i}@test.com`;
      user.password = "123";
      userPromises.push(this.authService.register(user, Role.BIKER));
    }

    await Promise.all(userPromises);
  }

  async seedParcels(num: number) {
    const currentNum = await this.parcelService.parcelsCount();
    const clientCount = await this.userService.clientsCount();
    if (currentNum > 0) return;
    let parcelPromises: Promise<any>[] = [];

    for (let i = 0; i < num; i++) {
      let parcel = new CreateParcelDto();
      parcel.dropoffAddress = faker.address.streetAddress();
      parcel.pickupAddress = faker.address.streetAddress();
      parcel.owner = { id: (i % (clientCount - 1)) + 1 };

      parcelPromises.push(this.parcelService.create(parcel, parcel.owner.id));
    }

    await Promise.all(parcelPromises);
  }
}
