import { Detalles } from './Detalles';

export class Presupuesto {
  id: number;
  doc_cliente: number;
  fecha_creacion: Date;
  precio_total: number;
  tipo_venta: number;
  detalles: Detalles[];

  constructor() {
    this.id = 0;
    this.doc_cliente = 0;
    this.fecha_creacion = new Date();
    this.precio_total = 0;
    this.tipo_venta = 0;
    this.detalles = [];
  }
}