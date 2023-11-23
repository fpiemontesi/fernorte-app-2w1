export class PresupuestoFiltro{
    id?:number;
    doc_cliente?:number;
    tipo_presupuesto?:number;
    monto_desde?:number;
    monto_hasta?:number;
    fecha_desde?:Date;
    fecha_hasta?:Date;

    constructor(){
        this.id = undefined;
        this.doc_cliente = undefined;
        this.tipo_presupuesto = undefined;
        this.monto_desde = undefined;
        this.monto_hasta = undefined;
        this.fecha_desde = undefined;
        this.fecha_hasta = undefined;
    }
}