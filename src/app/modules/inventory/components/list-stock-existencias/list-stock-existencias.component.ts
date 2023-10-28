import { Component, OnInit } from '@angular/core';
import { ListExistenciasService } from '../../services/list-existencias.service';
import { Lotes } from '../../models/lotes';

@Component({
  selector: 'fn-list-stock-existencias',
  templateUrl: './list-stock-existencias.component.html',
  styleUrls: ['./list-stock-existencias.component.css']
})
export class ListStockExistenciasComponent implements OnInit {


  list!:Lotes[];

  ngOnInit(): void {
    this.llenarList();
  }

  constructor(private listarstockExistencias:ListExistenciasService){}


  public llenarList(){
    this.listarstockExistencias.getExistenciasStockTotal().subscribe(list=>{
      this.list=this.list;
    })
  }


}
