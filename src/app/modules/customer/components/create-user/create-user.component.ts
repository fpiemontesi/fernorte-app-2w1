import { RestService } from './../../services/rest.service';
import { UserService } from '../../services/user.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { PositionService } from '../../services/position.service';
import { User } from '../../models/user';

@Component({
  selector: 'fn-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  ngOnInit() {
    this.positionService.cargos$.subscribe((cargos) => {
      this.listaCargos = cargos;
      this.getListCargos();
    });
  }

  constructor(
    private restService: RestService,
    private userService: UserService,
    private positionService: PositionService
  ) {}

  listaCargos: any[] = [];

  @ViewChild('crearUsuarioForm', { static: false }) crearUsuarioForm!: NgForm;

  usuario = new User();

  getListCargos() {
    this.restService.getCargos().subscribe((info: any) => {
      this.listaCargos = info;
    });
  }

  crearUsuario() {
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
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el usuario',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
          console.log('error: ' + error);
        }
      }
    );
  }
}

