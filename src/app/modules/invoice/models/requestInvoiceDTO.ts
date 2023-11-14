import { Detail } from "./Detail";
import { DiscountDTO } from "./DiscountDTO";
import { PayDetailDTO } from "./PayDetailDTO";
import { PaymentMethodDTO } from "./PaymentMethodDTO";

export class RequestInvoiceDto{
    orderId?: number;
    paymentMethodList?:PayDetailDTO[];
  
}