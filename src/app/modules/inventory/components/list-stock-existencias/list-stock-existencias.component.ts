import { Component, OnInit } from '@angular/core';
import { ListExistenciasService } from '../../services/list-existencias.service';
import { ExistenciaStock } from '../../models/existenciaStock';


@Component({
  selector: 'fn-list-stock-existencias',
  templateUrl: './list-stock-existencias.component.html',
  styleUrls: ['./list-stock-existencias.component.css']
})
export class ListStockExistenciasComponent implements OnInit {

  constructor(private listarstockExistencias:ListExistenciasService){}
  
  list : ExistenciaStock[]=[];

  ngOnInit(): void {
    this.llenarList();
  }

  
   llenarList(){
    this.listarstockExistencias.getExistenciasStockTotal().subscribe(list=>{
      this.list=list;
    })
  }
  


}
