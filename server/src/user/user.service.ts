import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role, User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findRandomClient() {
    return this.userRepository.findOneBy({ role: Role.CLIENT });
  }

  usersCount() {
    return this.userRepository.count();
  }

  clientsCount() {
    return this.userRepository.count({ where: { role: Role.CLIENT } });
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAuth(where: { id?: number; email?: string }) {
    if (!where.id && !where.email) {
      throw new Error("Must provide either id or email");
    }

    return this.userRepository.findOne({
      where,
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "password",
        "role",
        "refreshToken",
      ],
    });
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  updateRefreshToken(id: number, refreshToken: string) {
    return this.userRepository.update(id, { refreshToken });
  }
}
