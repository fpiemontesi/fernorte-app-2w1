import { paymentMethodList } from "./paymentMethodListDTO";

export class requestInvoiceDto{
    orderId?: number;
    type?: string;
    paymentMethodList?:paymentMethodList[];

}