import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'fn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loginSuccess: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('loginUsuarioForm', { static: false }) loginUsuarioForm!: NgForm;
  @ViewChild('resetPasswordUsuarioForm', { static: false })
  resetPasswordUsuarioForm!: NgForm;
  @ViewChild('verifyUsuarioForm', { static: false }) verifyUsuarioForm!: NgForm;
  @ViewChild('changePasswordUsuarioForm', { static: false })
  changePasswordUsuarioForm!: NgForm;

  mostrarLogin: boolean = true;
  mostrarRecuperarContrasena: boolean = false;
  mostrarIngresarCodigo: boolean = false;
  mostrarCambiarContrasena: boolean = false;

  bodyEmail = {
    email: '',
  };

  credentials = {
    username: '',
    password: '',
  };

  verification = {
    email: '',
    verificationCode: '',
  };

  password = {
    token: '',
    newPassword: '',
  };

  constructor(private restService: RestService) {}

  login() {
    Object.keys(this.loginUsuarioForm.controls).forEach((controlName) => {
      this.loginUsuarioForm.controls[controlName].markAsTouched();
    });

    if (this.loginUsuarioForm.valid) {
      this.restService.loginUsuario(this.credentials).subscribe(
        (response) => {
          console.log('Login exitoso!', response);

          // Limpia los inputs de email y contraseña
          this.credentials = {
            username: '',
            password: '',
          };

          this.loginUsuarioForm.reset();
          localStorage.setItem('tokenLogin', JSON.stringify(response));
          Swal.fire({
            icon: 'success',
            title: 'Login exitoso!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
          this.loginSuccess.emit();
        },
        (error) => {
          if (error.error.message == 'User not active') {
            Swal.fire({
              icon: 'error',
              title: 'El Usuario esta inhabilitado',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
            console.log('error: ' + error);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Usuario o contraseña incorrectas',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
            console.log('error: ' + error);
          }
        }
      );
    }
  }

  recuperarContrasena() {
    this.mostrarLogin = false;
    this.mostrarRecuperarContrasena = true;

    this.credentials = {
      username: '',
      password: '',
    };
  }

  cancelarRecuperarContrasena() {
    this.mostrarLogin = true;
    this.mostrarRecuperarContrasena = false;
    this.bodyEmail.email = '';
  }

  enviarMailParaRecuperar() {
    Object.keys(this.resetPasswordUsuarioForm.controls).forEach(
      (controlName) => {
        this.resetPasswordUsuarioForm.controls[controlName].markAsTouched();
      }
    );

    this.verification.email = this.bodyEmail.email;

    if (this.resetPasswordUsuarioForm.valid) {
      this.restService.resetPasswordUsuario(this.bodyEmail).subscribe(
        (response) => {
          console.log('Email enviado', response);

          this.resetPasswordUsuarioForm.reset();

          Swal.fire({
            icon: 'success',
            title: 'Codigo de verificacion enviado con exito!',
            text: 'Revise su bandeja de entrada o spam.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });

          this.mostrarRecuperarContrasena = false;
          this.mostrarIngresarCodigo = true;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'El email ingresado no corresponde a ningun usuario!',
            text: 'Ingrese un email existente',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
        }
      );
    }
  }

  cancelarIngresarCodigo() {
    this.mostrarRecuperarContrasena = true;
    this.mostrarIngresarCodigo = false;
    this.verification.verificationCode = '';
  }

  verificarUsuario() {
    Object.keys(this.verifyUsuarioForm.controls).forEach((controlName) => {
      this.verifyUsuarioForm.controls[controlName].markAsTouched();
    });

    if (this.verifyUsuarioForm.valid) {
      this.restService.verifyUsuario(this.verification).subscribe(
        (response) => {
          console.log('Email verificado con exito!');

          // Limpia el input del codigo de verificacion
          this.verification = {
            email: '',
            verificationCode: '',
          };

          this.verifyUsuarioForm.reset();

          Swal.fire({
            icon: 'success',
            title: 'Email verificado con exito!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });

          this.password.token = response.token;

          this.mostrarCambiarContrasena = true;
          this.mostrarIngresarCodigo = false;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'El código de verificación no es válido',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
          console.log('error: ' + error);
        }
      );
    }
  }

  cancelarCambiarContrasena() {
    this.mostrarCambiarContrasena = false;
    this.mostrarLogin = true;
  }

  cambiarContrasenaUsuario() {
    Object.keys(this.changePasswordUsuarioForm.controls).forEach(
      (controlName) => {
        this.changePasswordUsuarioForm.controls[controlName].markAsTouched();
      }
    );

    if (this.changePasswordUsuarioForm.valid) {
      this.restService.updatePasswordUsuario(this.password).subscribe(
        (response) => {
          console.log('Contraseña actualizada con exito!');

          // Limpia el input de la nueva contraseña
          this.password = {
            token: '',
            newPassword: '',
          };

          this.changePasswordUsuarioForm.reset();

          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada con exito!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });

          this.mostrarLogin = true;
          this.mostrarCambiarContrasena = false;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'No se pudo actualizar la contraseña',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
          console.log('error: ' + error);
        }
      );
    }
  }
}
