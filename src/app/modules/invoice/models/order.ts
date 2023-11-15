import { Detail } from "./Detail";
import { DiscountDTO } from "./DiscountDTO";

export class Order {
    id: number = 0;
    fecha: string = '';
    doc_cliente: number = 0;
    id_reserva:number = 0;
    detalles: Detail[] = [];
    descuentos: DiscountDTO[]=[];
    subtotal:number = 0;
    total:number = 0;
}
