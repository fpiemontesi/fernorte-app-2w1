import { Detail } from "./Detail";
import { paymentMethodDTO } from "./paymentMethodDTO";

export class requestInvoiceDto{
    orderId?: number;
    type?: string;
    paymentMethodList?:paymentMethodDTO[];
    details?: Detail[]
}