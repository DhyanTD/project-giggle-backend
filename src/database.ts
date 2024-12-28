import { Database } from "@smoke-trees/postgres-backend";
import "./config";
import settings from "./settings";
import { Address } from "./app/address/Address.entity";
import { User } from "./app/users/user.entity";
import { CategoryTags } from "./app/categoryTags/categoryTags.entity";
import { Product } from "./app/product/product.entity";

const database = new Database(settings);

// Add Entities

database.addEntity(User);
database.addEntity(Address);
database.addEntity(CategoryTags);
database.addEntity(Product);

// Add Migrations

export default database;
