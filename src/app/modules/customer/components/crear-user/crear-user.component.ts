import { Component, ViewChild, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { RestService } from '../../services/rest.service';
import { UserService } from '../../services/user.service';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'fn-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css'],
})
export class CrearUserComponent {
  ngOnInit() {
    this.cargoService.cargos$.subscribe((cargos) => {
      this.listaCargos = cargos;
      this.getListCargos();
    });
  }

  constructor(
    private restService: RestService,
    private userService: UserService,
    private cargoService: CargoService
  ) {}

  listaCargos: any[] = [];

  @ViewChild('crearUsuarioForm', { static: false }) crearUsuarioForm!: NgForm;

  usuario = new Usuario();

  getListCargos() {
    this.restService.getCargos().subscribe((info: any) => {
      this.listaCargos = info;
    });
  }

  crearUsuario() {
    Object.keys(this.crearUsuarioForm.controls).forEach((controlName) => {
      this.crearUsuarioForm.controls[controlName].markAsTouched();
    });

    if (this.crearUsuarioForm.valid) {
      this.restService.postUsuario(this.usuario).subscribe(
        (response) => {
          console.log('Usuario creado con éxito', response);

          this.crearUsuarioForm.reset();
          this.userService.agregarUsuario(this.usuario);

          Swal.fire({
            icon: 'success',
            title: 'Usuario creado con exito!',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
        },
        (error) => {
          console.log(error);
          if (error.error.message == 'Email already in use') {
            Swal.fire({
              icon: 'error',
              title: 'El Email ingresado ya esta en uso',
              text: 'Por favor, ingrese un email diferente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
            console.log('error: ' + error);
          } else if (error.error.message == 'Username already in use') {
            Swal.fire({
              icon: 'error',
              title: 'El username ingresado ya esta en uso',
              text: 'Por favor, ingrese un username diferente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
            console.log('error: ' + error);
          } else if (error.error.message == 'Document number already in use') {
            Swal.fire({
              icon: 'error',
              title: 'El número de documento ingresado ya esta en uso',
              text: 'Por favor, ingrese un número de documento diferente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
            console.log('error: ' + error);
          }
        }
      );
    }
  }
}
