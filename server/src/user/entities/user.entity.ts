import { Parcel } from "src/parcel/entities/parcel.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  BIKER = "BIKER",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, type: "enum", default: Role.CLIENT })
  role: Role;

  @OneToMany(() => Parcel, (p) => p.owner)
  clientParcels: Parcel[];

  @OneToMany(() => Parcel, (p) => p.biker)
  bikerParcels: Parcel[];
}
