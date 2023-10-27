import { payDetailDTO } from "./payDetailDTO";

export class requestInvoiceDto{
    orderId?: number;
    type?: string;
    paymentMethodList?:payDetailDTO[];

}