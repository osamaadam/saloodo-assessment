import { User } from "src/user/entities/user.entity";
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum Status {
  PENDING = "PENDING",
  PICKED_UP = "PICKED_UP",
  DELIVERED = "DELIVERED",
}

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  pickupAddress: string;

  @Column({ nullable: false })
  dropoffAddress: string;

  @Column({
    type: "enum",
    enum: Status,
    nullable: false,
    default: Status.PENDING,
  })
  @Index()
  status: Status;

  @Column({ type: "timestamptz", nullable: true })
  pickupTime: Date;

  @Column({ type: "timestamptz", nullable: true })
  deliveryTime: Date;

  @Column({ type: "timestamptz", default: new Date() })
  createdAt: Date;

  @ManyToOne(() => User, (o) => o.clientParcels, {
    eager: true,
    nullable: false,
  })
  @Index()
  owner: User;

  @ManyToOne(() => User, (b) => b.bikerParcels, { eager: true })
  @Index()
  biker: User;

  @BeforeInsert()
  updateCreateDate() {
    this.createdAt = new Date();
    this.status = Status.PENDING;
  }
}
