import { Application, Controller, ServiceController } from "@smoke-trees/postgres-backend";
import { OrdersService } from "./orders.service";
import { Orders } from "./orders.entity";


export class OrdersController extends ServiceController<Orders> {
  public path = '/order'
  protected controllers: Controller[] = []
  protected mw= []
  public service: OrdersService
  constructor(app: Application, service: OrdersService) {
    super(app, Orders, service);
    this.service = service;
    this.loadDocumentation();
  }
}
