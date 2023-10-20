import { Detalles } from "./Detalles";


export class Ventas {
    id: number;
    cliente: string;
    vendedor: string;
    fecha: Date;
    formaEntrega: string;
    tipoPedido: string;
    estado: string;
    monto: number;
    detalles: Array<Detalles> = [];

    constructor() {
       this.id = 0;
       this.cliente = "";
       this.vendedor = "";
       this.fecha = new Date();
       this.formaEntrega = "";
       this.tipoPedido = "";
       this.estado = "";
       this.monto = 0;
    }
}
