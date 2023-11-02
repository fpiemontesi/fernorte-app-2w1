import { Detail } from "./Detail";
import { DiscountDTO } from "./DiscountDTO";
import { payDetailDTO } from "./payDetailDTO";
import { paymentMethodDTO } from "./paymentMethodDTO";

export class requestInvoiceDto{
    orderId?: number;
    paymentMethodList?:payDetailDTO[];
  
}