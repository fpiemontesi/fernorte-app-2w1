export class Detalles {
    id: number;
  ventaId: number;
  productoId: number;
  precioUnitario: number;
  cantidad: number;
  descripcion: string;
  total: number;

  constructor(){
    this.id = 0;
    this.ventaId = 0;
    this.productoId = 0;
    this.descripcion = "";
    this.precioUnitario = 0;
    this.cantidad = 0;
    this.total = 0;
  }

}
