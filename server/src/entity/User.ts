import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity("users")
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  firstname: string;

  @Column("text")
  lastname: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

}
