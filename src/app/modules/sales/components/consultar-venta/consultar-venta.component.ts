import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ventas } from '../../models/Ventas';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VentasService } from '../../services/ventas.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-consultar-venta',
  templateUrl: './consultar-venta.component.html',
  styleUrls: ['./consultar-venta.component.css']
})
export class ConsultarVentaComponent {
  @ViewChild('detallePresupuestosDOM') detallePresupuestosDOM!: ElementRef;
  subscriptions: Subscription | undefined;
  mostrarTabla : boolean = false;
  mostrarDetalle: boolean = false;
  mostrarActualizarEstado: boolean =false;
  montoDesde!: number;
  montoHasta!: number;
  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;
  nuevoEstado!: number;
  ventas: Ventas[] = [];
  ventaFilter:Ventas;
  venta: Ventas;
  //Ventas:
  mostrarCanceladas:boolean = false
  // Boton:
  mostrarModificar: boolean = false;
  clientes: any[] = [];

  constructor(private service : VentasService) {
    this.venta= {} as Ventas;
    this.ventaFilter = {} as Ventas;
  }

  limpiarCampos(){
    this.venta = {} as Ventas;
    this.ventaFilter = {} as Ventas;
    this.mostrarTabla = false;
    this.mostrarDetalle = false;
    this.fechaDesde = null
    this.fechaHasta = null
  }
  ngOnInit() {
    this.subscriptions = new Subscription();
    this.GetClientes();
  }
  ngOnDestroy(){
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }
  GetClientes(){
    this.subscriptions!.add( 
      this.service.getClientes().subscribe((data: any) => {
      this.clientes = data;
    }));
  }

  
  actualizarEstado(venta:any){
    this.subscriptions!.add( 
    this.service.actualizarEstado(venta.id, venta.estado).subscribe(response => {
      console.log("Solicitud de modificación de Estado exitosa. Respuesta:" + venta.estado);
    }));
  }
  
  moverPantalla(elemento: HTMLElement){
    if(elemento){
      setTimeout(() => {
        elemento.scrollIntoView({
          behavior: 'smooth',
        });
      },100)}
  }
 
  filtrarVentas() {
    let fecDesde:string = ""
    let fecHasta:string = ""
    if(this.fechaDesde && this.fechaHasta){
      fecDesde = new Date(this.fechaDesde).toISOString()
      fecHasta = new Date(this.fechaHasta).toISOString()
    }
    
    console.log();
    this.ventas = [];
    this.subscriptions?.add( 
      this.service
      .filtrarVentas(
        this.ventaFilter,
        this.montoDesde,
        this.montoHasta,
        fecDesde,
        fecHasta
        
      )
      .subscribe({
        next: (response) => { 
          if(response.length == 0){
            this.mostrarTabla = false; 
            Swal.fire({
              icon: 'error',
              title: 'No se encuentran Ventas con los filtros especificados',
              showCancelButton: false,
              showConfirmButton: true,
              confirmButtonText: 'Aceptar',
            });
          }
          
          
          response.forEach(element => {
            if(element.estado != 3){
              this.ventas.push(element);
            }
          }); 
          this.mostrarTabla = true; 
          
          console.log("CANTIDAD DE VENTAS:"+this.ventas.length);
        },
        error: (error) => {
          console.error('Error al realizar la solicitud GET:', error);
          this.mostrarTabla = false; 
          Swal.fire({
            icon: 'error',
            title: 'No se encuentran Ventas con los filtros especificados',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          });
        },
      }));
  }
  
  verDetalle(venta: Ventas){
    this.venta = venta;
    this.mostrarDetalle = true;
    this.moverPantalla(this.detallePresupuestosDOM.nativeElement)
  }
  toggleTabla(val:boolean) {
    this.mostrarTabla = val;
  }

  bajaVenta(venta:Ventas){
    this.subscriptions?.add(
      this.service.bajaVenta(venta.id).subscribe({
        next: (response) => {
          console.log("Solicitud de baja de venta exitosa. Respuesta:" + response);
          Swal.fire({
            icon: 'success',
            title: 'Se ha dado de baja a la venta con ID '+venta.id,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          })
        },
        error: (error) => {
          console.error('Error al realizar la solicitud GET:', error);
          Swal.fire({
            icon: 'error',
            title: 'No se puede dar de baja la venta',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
          });
        },
      })
    )
    setTimeout(() => {
      this.filtrarVentas();
    },300)
    
    
  }
}
