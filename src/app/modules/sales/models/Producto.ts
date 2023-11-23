export class Producto {
    codigo: string;
    nombre: string;
    descripcion: string;
    precio_compra: number;
    precio_minorista: number;
    precio_mayorista: number;
    dimensiones: string;
    peso: string;

    constructor(){
        this.codigo = '';
        this.nombre = '';
        this.descripcion = '';
        this.precio_compra = 0;
        this.precio_minorista = 0;
        this.precio_mayorista = 0;
        this.dimensiones = '';
        this.peso = '';
    }
}
