import { Component, OnInit } from '@angular/core';

import { ExistenceStock } from '../../models/ExistenceStock';
import { ListExistenciasService } from '../../services/list-existencias.service';


@Component({
  selector: 'fn-list-stock-existencias',
  templateUrl: './list-stock-existencias.component.html',
  styleUrls: ['./list-stock-existencias.component.css']
})
export class ListStockExistenciasComponent implements OnInit {

  constructor(private listarstockExistencias:ListExistenciasService){}

  list : ExistenceStock[]=[];

  ngOnInit(): void {
    this.llenarList();
  }


   llenarList(){
    this.listarstockExistencias.getExistenciasStockTotal().subscribe(list=>{
      this.list=list;
    })
  }



}
