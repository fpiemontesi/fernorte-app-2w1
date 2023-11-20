import { Detail } from "./Detail";
import { DiscountDTO } from "./DiscountDTO";
import { PayDetailDTO } from "./pay-detail-dto";


export class RequestInvoiceDto{
    orderId?: number;
    paymentMethodList?:PayDetailDTO[];
  
}