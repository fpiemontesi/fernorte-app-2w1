import { Presupuesto } from './../../models/Presupuesto';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'fn-consultar-presupuesto',
  templateUrl: './consultar-presupuesto.component.html',
  styleUrls: ['./consultar-presupuesto.component.css'],
})
export class ConsultarPresupuestoComponent implements OnInit {
  clientes: Cliente[] = [];
  selectedCliente: Cliente = new Cliente();
  mostrarDetalles: boolean = false;
  presupuesto: Presupuesto = new Presupuesto();
  presupuestos: Presupuesto[] = [];

  constructor(
    private clienteService: ClienteService,
    private presupuestoService: PresupuestoService
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
    });
    this.presupuesto.totalImporte = this.calcularTotalImporte();
  }

  buscarPresupuestoPorFechasYCliente() {
    const parametros = {
      fecha_creacion: this.presupuesto.fechaDesde,
      fecha_vencimiento: this.presupuesto.fechaHasta,
      cliente:
        this.selectedCliente.nombre + ' ' + this.selectedCliente.apellido,
    };
    this.presupuestoService
      .getPresupuestoByDatesAndClient(parametros)
      .subscribe((response) => {
        this.presupuestos = response;
      });
  }

  calcularTotalImporte(): number {
    let total = 0;
    for (const detalle of this.presupuesto.detalles) {
      total += detalle.cantidad * detalle.precio_unitario;
    }
    return total;
  }

  mostrarDetallesFuncion() {
    this.mostrarDetalles = true;
  }
}
