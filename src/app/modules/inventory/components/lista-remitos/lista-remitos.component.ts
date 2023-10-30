import { Component, OnInit } from '@angular/core';
import { Remito } from '../../models/remito';
import { RemitoServService } from '../../services/remito.service';
import { Subscription } from 'rxjs';
import { DetalleRemito } from '../../models/detalle-remito';

@Component({
  selector: 'fn-lista-remitos',
  templateUrl: './lista-remitos.component.html',
  styleUrls: ['./lista-remitos.component.css']
})
export class ListaRemitosComponent implements OnInit{


  remitos:Remito[]=[
    //ejemplos de prueba
    {
      id:20,
      nroRemito: 1,
      nroOrdenCompra: 12,
      nombreProveedor: 'Proveedor Pepe',
      fechaLlegada: new Date('2023-10-18'),
      detalles: []
    },
    {
      id:21,
      nroRemito: 2,
      nroOrdenCompra: 143,
      nombreProveedor: 'Proveedor Raquel',
      fechaLlegada: new Date('2023-06-24'),
      detalles: []
    },
  ]

  fechaInicio: Date;
  fechaFin: Date;
  remitosFiltrados: Remito[] = [];
  private suscripcion = new Subscription();


  constructor(private serviceRemito: RemitoServService ){
    this.fechaFin= new Date();
    this.fechaInicio= new Date();
  }
  
  ngOnInit(): void {
    this.cargarLista();
    this.remitosFiltrados=this.remitos;
  }

  onModificar(id:number){}

  filtrar() { //gracias GPT por aclararme muchas cosas sobre formato fechas y stings .
    if (!this.fechaInicio && !this.fechaFin) {
      this.remitosFiltrados = this.remitos;
      return;
    }
    const normalizedFechaInicio = new Date(this.fechaInicio);
    const normalizedFechaFin = new Date(this.fechaFin);

    this.remitosFiltrados = this.remitos.filter(remito => {
        const fechaRemito = remito.fechaLlegada;
        
        return fechaRemito >= normalizedFechaInicio && fechaRemito <= normalizedFechaFin;
    });
  }

  private cargarLista(){
    this.suscripcion.add(
      this.serviceRemito.getRemitos().subscribe({
        next: (remitosResp : Remito[])=>{
          this.remitos=remitosResp;
        }
      })
    )
  }

}
