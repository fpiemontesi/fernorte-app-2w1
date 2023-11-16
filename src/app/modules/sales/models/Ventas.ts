import { Detalle } from "./Detalles";


export class Ventas {
    id: number;
    doc_cliente: number;
    id_vendedor: number;
    fecha: Date;
    forma_entrega: number;
    tipo_venta: number;
    estado: number;
    total: number;
    detalles: Array<Detalle> = [];

    constructor() {
       this.id = 0;
       this.doc_cliente = 0;
       this.id_vendedor = 0;
       this.fecha = new Date();
       this.forma_entrega = 0;
       this.tipo_venta = 0;
       this.estado = 0;
       this.total = 0;
    }
}
