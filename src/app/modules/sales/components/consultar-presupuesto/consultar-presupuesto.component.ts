import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('presupuestosDOM') presupuestosDOM!: ElementRef;
  @ViewChild('detallePresupuestosDOM') detallePresupuestosDOM!: ElementRef;
  
  presupuesto: Presupuesto;
  mostrarTabla = false;      // Variable que controla la visibilidad de la tabla


  mostrarDetalle: boolean = false;
  mostrarActualizarEstado: boolean =false;
  montoDesde!: number | null;
  montoHasta!: number | null;
  fechaDesde!: Date | null;
  fechaHasta!: Date | null;
  nuevoEstado!: number;
  presupuestos: any = [];
  
  mostrarModificar: boolean = false;

  constructor(private http : HttpClient, private router: Router, private service : PresupuestoService) {
    this.presupuesto = {} as Presupuesto;
  }

  limpiarCampos(){
    this.presupuesto = {} as Presupuesto;
    this.montoDesde = null;
    this.montoHasta = null;
    this.fechaDesde = null;
    this.fechaHasta = null;
  }

  ngOnInit() {
    
  }
  // Método para mostrar/ocultar la tabla
  toggleTabla(val:boolean) {
    this.mostrarTabla = val;
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
    const urlPresupuesto ='http://localhost:8080/presupuesto/'

    // Agrega los parámetros a la URL de manera adecuada
    const urlWithParams = `${urlPresupuesto}?${params.toString()}`;
    console.log(urlWithParams);
    this.http.get(urlWithParams).subscribe({
      next: (response) => {
        console.log('Solicitud GET exitosa. Respuesta:', response);
        this.presupuestos = response;
      },
      error: (error) => {
        console.error('Error al realizar la solicitud GET:', error);
        
        var mensajeAlerta="";
        if(error.status == 404){
          mensajeAlerta = 'No se han encontrado presupuestos con los filtros especificados'; 
        }
        else mensajeAlerta = "Ha ocurrido un problema al buscar los presupuestos. Por favor, contacte con el administrador.";
        Swal.fire({
          icon: 'error',
          title: mensajeAlerta,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar',
        });
      },
    });
    this.moverPantalla(this.presupuestosDOM.nativeElement);
  }
  moverPantalla(elemento: HTMLElement){
    if(elemento){
      setTimeout(() => {
        elemento.scrollIntoView({
          behavior: 'smooth',
        });
      },100)
    }
    
  }
  modificarPresupuesto(presupuesto : Presupuesto){
    this.service.guardarPresupuesto(presupuesto);
    this.router.navigate(['sales/modificar-presupuesto']);
  }

  verDetalle(presupuesto: Presupuesto){
    this.presupuesto = presupuesto;
    this.mostrarDetalle = true;
    this.moverPantalla(this.detallePresupuestosDOM.nativeElement);
  }
  eliminarPresupuesto(id: number){
    Swal.fire({
      title: '¿Está seguro que desea eliminar el presupuesto con ID '+id+'?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#05B001',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
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
