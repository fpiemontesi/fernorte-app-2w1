import { Component } from '@angular/core';
import { Ventas } from '../../models/Ventas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'fn-consultar-venta',
  templateUrl: './consultar-venta.component.html',
  styleUrls: ['./consultar-venta.component.css']
})
export class ConsultarVentaComponent {
  mostrarDetalle: boolean = false;
  montoDesde!: number;
  montoHasta!: number;
  fechaDesde!: Date;
  fechaHasta!: Date;

  ventas: any = [];
  venta: Ventas;

  constructor(private http : HttpClient) {
    this.venta= {} as Ventas;
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
  
  filtrarVentas(){
      
      const url = 'http://localhost:8080/ventas/get'; 
      const body = {
        id:this.venta.id,
        id_cliente: this.venta.id_cliente,
        id_vendedor: this.venta.id_vendedor,
        tipo_venta: this.venta.tipo_venta,
        forma_entrega: this.venta.forma_entrega,
        monto_desde: this.montoDesde,
        monto_hasta: this.montoHasta,
        fecha_desde: this.fechaDesde,
        fecha_hasta: this.fechaHasta,
        estado: this.venta.estado
      };
      console.log(body);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
  
      this.http.post(url, body, httpOptions).subscribe({
      next: (response) => {
        console.log('Solicitud POST exitosa. Respuesta:', response);

         this.ventas = response;
      

      },
      error: (error) => {
        console.error('Error al realizar la solicitud POST:', error);
        Swal.fire({
          icon: 'error', // Puedes cambiar el icono a tu elección
          title: 'Error al filtrar las ventas',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
  

  verDetalle(venta: Ventas){
    this.venta = venta;
    this.mostrarDetalle = true;
  }

}
