import { ReceiptDetail } from "./receipt-detail";

export class Receipt {
    id: number = 0;
    arrivalDate: Date = new Date();
    purchaseOrderNumber: number = 0;
    receiptNumber: number = 0;
    supplierName: string = "";
    details: ReceiptDetail[] = [];
}
