import { RestService } from '../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';
@Component({
  selector: 'fn-get-customers-points',
  templateUrl: './get-customers-points.component.html',
  styleUrls: ['./get-customers-points.component.css'],
})
export class GetCustomersPointsComponent implements OnInit {
  clienteArray: any[] = [];
  clienteFiltro: any[] = [];
  puntosDesde: number = 0;
  puntosHasta: number = 0;
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
    this.puntosDesde = 0;
    this.puntosHasta = 0;
    this.restService.getClientes().subscribe((info: any) => {
      this.clienteArray = info;
      this.clienteFiltro = [...info];
    });
    this.listaFiltrada = false;
  }
  filtrarPersonas() {
    if (this.puntosDesde === 0 && this.puntosHasta === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe indicar Desde o Hasta',
        text: 'Para filtrar los clientes, al menos uno de los campos debe estar lleno.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      return;
    }
    // Agregar validación para valores "Desde" y "Hasta"
    if (
      this.puntosDesde > 0 &&
      this.puntosHasta > 0 &&
      this.puntosDesde > this.puntosHasta
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el rango',
        text: '"Desde" no puede ser mayor que "Hasta".',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      return;
    }
    if (this.puntosDesde !== 0 || this.puntosHasta !== 0) {
      this.clienteFiltro = this.clienteArray.filter((cliente) => {
        if (this.puntosDesde !== 0 && this.puntosHasta !== 0) {
          return (
            cliente.cant_puntos >= this.puntosDesde &&
            cliente.cant_puntos <= this.puntosHasta
          );
        } else if (this.puntosDesde !== 0) {
          return cliente.cant_puntos >= this.puntosDesde;
        } else {
          return cliente.cant_puntos <= this.puntosHasta;
        }
      });
      this.listaFiltrada = true;
      if (this.clienteFiltro.length === 0) {
        Swal.fire({
          icon: 'warning',
          title: 'No se encontraron clientes',
          text: `No se encontró ningún cliente en el rango de puntos especificado`,
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
    this.getListClientes();
  }
}