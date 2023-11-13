import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Cliente } from '../../models/cliente';
import { RestService } from '../../services/rest.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'fn-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {
  @ViewChild('crearClienteForm', { static: false }) crearClienteForm!: NgForm;

  cliente = new Cliente();

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
