import {
  BaseEntity,
  Documentation,
} from "@smoke-trees/postgres-backend";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser, UserType } from "./IUser";

@Entity({ name: "user" })
@Documentation.addSchema({ type: "object" })
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar", { name: "name", length: 255 })
  @Documentation.addField({ type: "string", minLength: 3, maxLength: 255 })
  name!: string;

  @Column("varchar", { name: "email" })
  @Documentation.addField({ type: "string" })
  email!: string;

  @Column("varchar", { name: "phone", nullable: true })
  @Documentation.addField({ type: "string" })
  phone?: string;

  @Column("boolean", { name: "email_verified" })
  @Documentation.addField({ type: "boolean" })
  emailVerified!: boolean;

  @Column("varchar", { name: "password" })
  @Documentation.addField({ type: "string" })
  password!: string;

  @Column("enum", { name: "type", enum: UserType, default: UserType.puser })
  @Documentation.addField({ type: "string", enum: Object.values(UserType) })
  type!: UserType;

  @Column("varchar", { name: "course" })
  @Documentation.addField({ type: "string" })
  course?: string;

  constructor(it?: IUser) {
    super(it);
    if (it) {
      this.name = it.name;
      this.email = it.name;
      this.phone = it.phone;
      this.emailVerified = it.emailVerified;
      this.password = it.password;
      this.type = it.type;
      this.course = it.course
      if (it.id) {
        this.id = it.id
      }
    }
  }
}
