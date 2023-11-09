import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'fn-get-customers',
  templateUrl: './get-customers.component.html',
  styleUrls: ['./get-customers.component.css']
})
export class GetCustomersComponent implements OnInit {
  clienteArray: any[] = [];
  clienteFiltro: any[] = [];
  nroDocumento: number = 0;
  listaFiltrada: boolean = false;

  constructor(
    private restService: RestService,
    private customerService: CustomerService
  ) {}

  getListClientes() {
    this.restService.getClientes().subscribe((info: any) => {
      this.clienteArray = info;
      this.clienteFiltro = [...info];
    });
  }

  borrarFiltro() {
    this.nroDocumento = 0;
    this.filtrarPersonas();
  }

  filtrarPersonas() {
    if (this.nroDocumento != 0) {
      this.clienteFiltro = this.clienteArray.filter((persona) => {
        return (
          persona.nroDoc &&
          persona.nroDoc.toString().includes(this.nroDocumento.toString())
        );
      });

      this.listaFiltrada = true;

      if (this.clienteFiltro.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No se encontraron clientes',
          text: `No se encontró ningún cliente con el número de documento: ${this.nroDocumento}`,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
        this.borrarFiltro();
      }
    } else {
      this.clienteFiltro = [...this.clienteArray];
      this.listaFiltrada = false;
    }

  }

  ngOnInit(): void {
    this.clienteArray = this.customerService.getClientes();

    this.customerService.clientes$.subscribe((clientes) => {
      this.clienteArray = clientes;
      this.getListClientes();
    });

    this.customerService.clientes2$.subscribe((clientes) => {
      this.clienteArray = clientes;
      this.getListClientes();
    });
  }
}
