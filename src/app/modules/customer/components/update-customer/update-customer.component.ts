import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'fn-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  clienteArray: any[] = [];

  numeroDoc: number = 0;

  cliente = {
    id: null,
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

  ngOnInit() {
    this.getListClientes();
  }

  getListClientes() {
    this.restService.getClientes().subscribe((info: any) => {
      this.clienteArray = info;
    });
  }

  buscarClientePorNumeroDocumento() {
    console.log(this.numeroDoc + 'doc');
    console.log(this.clienteArray);

    if (this.numeroDoc !== null && this.numeroDoc !== undefined) {
      const clienteEncontrado = this.clienteArray.find(
        (cliente) => cliente.nro_doc === this.numeroDoc
      );

      if (clienteEncontrado) {
        this.cliente = { ...clienteEncontrado };

        console.log(this.cliente);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Cliente no encontrado',
          text: 'No se encontró un cliente con el número de documento proporcionado.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Número de documento vacío',
        text: 'Por favor, ingrese un número de documento válido para buscar al cliente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
    }
  }

  actualizarCliente() {
    this.restService.actualizarCliente(this.cliente).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Cliente actualizado',
          text: 'Los cambios se guardaron con éxito.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });

        this.customerService.actualizarCliente(this.cliente);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la actualización',
          text: 'Ocurrió un error al actualizar el cliente. Intente nuevamente.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    );
  }
}