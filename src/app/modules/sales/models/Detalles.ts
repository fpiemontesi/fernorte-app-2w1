export class Detalles {
  id_producto: number;
  precio_unitario: number;
  cantidad: number;
  descripcion: string;

  constructor() {
    this.id_producto = 0;
    this.descripcion = '';
    this.precio_unitario = 0;
    this.cantidad = 0;
  }
}
