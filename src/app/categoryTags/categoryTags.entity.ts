import { BaseEntity, Documentation } from "@smoke-trees/postgres-backend";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ICategoryTags } from "./ICategoryTag";


@Entity({ name: "category_tags" })
@Documentation.addSchema({type: "object"})
export class CategoryTags extends BaseEntity implements ICategoryTags {
   @PrimaryGeneratedColumn("uuid")
   id!: string;
   
   @Column("varchar", { name: "name" })
   @Documentation.addField({ type: "string"})
   name!: string;
   
   @Column("varchar", { name: "desc", nullable: true })
   @Documentation.addField({ type: "string" })
   desc?: string;
   
   @Column("boolean", { name: "is_active" })
   @Documentation.addField({ type: "boolean" })
   isActive!: boolean

   constructor(it?: ICategoryTags) {
     super(it);
     if (it) {
       this.id = it.id;
       this.name = it.name;
       this.desc = it.desc;
       this.isActive = it.isActive;
     }
   }
}