export interface IOrders{
    id: string
    userId: string
    paymentGateway: PaymentGateway
    paymentStatus: PaymentStatus
    productId?: string
    orderType: OrderType
    orderAmount: number
    currencyCode: CurrencyCode
    refundStatus: RefundStatus
    refundAmount?: number
    discountCode?: string
    discountAmount?: number
}

export enum PaymentGateway {
	Stripe = "Stripe",
	Offline = "Offline"
}

export enum PaymentStatus {
	Pending = "P",
	Confirmed = "C",
	Failed = "F"
}

export enum OrderType{
    Single = "Single",
}

export enum RefundStatus{
    None = "None",
    Partial = "Partial",
    Full = "Full"
}

export enum CurrencyCode {
	USD = "USD",
	INR = "INR",
}