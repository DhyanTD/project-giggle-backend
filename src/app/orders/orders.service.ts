import { Service } from "@smoke-trees/postgres-backend";
import { Orders } from "./orders.entity";
import { OrdersDao } from "./orders.dao";
import { CurrencyCode, OrderType, PaymentGateway, PaymentStatus, RefundStatus } from "./IOrders";
import { ProductDao } from "../product/product.dao";
import { v4 as uuidv4 } from 'uuid';


export class OrdersService extends Service<Orders> {
  dao: OrdersDao;
  productDao: ProductDao;
  constructor(dao: OrdersDao, productDao: ProductDao) {
    super(dao);
    this.dao = dao;
    this.productDao = productDao
  }


  async manualOrder(userId: string, type: OrderType, purchaseId: string, currencyCode: CurrencyCode) {
    if (!currencyCode) currencyCode = CurrencyCode.INR;
    const order = new Orders({
      userId: userId,
      paymentGateway: PaymentGateway.Offline,
      paymentStatus: PaymentStatus.Pending,
      orderType: type,
      refundStatus: RefundStatus.None,
      currencyCode: currencyCode,
      orderAmount: 0,
      id: uuidv4(),
    });
    if (type === OrderType.Single) {
      const product = await this.productDao.read({
        where: { id: purchaseId },
        loadEagerRelations: false,
        select: ["price"],
      });
      if (product.status.error || !product.result) return product;
      order.productId = purchaseId;
      order.orderAmount = product?.result?.price?.find((e) => e.currency === currencyCode)?.price || 0;
    }

    const orderCreate = await this.dao.create(order);
    if (orderCreate.status.error) return orderCreate;
    //return this.orderPaidSuccessfully(orderId.result);
    return orderCreate;
  }

}
