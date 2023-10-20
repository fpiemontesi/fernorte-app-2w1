import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'fn-consultar-presupuesto',
  templateUrl: './consultar-presupuesto.component.html',
  styleUrls: ['./consultar-presupuesto.component.css']
})
export class ConsultarPresupuestoComponent implements OnInit {
  clientes:Cliente[] = [];

  constructor(private clientService:ClienteService) {}

  ngOnInit() {
    this.clientService.getClientes().subscribe(data => {
      this.clientes = data;
    })
  }

  
}
