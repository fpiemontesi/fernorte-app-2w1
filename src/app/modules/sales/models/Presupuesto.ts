import { Detalles } from './Detalles';

export class Presupuesto {
  id: number;
  nro_presupuesto: string;
  cliente: string;
  fecha_creacion: Date;
  fecha_vencimiento: Date;
  total_importe: number;
  productos: Detalles[];

  constructor() {
    this.id = 0;
    this.nro_presupuesto = '';
    this.cliente = '';
    this.fecha_creacion = new Date();
    this.fecha_vencimiento = new Date();
    this.total_importe = 0;
    this.productos = [];
  }
}