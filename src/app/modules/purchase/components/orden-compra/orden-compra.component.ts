import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'fn-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent {

  @Output() newOrdenCompra = new EventEmitter();
  
  ngOnInit(): void{

  }

  

}
