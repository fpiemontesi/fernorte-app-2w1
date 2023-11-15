import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { RestService } from '../../services/rest.service';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent {
  @ViewChild('borrarUsuarioForm', { static: false }) borrarUsuarioForm!: NgForm;

  numeroDoc: number = 0;

  constructor(
    private restService: RestService,
    private userService: UserService
  ) {}

  borrarUsuario() {
    Object.keys(this.borrarUsuarioForm.controls).forEach((controlName) => {
      this.borrarUsuarioForm.controls[controlName].markAsTouched();
    });

    if (!this.numeroDoc && this.numeroDoc !== 0) {
      Swal.fire({
        icon: 'warning',
        title: 'El número de documento no puede estar vacío',
        text: 'Vuelva a ingresar el número de documento del usuario.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    } else if (this.numeroDoc == 0) {
      Swal.fire({
        icon: 'error',
        title: 'El número de documento no puede ser 0',
        text: 'Vuelva a ingresar el número de documento del usuario.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    } else if (this.numeroDoc < 0) {
      Swal.fire({
        icon: 'error',
        title: 'El número de documento no puede ser negativo',
        text: 'Vuelva a ingresar el número de documento del usuario.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Confirmar baja de usuario',
        text: `¿Estás seguro de que deseas dar de baja al usuario con número de documento: ${this.numeroDoc}? Esta acción no se puede deshacer.`,
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#808080',
      }).then((result) => {
        if (result.isConfirmed) {
          this.restService.deleteUsuario(this.numeroDoc).subscribe(
            (response) => {
              console.log(response);
            },
            (error) => {
              console.log('error: ' + error);
              if (error.status === 404) {
                Swal.fire({
                  icon: 'error',
                  title:
                    'El número de documento: ' +
                    this.numeroDoc +
                    ' no corresponde a ningún usuario',
                  text: 'Por favor, ingrese un número de documento existente.',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#808080',
                });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario dado de baja exitosamente!',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#808080',
                });
                this.numeroDoc = 0;
              }
            }
          );
        }
      });
    }
  }
}
