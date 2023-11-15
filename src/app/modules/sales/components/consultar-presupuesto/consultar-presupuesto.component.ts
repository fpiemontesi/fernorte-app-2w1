import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from '../../services/cliente.service';
import { Presupuesto } from '../../models/Presupuesto';
import { PresupuestoService } from '../../services/presupuesto.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'fn-consultar-presupuesto',
  templateUrl: './consultar-presupuesto.component.html',
  styleUrls: ['./consultar-presupuesto.component.css'],
})
export class ConsultarPresupuestoComponent implements OnInit {
  
  mostrarDetalle: boolean = false;
  mostrarActualizarEstado: boolean =false;
  montoDesde!: number;
  montoHasta!: number;
  fechaDesde!: Date;
  fechaHasta!: Date;
  nuevoEstado!: number;
  presupuestos: any = [];
  presupuesto: Presupuesto;
  mostrarModificar: boolean = false;

  constructor(private http : HttpClient, private router: Router, private service : PresupuestoService) {
    this.presupuesto = {} as Presupuesto;
  }

  limpiarCampos(){
    this.presupuesto = {} as Presupuesto;
    this.montoDesde = 0;
    this.montoHasta = 0;
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();
  }

  ngOnInit() {
  }

  // FILTRAR VENTAS POR GET
  filtrarPresupuestos() {
    // Construye los parámetros de la consulta
    let params = new HttpParams()
    if(this.presupuesto.id){
      params = params.set('id', this.presupuesto.id);
    }

    if (this.presupuesto.doc_cliente) {
      params = params.set('doc_cliente', this.presupuesto.doc_cliente);
    }

    if (this.presupuesto.tipo_venta) {
      params = params.set('tipo_ventas', this.presupuesto.tipo_venta);
    }

    if (this.montoDesde) {
      params = params.set('monto_desde', this.montoDesde.toString());
    }

    if (this.montoHasta) {
      params = params.set('monto_hasta', this.montoHasta.toString());
    }

    if (this.fechaDesde) {
      params = params.set('fecha_desde', this.fechaDesde.toISOString());
    }

    if (this.fechaHasta) {
      params = params.set('fecha_hasta', this.fechaHasta.toISOString());
    }

    const url = 'http://localhost:8080/ventas/';
    const urlPresupuesto ='http://localhost:8080/presupuesto'

    // Agrega los parámetros a la URL de manera adecuada
    const urlWithParams = `${urlPresupuesto}?${params.toString()}`;

    this.http.get(urlWithParams).subscribe({
      next: (response) => {
        console.log('Solicitud GET exitosa. Respuesta:', response);
        this.presupuestos = response;
      },
      error: (error) => {
        console.error('Error al realizar la solicitud GET:', error);
        console.log(params.toString());
        Swal.fire({
          icon: 'error',
          title: 'Error al filtrar las ventas',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  modificarPresupuesto(presupuesto : Presupuesto){
    this.service.guardarPresupuesto(presupuesto);
    this.router.navigate(['sales/modificar-presupuesto']);
    console.log(presupuesto);
  }
  // modificarVenta(presupuesto:Presupuesto){
  //   this.service.guardarId(presupuesto);
  //   this.router.navigate(['modificar-venta']);
  //   console.log(presupuesto);
  // }

  verDetalle(presupuesto: Presupuesto){
    this.presupuesto = presupuesto;
    this.mostrarDetalle = true;
  }
  eliminarPresupuesto(id: number){
    Swal.fire({
      title: '¿Está seguro que desea eliminar el presupuesto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deletePresupuesto(id).subscribe((response) => {
          this.filtrarPresupuestos();
      });
    }
    });
    
    
  }

  // ngOnInit() {
  //   //this.clientService.getClientes().subscribe(data => {
  //    // this.clientes = data;
  //   //});
  // }

  // searchPresupuesto() {
  //   if (this.selectedClientId) {
  //     this.presupuestoService.getPresupuestoById(this.selectedClientId).subscribe(
  //       (data) => {
  //         this.presupuesto = data;
  //       },
  //       (error) => {
  //         alert('Error al obtener el presupuesto');
  //       }
  //     );
  //   }
  // }
}
