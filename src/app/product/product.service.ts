import { Service } from "@smoke-trees/postgres-backend";
import { ProductDao } from "./product.dao";
import { Product } from "./product.entity";

export class ProductService extends Service<Product> {
    dao: ProductDao;
    constructor(dao: ProductDao) {
        super(dao);
        this.dao = dao;
    }
}
