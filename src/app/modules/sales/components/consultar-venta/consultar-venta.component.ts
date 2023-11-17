import { Component } from '@angular/core';
import { Ventas } from '../../models/Ventas';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { VentasService } from '../../services/ventas.service';

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
    this.service.getClientes().subscribe((data: any) => {
      this.clientes = data;
    });
  }
  actualizarEstado(venta:any){
    this.service.actualizarEstado(venta.id, venta.estado).subscribe(response => {
      console.log("Solicitud de modificación de Estado exitosa. Respuesta:" + venta.estado);
    });
  }
  
  // FILTRAR VENTAS POR GET
  filtrarVentas() {
    // Construye los parámetros de la consulta
    let params = new HttpParams()
    if(this.venta.id){
      params = params.set('id', this.venta.id);
    }

    if (this.venta.doc_cliente) {
      params = params.set('doc_cliente', this.venta.doc_cliente);
    }

    if (this.venta.id_vendedor) {
      params = params.set('id_vendedor', this.venta.id_vendedor);
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

    this.http.get<Ventas[]>(urlWithParams).subscribe({
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
  
  verDetalle(venta: Ventas){
    this.venta = venta;
    this.mostrarDetalle = true;
  }
}
