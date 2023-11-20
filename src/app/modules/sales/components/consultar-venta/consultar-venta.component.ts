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
  fechaDesde!: Date;
  fechaHasta!: Date;
  nuevoEstado!: number;
  ventas: Ventas[] = [];
  venta: Ventas;
  mostrarModificar: boolean = false;
  clientes: any[] = [];

  constructor(private http : HttpClient, private router: Router, private service : VentasService) {
    this.venta= {} as Ventas;
  }

  limpiarCampos(){
    this.venta = {} as Ventas;
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
    this.subscriptions?.add(
    this.service
      .filtrarVentas(
        this.venta,
        this.montoDesde,
        this.montoHasta,
        this.fechaDesde,
        this.fechaHasta
      )
      .subscribe({
        next: (response) => {
          console.log('Solicitud GET exitosa. Respuesta:', response);
          this.ventas = response;
          this.mostrarTabla = true; 
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
}
