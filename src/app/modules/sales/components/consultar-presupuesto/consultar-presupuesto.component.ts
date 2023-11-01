import { Presupuesto } from './../../models/Presupuesto';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/Cliente';
import { PresupuestoService } from '../../services/presupuesto.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'fn-consultar-presupuesto',
  templateUrl: './consultar-presupuesto.component.html',
  styleUrls: ['./consultar-presupuesto.component.css'],
})
export class ConsultarPresupuestoComponent implements OnInit {
  clientes: Cliente[] = [];
  http: any;

  constructor(
    private clientService: ClienteService,
    private presupuestoService: PresupuestoService
  ) {}

  ngOnInit() {
    this.clientService.getClientes().subscribe(data => {
     this.clientes = data;
    });
  }

  mostrarDetalles: boolean = false;
  presupuesto!: Presupuesto;
  presupuestos: any[] = [];
  mostrarModificar: boolean = false;

    
  limpiarCampos(){
    this.presupuesto = {} as Presupuesto;
  }
  
  // FILTRAR PRESUPUESTOS POR GET
  filtrarPresupuestos() {
   
    // Construye los parámetros de la consulta
    let params = new HttpParams()
    if(this.presupuesto.id){
      params = params.set('id', this.presupuesto?.id.toString());
    }
  
    if (this.presupuesto.cliente.id) {
      params = params.set('id_cliente', this.presupuesto.cliente.id.toString());
    }
  
    if (this.presupuesto.fechaDesde) {
      params = params.set('fecha_desde', this.presupuesto.fechaDesde.toISOString());
    }
  
    if (this.presupuesto.fechaHasta) {
      params = params.set('fecha_hasta', this.presupuesto.fechaHasta.toISOString());
    }
      
    const url = 'http://localhost:8080/presupuetos/';
  
    // Agrega los parámetros a la URL de manera adecuada
    const urlWithParams = `${url}?${params.toString()}`;
  
    this.http.get(urlWithParams).subscribe({
     next: (response: any[]) => {
       console.log('Solicitud GET exitosa. Respuesta:', response);
       this.presupuestos = response;
     },
     error: (error: any) => {
       console.error('Error al realizar la solicitud GET:', error);
       console.log(params.toString());
       Swal.fire({
         icon: 'error',
         title: 'Error al filtrar los presupuestos',
         showCancelButton: false,
         showConfirmButton: true,
         confirmButtonText: 'Aceptar',
       });
     },
    });
  }
  
  verDetalle(presupuesto: Presupuesto){
    this.presupuesto = presupuesto;
    this.mostrarDetalles = true;
  }
}
