import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RestService } from '../../services/rest.service';
import { CustomerService } from '../../services/customer.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'fn-modificar-clientes',
  templateUrl: './modificar-clientes.component.html',
  styleUrls: ['./modificar-clientes.component.css']
})
export class ModificarClientesComponent implements OnInit {
  clienteArray: any[] = [];

  numeroDoc: number = 0;

  cliente = new Cliente();

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
      let clienteEncontrado = this.clienteArray.find(
        (cliente) => cliente.nroDoc === this.numeroDoc
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
    if (this.numeroDoc == 0 || this.numeroDoc < 0) {
      Swal.fire({
        icon: 'error',
        title: 'El numero ingresado no puede ser 0 o negativo',
        text: 'Vuelva a ingresar el documento del cliente.',
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
