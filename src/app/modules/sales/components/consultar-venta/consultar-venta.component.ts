import { Component } from '@angular/core';
import { Ventas } from '../../models/Ventas';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'fn-consultar-venta',
  templateUrl: './consultar-venta.component.html',
  styleUrls: ['./consultar-venta.component.css']
})
export class ConsultarVentaComponent {
  mostrarDetalle: boolean = false;
  montoDesde!: number;
  montoHasta!: number;
  fechaDesde: Date=new Date();
  fechaHasta: Date=new Date();

  ventas: Ventas[] = [];
  venta: Ventas;

  constructor(private ventasService: VentasService){ 
    this.venta= {} as Ventas;
  }

  ngOnInit() {

  }

  filtrarVentas() {
    this.ventasService.getVentas().subscribe({
      next: (ventas) => {
        this.ventas = ventas.filter((venta) =>
          (!this.venta.id || venta.id.toString().includes(this.venta.id.toString())) &&
          (!this.venta.cliente || venta.cliente.toLowerCase().includes(this.venta.cliente.toLowerCase())) &&
          (!this.venta.vendedor || venta.vendedor.toLowerCase().includes(this.venta.vendedor.toLowerCase())) &&
          (!this.venta.formaEntrega || venta.formaEntrega.toLowerCase().includes(this.venta.formaEntrega.toLowerCase())) &&
          (!this.venta.tipoPedido || venta.tipoPedido.toLowerCase().includes(this.venta.tipoPedido.toLowerCase())) &&
          (!this.venta.estado || venta.estado.toLowerCase().includes(this.venta.estado.toLowerCase())) &&
          (!this.montoDesde || venta.monto >= this.montoDesde) &&
          (!this.montoHasta || venta.monto <= this.montoHasta) &&
          (!this.fechaDesde || venta.fecha >= this.fechaDesde) &&
          (!this.fechaHasta || venta.fecha <= this.fechaHasta)
         );
      },
      error: (error) => {
        console.error("Error al conectar con la API", error);
      }
    });
  } 
  

  verDetalle(venta: Ventas){
    this.venta = venta;
    this.mostrarDetalle = true;
  }

}
