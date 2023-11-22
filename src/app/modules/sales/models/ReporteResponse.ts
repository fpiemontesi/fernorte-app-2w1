export class ReporteResponse{
    monto:number;
    monto_mes_anterior:number;
    total_ventas:number;
    total_mes_anterior:number;
    mayorista:number;
    minorista:number;
    pendiente:number;
    entregado:number;
    productos:ReporteProductoResponse[]
    constructor(){
        this.monto = 0;
        this.monto_mes_anterior = 0;
        this.total_ventas = 0;
        this.total_mes_anterior = 0;
        this.mayorista = 0;
        this.minorista = 0;
        this.pendiente = 0;
        this.entregado = 0;
        this.productos = [];
    }
}

export class ReporteProductoResponse{
    descripcion:string;
    cantidad:number;

    constructor(){
        this.cantidad = 0;
        this.descripcion = "";
    }
}