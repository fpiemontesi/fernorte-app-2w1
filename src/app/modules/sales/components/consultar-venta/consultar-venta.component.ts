import { Component } from '@angular/core';
import { Ventas } from '../../models/Ventas';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'fn-consultar-venta',
  templateUrl: './consultar-venta.component.html',
  styleUrls: ['./consultar-venta.component.css']
})
export class ConsultarVentaComponent {
  mostrarDetalle: boolean = false;
  mostrarActualizarEstado: boolean =false;
  montoDesde!: number;
  montoHasta!: number;
  fechaDesde!: Date;
  fechaHasta!: Date;
  nuevoEstado!: number;
  ventas: any = [];
  venta: Ventas;
  mostrarModificar: boolean = false;

  constructor(private http : HttpClient, private router: Router) {
    this.venta= {} as Ventas;
  } 
    
  limpiarCampos(){
    this.venta = {} as Ventas;
  }
  ngOnInit() {
  }
  // filtrarVentas() {
  //   this.ventasService.getVentas().subscribe({
  //     next: (ventas) => {
  //       this.ventas = ventas.filter((venta) =>
  //         (!this.venta.id || venta.id.toString().includes(this.venta.id.toString())) &&
  //         (!this.venta.cliente || venta.cliente.toLowerCase().includes(this.venta.cliente.toLowerCase())) &&
  //         (!this.venta.vendedor || venta.vendedor.toLowerCase().includes(this.venta.vendedor.toLowerCase())) &&
  //         (!this.venta.formaEntrega || venta.formaEntrega.toLowerCase().includes(this.venta.formaEntrega.toLowerCase())) &&
  //         (!this.venta.tipoPedido || venta.tipoPedido.toLowerCase().includes(this.venta.tipoPedido.toLowerCase())) &&
  //         (!this.venta.estado || venta.estado.toLowerCase().includes(this.venta.estado.toLowerCase())) &&
  //         (!this.montoDesde || venta.monto >= this.montoDesde) &&
  //         (!this.montoHasta || venta.monto <= this.montoHasta) &&
  //         (!this.fechaDesde || venta.fecha >= this.fechaDesde) &&
  //         (!this.fechaHasta || venta.fecha <= this.fechaHasta)
  //        );
  //     },
  //     error: (error) => {
  //       console.error("Error al conectar con la API", error);
  //     }
  //   });
  // } 
  // .set('id', this.venta.id ? this.venta.id.toString() : '')
      // .set('id_cliente', this.venta.id_cliente ? this.venta.id_cliente.toString() : '')
      // .set('id_vendedor', this.venta.id_vendedor ? this.venta.id_vendedor.toString() : '')
      // .set('tipo_venta', this.venta.tipo_venta || '')
      // .set('forma_entrega', this.venta.forma_entrega || '')
      // .set('monto_desde', this.montoDesde ? this.montoDesde.toString() : '')
      // .set('monto_hasta', this.montoHasta ? this.montoHasta.toString() : '')
      // .set('fecha_desde', this.fechaDesde ? this.fechaDesde.toISOString() : '')
      // .set('fecha_hasta', this.fechaHasta ? this.fechaHasta.toISOString() : '')
      // .set('estado', this.venta.estado || '');
  
  // FILTRAR VENTAS POR GET
  filtrarVentas() {
   
    // Construye los parámetros de la consulta
    let params = new HttpParams()
    if(this.venta.id){
      params = params.set('id', this.venta.id.toString());
    }
  
    if (this.venta.id_cliente) {
      params = params.set('id_cliente', this.venta.id_cliente.toString());
    }
  
    if (this.venta.id_vendedor) {
      params = params.set('id_vendedor', this.venta.id_vendedor.toString());
    }
  
    if (this.venta.tipo_venta) {
      params = params.set('tipo_venta', this.venta.tipo_venta);
    }
  
    if (this.venta.forma_entrega) {
      params = params.set('forma_entrega', this.venta.forma_entrega);
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
  
    if (this.venta.estado) {
      params = params.set('estado', this.venta.estado);
    }
      
    const url = 'http://localhost:8080/ventas/';
  
    // Agrega los parámetros a la URL de manera adecuada
    const urlWithParams = `${url}?${params.toString()}`;
  
    this.http.get(urlWithParams).subscribe({
      next: (response) => {
        console.log('Solicitud GET exitosa. Respuesta:', response);
        this.ventas = response;
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
  
  
  actualizarEstado(){
    
  }
  modificarVenta(id:number){
    this.router.navigate(['modificar-venta']);
    console.log("id de la venta");
  }
  
  verDetalle(venta: Ventas){
    this.venta = venta;
    this.mostrarDetalle = true;
  }
}
