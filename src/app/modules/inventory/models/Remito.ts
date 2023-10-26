import { DetalleRemito } from "./DetalleRemito";

export class Remito{
    id: number = 0;
    fechaLlegada: Date = new Date;
    nroOrdenCompra: number = 0;
    nroRemito: number = 0;
    nombreProveedor: string = "";
    detalles: DetalleRemito[] = [];
}