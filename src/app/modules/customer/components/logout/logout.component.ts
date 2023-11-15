import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent {
  logout() {
    Swal.fire({
      icon: 'warning',
      title: 'Cerrando sesión',
      text: 'Se cerrará la sesión y serás redirigido a la pantalla de inicio.',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).then(() => {
      localStorage.removeItem('tokenLogin');
      window.location.reload();
    });
  }
}
