import { Detail } from "./Detail";
import { DiscountDTO } from "./DiscountDTO";
import { payDetailDTO } from "./payDetailDTO";
import { paymentMethodDTO } from "./paymentMethodDTO";

export class requestInvoiceDto{
    orderId?: number;
    clientId?:number;
    type?: string;
    status?: string;
    iva?: number;
    discountRequestList?:DiscountDTO[];
    reservationId?:number;
    paymentMethodList?:payDetailDTO[];
    details?: Detail[]
}