import { RestService } from './../../services/rest.service';
import { CustomerService } from '../../services/customer.service';
import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { cliente } from '../../models/cliente';

@Component({
  selector: 'fn-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  @ViewChild('crearClienteForm', { static: false }) crearClienteForm!: NgForm;

 
  cliente = new cliente();

  constructor(
    private restService: RestService,
    private customerService: CustomerService
  ) {}

  crearCliente() {
    try {
      this.restService.postCliente(this.cliente).subscribe((response) => {
        console.log('Cliente creado con éxito', response);
        this.crearClienteForm.reset();
        this.customerService.agregarCliente(this.cliente);
      });

      Swal.fire({
        icon: 'success',
        title: 'Cliente creado con exito!',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear el cliente: ' + error,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      console.log('error: ' + error);
    }
  }
}