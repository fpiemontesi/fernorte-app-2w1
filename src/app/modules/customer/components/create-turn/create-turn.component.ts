import { TurnService } from '../../services/turn.service';
import { Component, ViewChild } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-create-turn',
  templateUrl: './create-turn.component.html',
  styleUrls: ['./create-turn.component.css'],
})
export class CreateTurnComponent {
  @ViewChild('generarTurnoForm', { static: false }) generarTurnoForm!: NgForm;
  @ViewChild('generarTurnoTemporalesForm', { static: false })
  generarTurnoTemporalesForm!: NgForm;

  mostrarFormTemporal: boolean = false;

  numeroDocumento: number = 0;

  clienteTemporal = {
    nombre: '',
    apellido: '',
    nroDoc: 0,
  };

  clienteRegistrado: any;
  turnoGenerado: any;

  turnosArray: any[] = [];

  constructor(
    private restService: RestService,
    private turnService: TurnService
  ) {}

  getListClientes() {
    this.restService.getTurnos().subscribe((info: any) => {
      this.turnosArray = info;
      console.log(this.turnosArray);
    });
  }

  verificarCliente() {
    if (this.numeroDocumento === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Número de documento inválido',
        text: 'El número de documento no puede ser 0. Por favor, ingrese un número válido.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      return;
    }

    this.restService.getTurnos().subscribe((turnos) => {
      const clienteConTurno = turnos.some(
        (turno) =>
          turno.cliente?.nroDoc === this.numeroDocumento ||
          turno.clienteTemporal?.nroDoc === this.numeroDocumento
      );

      if (clienteConTurno) {
        Swal.fire({
          icon: 'error',
          title: 'El cliente ingresado ya tiene un turno asignado',
          text: 'Espere que el turno sea atendido para poder sacar uno nuevo',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      } else {
        this.restService.getClientes().subscribe((clientes) => {
          const clienteExiste = clientes.some(
            (cliente) => cliente.nroDoc == this.numeroDocumento
          );

          if (clienteExiste) {
            this.generarTurnoClienteRegistrado();
            this.generarTurnoForm.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Cliente no encontrado',
              text: 'El número de documento ingresado no corresponde a ningún cliente existente en la base de datos',
              showCancelButton: true,
              showConfirmButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Registrar cliente temporal',
              cancelButtonColor: '#808080',
              confirmButtonColor: '#308B45',
            }).then((result) => {
              if (result.isConfirmed) {
                this.mostrarFormRegistrarClienteTemporal();
                this.clienteTemporal.nroDoc = this.numeroDocumento;
              } else if (result.isDismissed) {
              }
            });
          }
        });
      }
    });
  }

  mostrarFormRegistrarClienteTemporal() {
    this.mostrarFormTemporal = true;
  }

  generarTurnoClienteRegistrado() {
    const nroDoc = this.numeroDocumento;

    this.restService
      .generarTurnoClienteRegistrado(nroDoc)
      .subscribe((turno) => {
        this.turnoGenerado = turno;

        console.log(this.turnoGenerado);

        this.turnService.agregarTurno(turno);

        Swal.fire({
          icon: 'success',
          title: 'Turno generado exitosamente!',
          text:
            'El número de turno para ' +
            this.turnoGenerado.cliente.nombre +
            ' ' +
            this.turnoGenerado.cliente.apellido +
            ' es: ' +
            this.turnoGenerado.nro_turno,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      });
  }

  generarTurnoClienteTemporal() {
    this.restService
      .generarTurnoClienteTemporal(this.clienteTemporal)
      .subscribe((turno) => {
        this.turnoGenerado = turno;

        console.log(this.turnoGenerado);

        this.turnService.agregarTurno(turno);

        Swal.fire({
          icon: 'success',
          title: 'Turno generado exitosamente!',
          text:
            'El número de turno para ' +
            this.turnoGenerado.clienteTemporal.nombre +
            ' ' +
            this.turnoGenerado.clienteTemporal.apellido +
            ' es: ' +
            this.turnoGenerado.nro_turno,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });

        this.generarTurnoTemporalesForm.reset();

        this.mostrarFormTemporal = false;
      });
  }

  cancelarGenerarTurnoTemporal() {
    this.mostrarFormTemporal = false;
  }
}
