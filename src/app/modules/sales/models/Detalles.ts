export class Detalle {
  cod_producto: string;
  precio_unitario: number;
  cantidad: number;
  descripcion: string;

  constructor() {
    this.cod_producto = '';
    this.descripcion = '';
    this.precio_unitario = 0;
    this.cantidad = 0;
  }
}
