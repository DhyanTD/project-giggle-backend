import { BaseEntity, Documentation } from '@smoke-trees/postgres-backend'
import { CurrencyCode, IOrders, OrderType, PaymentGateway, PaymentStatus, RefundStatus } from './IOrders'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'orders' })
@Documentation.addSchema({ type: 'object' })
export class Orders extends BaseEntity implements IOrders {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Documentation.addField({ type: 'string' })
  @Column('varchar', { name: 'user_id' })
  userId!: string

  @Documentation.addField({ type: 'string', enum: Object.values(PaymentGateway) })
  @Column('enum', { name: 'payment_gateway', enum: PaymentGateway })
  paymentGateway!: PaymentGateway

  @Documentation.addField({ type: 'string', enum: Object.values(PaymentStatus) })
  @Column('enum', { name: 'payment_status', enum: PaymentStatus })
  paymentStatus!: PaymentStatus

  @Documentation.addField({ type: 'string' })
  @Column('varchar', { name: 'product_id', nullable: true })
  productId?: string

  @Documentation.addField({ type: 'string', enum: Object.values(OrderType) })
  @Column('enum', { name: 'order_type', enum: OrderType })
  orderType!: OrderType

  @Documentation.addField({ type: 'number' })
  @Column('float', { name: 'order_amount' })
  orderAmount!: number

  @Documentation.addField({ type: 'string', enum: Object.values(CurrencyCode) })
  @Column('enum', { name: 'currency_code', enum: CurrencyCode })
  currencyCode!: CurrencyCode

  @Documentation.addField({ type: 'string', enum: Object.values(RefundStatus) })
  @Column('enum', { name: 'refund_status', enum: RefundStatus })
  refundStatus!: RefundStatus

  @Documentation.addField({ type: 'number' })
  @Column('float', { name: 'refund_amount', nullable: true })
  refundAmount?: number

  @Documentation.addField({ type: 'string' })
  @Column('varchar', { name: 'discount_code', nullable: true })
  discountCode?: string

  @Documentation.addField({ type: 'number' })
  @Column('float', { name: 'discount_amount', nullable: true })
  discountAmount?: number

  constructor(it?: IOrders) {
    super(it);
    if (it) {
      this.userId = it.userId;
      this.paymentGateway = it.paymentGateway;
      this.paymentStatus = it.paymentStatus;
      this.productId = it.productId;
      this.orderType = it.orderType;
      this.orderAmount = it.orderAmount;
      this.currencyCode = it.currencyCode;
      this.refundStatus = it.refundStatus;
      this.refundAmount = it.refundAmount;
      this.discountCode = it.discountCode;
      this.discountAmount = it.discountAmount;
      if (it.id) {
        this.id = it.id;
      }
    }
  }
}
