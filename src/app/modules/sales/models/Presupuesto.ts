import { Cliente } from './Cliente';
import { Detalles } from './Detalles';

export class Presupuesto {
  id: number;
  nroPresupuesto: string;
  cliente: Cliente;
  fechaDesde: Date;
  fechaHasta: Date;
  totalImporte: number;
  detalles: Detalles[];

  constructor() {
    this.id = 0;
    this.nroPresupuesto = '';
    this.cliente = new Cliente();
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();
    this.totalImporte = 0;
    this.detalles = [];
  }
}