export class Detalles {
  cod_producto: number;
  precio_unitario: number;
  cantidad: number;
  descripcion: string;

  constructor() {
    this.cod_producto = 0;
    this.descripcion = '';
    this.precio_unitario = 0;
    this.cantidad = 0;
  }
}
