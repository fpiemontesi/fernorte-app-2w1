import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { Presupuesto } from '../../models/Presupuesto';
import { PresupuestoService } from '../../services/presupuesto.service';


@Component({
  selector: 'fn-consultar-presupuesto',
  templateUrl: './consultar-presupuesto.component.html',
  styleUrls: ['./consultar-presupuesto.component.css'],
})
export class ConsultarPresupuestoComponent implements OnInit {
  clientes: Cliente[] = [];
  selectedClientId: number = 0;
  presupuesto: Presupuesto = new Presupuesto();
  mostrarDetalles: boolean = false;

  constructor(
    private clientService: ClienteService,
    private presupuestoService: PresupuestoService
  ) {}

  ngOnInit() {
    //this.clientService.getClientes().subscribe(data => {
     // this.clientes = data;
    //});
  }

  searchPresupuesto() {
    if (this.selectedClientId) {
      this.presupuestoService.getPresupuestoById(this.selectedClientId).subscribe(
        (data) => {
          this.presupuesto = data;
        },
        (error) => {
          alert('Error al obtener el presupuesto');
        }
      );
    }
  }
}
