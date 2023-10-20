import { Component, OnInit } from '@angular/core';
import { Remito } from '../../models/remito';
import { RemitoServService } from '../../services/remito.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fn-lista-remitos',
  templateUrl: './lista-remitos.component.html',
  styleUrls: ['./lista-remitos.component.css']
})
export class ListaRemitosComponent implements OnInit{


  remitos:Remito[]=[
    //ejemplos de prueba
    {
      idRemito:20,
      nroRemito: 1,
      nroOrdenCompra: '12',
      proveedor: 'Proveedor Pepe',
      fecha: new Date('2023-10-18')
    },
    {
      idRemito:21,
      nroRemito: 2,
      nroOrdenCompra: '143',
      proveedor: 'Proveedor Raquel',
      fecha: new Date('2023-06-24')
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

  filtrar() { //gracias GPT por aclararme muchas cosas sobre formato fechas y stings ...
    const normalizedFechaInicio = new Date(this.fechaInicio);
    const normalizedFechaFin = new Date(this.fechaFin);

    this.remitosFiltrados = this.remitos.filter(remito => {
        const fechaRemito = remito.fecha;
        
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


  // filtrar() {
  //   console.log("Fecha inicio:", this.fechaInicio);
  //   console.log("Fecha fin:", this.fechaFin);
  //   this.remitosFiltrados = this.remitos.filter(remito => {
  //     let fechaRemito = new Date(remito.fecha);
  //     return fechaRemito >= this.fechaInicio && fechaRemito <= this.fechaFin;
  //   });
  // }


}
