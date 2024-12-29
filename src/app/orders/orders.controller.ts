import { Application, Controller, ErrorCode, Methods, Result, ServiceController } from "@smoke-trees/postgres-backend";
import { OrdersService } from "./orders.service";
import { Orders } from "./orders.entity";
import { AuthMiddleware } from "../../middlware/authMiddleware";
import { Request, Response } from "express";


export class OrdersController extends ServiceController<Orders> {
  public path = '/order'
  protected controllers: Controller[] = []
  protected mw = []
  public service: OrdersService
  constructor(app: Application, service: OrdersService, readonly authMiddleware: AuthMiddleware) {
    super(app, Orders, service
      ,
      {
        paths: {
          create: false,
          update: false,
          delete: false,
        },
      },
      {
        readMany: [
          authMiddleware.generateAuthMiddleware({
            userIdLoc: (req: Request) => req.query.userId?.toString(),
          }),
        ],
        readManyWithoutPagination: [
          authMiddleware.generateAuthMiddleware({
            userIdLoc: (req: Request) => req.query.userId?.toString(),
          }),
        ],
        read: [
          authMiddleware.generateAuthMiddleware({
            contextOnly: true,
          }),
        ],
      }
    );
    this.service = service;
    this.loadDocumentation();
    this.addRoutes({
      method: Methods.POST,
      path: "/manual",
      localMiddleware: [
        authMiddleware.generateAuthMiddleware({
          adminOnly: true,
        }),
      ],
      handler: this.manualOrder.bind(this),
    });
  }

  async manualOrder(req: Request, res: Response) {
    const { userId, type, purchaseId, currencyCode } = req.body;
    if (!userId || !type || !purchaseId) {
      const result = new Result(true, ErrorCode.BadRequest, "Bad Request");
      res.status(result.getStatus()).json(result);
      return;
    }
    const result = await this.service.manualOrder(userId, type, purchaseId, currencyCode);
    res.status(result.getStatus()).json(result);
    return;
  }
}
