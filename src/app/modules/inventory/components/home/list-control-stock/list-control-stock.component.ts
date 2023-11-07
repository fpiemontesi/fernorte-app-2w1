import { Component, OnInit } from '@angular/core';
import { ListControlStockService } from '../../../services/list-control-stock.service';
import { ControlStock } from '../../../models/controlStock';

@Component({
  selector: 'fn-list-control-stock',
  templateUrl: './list-control-stock.component.html',
  styleUrls: ['./list-control-stock.component.css']
})
export class ListControlStockComponent implements OnInit {

constructor(private lisControlStockservice:ListControlStockService){}

  ngOnInit(): void {
      this.llenarList();
  }

  listaControl:ControlStock[]=[];

  llenarList(){

    this.lisControlStockservice.get().subscribe(lista => this.listaControl = lista);

  
    
  }

}
