import { Component, ViewChild, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { RestService } from '../../services/rest.service';
import { UserService } from '../../services/user.service';
import { CargoService } from '../../services/cargo.service';

@Component({
  selector: 'fn-crear-user',
  templateUrl: './crear-user.component.html',
  styleUrls: ['./crear-user.component.css'],
})
export class CrearUserComponent implements OnInit{
  crearUsuarioForm: FormGroup = this.fb.group({});
  
  ngOnInit() {
    this.crearUsuarioForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      tipoCargo: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      numeroDocumento: ['', [Validators.required]],
    });

    this.cargoService.cargos$.subscribe((cargos) => {
      this.listaCargos = cargos;
      this.getListCargos();
    });
  }

  constructor(
    private fb:FormBuilder,
    private restService: RestService,
    private userService: UserService,
    private cargoService: CargoService
  ) {}

  listaCargos: any[] = [];

  usuario = new Usuario();

  getListCargos() {
    this.restService.getCargos().subscribe((info: any) => {
      this.listaCargos = info;
    });
  }

  crearUsuario() {
    this.crearUsuarioForm.markAllAsTouched();

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
