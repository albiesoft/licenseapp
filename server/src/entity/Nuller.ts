import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Nuller extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  domain: string;

  @Column()
  ip: string;

  @Column()
  license: string;
}
