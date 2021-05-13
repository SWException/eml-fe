export type PaymentIntent = {
    id: string;
    secret: string;
    cartTotal: number;
    tax?: number;
    shippingFee?: number;
    total?: number;
}