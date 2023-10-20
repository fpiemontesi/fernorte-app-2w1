import { PmDTO } from "./pm-dto";

export interface Payment {
    //idPayment : number;
    listPaymentMethodDTO : PmDTO[]; 
    details : String;
    invoiceTotal: number;
}
