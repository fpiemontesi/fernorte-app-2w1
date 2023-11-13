import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { RestService } from '../../services/rest.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'fn-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  numeroDoc: number = 0;

  constructor(
    private restService: RestService,
    private userService: UserService
  ) {}

  borrarUsuario() {
    if (this.numeroDoc === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Número de documento vacío',
        text: 'Por favor, ingrese un número de documento válido distinto de cero.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: `¿Deseas dar de baja al usuario con número de documento: ${this.numeroDoc}?`,
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
