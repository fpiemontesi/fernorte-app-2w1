import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CargoService } from '../../services/cargo.service';
import { RestService } from '../../services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-crear-position',
  templateUrl: './crear-position.component.html',
  styleUrls: ['./crear-position.component.css']
})
export class CrearPositionComponent {
  @ViewChild('crearCargoForm', { static: false }) crearCargoForm!: NgForm;

  cargoBody = {
    descripcion: '',
  };

  constructor(private restService: RestService , private cargoService: CargoService) {}

  crearCargo() {
    this.restService.postCargo(this.cargoBody).subscribe(
      (response) => {
        console.log('Cargo creado con éxito', response);

        // Limpia el input de cargo
        this.cargoBody = {
          descripcion: '',
        };

        this.crearCargoForm.reset();
        this.cargoService.agregarCargo(this.cargoBody)
        // this.userService.agregarCargo(this.cargoBody);

        Swal.fire({
          icon: 'success',
          title: 'Cargo creado con exito!',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el cargo',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
        console.log('error: ' + error);
      }
    );
  }
}
