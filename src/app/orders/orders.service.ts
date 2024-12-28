import { Service } from "@smoke-trees/postgres-backend";
import { Orders } from "./orders.entity";
import { OrdersDao } from "./orders.dao";

export class OrdersService extends Service<Orders>{
dao: OrdersDao;
constructor(dao: OrdersDao) {
    super(dao);
    this.dao = dao;
  }
}