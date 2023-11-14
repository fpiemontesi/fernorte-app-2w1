import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'fn-turnero',
  templateUrl: './turnero.component.html',
  styleUrls: ['./turnero.component.css'],
})
export class TurneroComponent {
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
    private turnoService: TurnoService
  ) {}

  getListClientes() {
    this.restService.getTurnos().subscribe((info: any) => {
      this.turnosArray = info;
      console.log(this.turnosArray);
    });
  }

  verificarCliente() {
    Object.keys(this.generarTurnoForm.controls).forEach((controlName) => {
      this.generarTurnoForm.controls[controlName].markAsTouched();
    });

    if (!this.numeroDocumento && this.numeroDocumento != 0) {
      Swal.fire({
        icon: 'warning',
        title: 'El número de documento no puede estar vacío',
        text: 'Vuelva a ingresar el número de documento del cliente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    }
    else if (this.numeroDocumento == 0 || this.numeroDocumento < 0) {
      Swal.fire({
        icon: 'error',
        title: 'El número de documento no puede ser 0 o negativo',
        text: 'Vuelva a ingresar el número de documento del cliente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
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

            if (!this.numeroDocumento && this.numeroDocumento != 0) {
              Swal.fire({
                icon: 'warning',
                title: 'El número de documento no puede estar vacío',
                text: 'Vuelva a ingresar el número de documento del cliente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#808080',
              });
            }
            else if (this.numeroDocumento == 0 || this.numeroDocumento < 0) {
              Swal.fire({
                icon: 'error',
                title: 'El número de documento no puede ser 0 o negativo',
                text: 'Vuelva a ingresar el número de documento del cliente.',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#808080',
              });
            } else {

            Swal.fire({
              icon: 'error',
              title: 'Cliente no encontrado',
              text: 'El número de documento ingresado no corresponde a ningún cliente existente',
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
            });}
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

        this.turnoService.agregarTurno(turno);

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

        this.turnoService.agregarTurno(turno);

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
