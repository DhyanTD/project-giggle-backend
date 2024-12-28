import { Application, Controller, ServiceController } from "@smoke-trees/postgres-backend";
import { OrdersService } from "./orders.service";
import { Orders } from "./orders.entity";
import { RequestHandler } from "express-serve-static-core";


export class OrdersController extends ServiceController<Orders> {
    public path = '/orders'
    protected controllers: Controller[] = []
    protected mw: RequestHandler[] = []
    public service: OrdersService
    constructor(app: Application, ordersService: OrdersService) {
        super(app, Orders, ordersService);
        this.service = ordersService;
        this.controllers = [];
        this.mw = [];
        this.loadDocumentation();
    }
}