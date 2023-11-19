import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Presupuesto } from '../../models/Presupuesto';
import { PresupuestoService } from '../../services/presupuesto.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { PresupuestoFiltro } from '../../models/PresupuestoFiltro';


@Component({
  selector: 'fn-consultar-presupuesto',
  templateUrl: './consultar-presupuesto.component.html',
  styleUrls: ['./consultar-presupuesto.component.css'],
})
export class ConsultarPresupuestoComponent implements OnInit,OnDestroy {
  @ViewChild('presupuestosDOM') presupuestosDOM!: ElementRef;
  @ViewChild('detallePresupuestosDOM') detallePresupuestosDOM!: ElementRef;
  subscriptions: Subscription | undefined;
  
  presupuestos: any = []; // Lista obtenida
  presupuestoFilter: PresupuestoFiltro = {} as PresupuestoFiltro; // Filtro
  presupuesto: Presupuesto; // Objeto a mandar al modificar o generar venta
  mostrarTabla = false;            // De presupuestos
  mostrarDetalle: boolean = false; 
  
  constructor(private router: Router, private service : PresupuestoService) {
    this.presupuesto = {} as Presupuesto;
  }
  ngOnInit() {
    this.subscriptions = new Subscription();
  }
  ngOnDestroy(){
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

  limpiarCampos(){
    this.presupuestoFilter = {} as PresupuestoFiltro;
  }

  // Método para mostrar/ocultar la tabla
  toggleTabla(val:boolean) {
    this.mostrarTabla = val;
  }
  // FILTRAR VENTAS POR GET
  filtrarPresupuestos() {
    let params = new HttpParams()
    if(this.presupuestoFilter?.id){
      params = params.set('id', this.presupuestoFilter.id);
    }
    if (this.presupuestoFilter?.doc_cliente) {
      params = params.set('doc_cliente', this.presupuestoFilter.doc_cliente);
    }
    if (this.presupuestoFilter?.tipo_presupuesto) {
      params = params.set('tipo_venta', this.presupuestoFilter.tipo_presupuesto);
    }
    if (this.presupuestoFilter?.monto_desde) {
      params = params.set('monto_desde', this.presupuestoFilter?.monto_desde.toString());
    }
    if (this.presupuestoFilter?.monto_hasta) {
      params = params.set('monto_hasta', this.presupuestoFilter?.monto_hasta.toString());
    }
    if (this.presupuestoFilter?.fecha_desde) {
      params = params.set('fecha_desde', this.presupuestoFilter?.fecha_desde.toISOString());
    }
    if (this.presupuestoFilter?.fecha_hasta) {
      params = params.set('fecha_hasta', this.presupuestoFilter?.fecha_hasta.toISOString());
    }

    this.subscriptions!.add(
      this.service.getPresupuestosFilter(params).subscribe({
        next: (response) => {
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
      })
    );
    // Se desplaza la pantalla hacia abajo para mostrar bien los presupuestos obtenidos
    this.moverPantalla(this.presupuestosDOM.nativeElement);
  }
  moverPantalla(elemento: HTMLElement){
    if(elemento){
      setTimeout(() => {
        elemento.scrollIntoView({
          behavior: 'smooth',
        });
      },100)}
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
        this.subscriptions?.add(
          this.service.deletePresupuesto(id).subscribe((response) => {
            this.filtrarPresupuestos();  
          })
        )
      }
    });
  }
  generarVenta(pres:Presupuesto){
    this.service.guardarPresupuesto(pres);
    this.router.navigate(['sales/alta-presupuesto'], { queryParams: { venta_from_presupuesto: true } });
  }
}
