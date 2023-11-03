import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { TurnService } from '../../services/turn.service';

@Component({
  selector: 'fn-get-turns',
  templateUrl: './get-turns.component.html',
  styleUrls: ['./get-turns.component.css'],
})
export class GetTurnsComponent implements OnInit {
  turnosArray: any[] = [];
  atendidosArray: any[] = [];

  constructor(
    private restService: RestService,
    private turnService: TurnService
  ) {}

  ngOnInit(): void {
    this.turnService.turnos$.subscribe((turno) => {
      this.turnosArray = turno;
      this.getListClientes();
      this.getListClientesAtendidos();
    });
  }

  getListClientes() {
    this.restService.getTurnos().subscribe((info: any) => {
      this.turnosArray = info;
      console.log(this.turnosArray);
    });
  }

  getListClientesAtendidos() {
    this.restService.getAtendidos().subscribe((info: any) => {
      this.atendidosArray = info;
      console.log(this.atendidosArray);
    });
  }

  atender(turno: any) {
    Swal.fire({
      title:
        '¿Estás seguro de que deseas marcar como atendido al cliente con número de turno: ' +
        turno.nro_turno +
        '?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#308B45',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          this.restService
            .putEstadoTurno(turno.id_solicitud)
            .subscribe((response) => {
              console.log('Cliente atendido:', response);
            });

          Swal.fire({
            icon: 'success',
            title: 'Cliente atendido exitosamente!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });

          let index = this.turnosArray.findIndex(
            (element) => element.id_solicitud === turno.id_solicitud
          );
          if (index !== -1) {
            this.turnosArray.splice(index, 1);
          }

          this.getListClientesAtendidos();
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}
