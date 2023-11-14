import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente';
import { RestService } from '../../services/rest.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'fn-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
})
export class CrearClienteComponent {
  @ViewChild('crearClienteForm', { static: false }) crearClienteForm!: NgForm;

  cliente = new Cliente();

  constructor(
    private restService: RestService,
    private customerService: CustomerService
  ) {}

  crearCliente() {
    // Marcar todo los controles como "touched"
    Object.keys(this.crearClienteForm.controls).forEach((controlName) => {
      this.crearClienteForm.controls[controlName].markAsTouched();
    });

    this.restService.postCliente(this.cliente).subscribe(
      (response) => {
        console.log('Cliente creado con éxito', response);

        this.crearClienteForm.reset();
        this.customerService.agregarCliente(this.cliente);

        Swal.fire({
          icon: 'success',
          title: 'Cliente creado con exito!',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      },
      (error) => {
        console.log(error);
        if (error.error.message.includes('Ya existe un cliente con el email')) {
          Swal.fire({
            icon: 'error',
            title: 'El Email ingresado ya esta en uso',
            text: 'Por favor, ingrese un email diferente',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
          console.log('error: ' + error);
        } else if (
          error.error.message.includes(
            'Ya existe un cliente con el número de documento'
          )
        ) {
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
