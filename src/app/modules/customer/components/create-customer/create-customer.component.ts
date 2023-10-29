import { RestService } from './../../services/rest.service';
import { CustomerService } from '../../services/customer.service';
import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'fn-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent {
  @ViewChild('crearClienteForm', { static: false }) crearClienteForm!: NgForm;

  cliente = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    id_tipo_doc: {
      id_tipo_doc: null,
      tipo_documento: '',
    },
    nro_doc: null,
    id_categoria_fiscal: {
      id_categoria: null,
      descripcion: '',
    },
    id_tipo_cliente: {
      id_tipo_cliente: null,
      tipo_cliente: '',
    },
    id_clasificacion: {
      id_clasificacion: null,
      descripcion: '',
    },
    cant_puntos: 0,
  };

  constructor(
    private restService: RestService,
    private customerService: CustomerService
  ) {}

  crearCliente() {
    try {
      this.restService.postCliente(this.cliente).subscribe((response) => {
        console.log('Cliente creado con éxito', response);

        // Limpia el formulario
        this.cliente = {
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          id_tipo_doc: {
            id_tipo_doc: null,
            tipo_documento: '',
          },
          nro_doc: null,
          id_categoria_fiscal: {
            id_categoria: null,
            descripcion: '',
          },
          id_tipo_cliente: {
            id_tipo_cliente: null,
            tipo_cliente: '',
          },
          id_clasificacion: {
            id_clasificacion: null,
            descripcion: '',
          },
          cant_puntos: 0,
        };

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