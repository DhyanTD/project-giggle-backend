import { Dao, Database } from "@smoke-trees/postgres-backend";
import { Product } from "./product.entity";

export class ProductDao extends Dao<Product>{
    constructor(database: Database) {
        super(database, Product, "product");
    }
}