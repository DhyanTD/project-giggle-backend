import { Dao, Database } from "@smoke-trees/postgres-backend";
import { Orders } from "./orders.entity";

export class OrdersDao extends Dao<Orders>{
    constructor(database: Database) {
       super(database, Orders, "orders"); 
    }
}