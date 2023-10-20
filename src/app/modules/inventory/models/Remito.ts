export class Remito{
    proveedor: string;
    fechaLlegada: Date;
    producto: string;
    cantidad: number;
    ordenCompra: string;
    nro: number;

    constructor(){
        this.proveedor='';
        this.fechaLlegada=new Date();
        this.producto='';
        this.cantidad=0;
        this.ordenCompra='';
        this.nro=0;
    }
}