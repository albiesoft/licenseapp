import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class License extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  domain: string;

  @Column({ nullable: true })
  ip: string;

  @Column("text")
  license: string;

  @Column()
  used: boolean;
}
