import { receiptDetail } from "./detalle-remito";

export class receipt {
    id: number = 0;
    arrivalDate: Date = new Date();
    purchaseOrderNumber: number = 0;
    receiptNumber: number = 0;
    supplierName: string = "";
    details: receiptDetail[] = [];
}