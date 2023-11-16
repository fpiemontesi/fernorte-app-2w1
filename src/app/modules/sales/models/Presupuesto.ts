import { Detalle } from './Detalles';

export class  Presupuesto {
  id: number;
  doc_cliente: number;
  fecha_creacion: Date;
  tipo_venta: number;
  detalles: Detalle[];

  constructor() {
    this.id = 0;
    this.doc_cliente = 0;
    this.fecha_creacion = new Date();
    this.tipo_venta = 0;
    this.detalles = [];
  }
}