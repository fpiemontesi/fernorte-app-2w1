import { Detalles } from './Detalles';

export class Presupuesto {
  id: number;
  nro_presupuesto: string;
  cliente: string;
  fecha_creacion: Date;
  fecha_vencimiento: Date;
  productos: Detalles[];

  constructor() {
    this.id = 0;
    this.nro_presupuesto = '';
    this.cliente = '';
    this.fecha_creacion = new Date();
    this.fecha_vencimiento = new Date();
    this.productos = [];
  }
}