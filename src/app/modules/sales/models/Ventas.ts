import { Detalles } from "./Detalles";


export class Ventas {
    id: number;
    id_cliente: number;
    id_vendedor: string;
    fecha: Date;
    forma_entrega: string;
    tipo_venta: string;
    estado: string;
    total: number;
    detalles: Array<Detalles> = [];

    constructor() {
       this.id = 0;
       this.id_cliente = 0;
       this.id_vendedor = "";
       this.fecha = new Date();
       this.forma_entrega = "";
       this.tipo_venta = "";
       this.estado = "";
       this.total = 0;
    }
}
