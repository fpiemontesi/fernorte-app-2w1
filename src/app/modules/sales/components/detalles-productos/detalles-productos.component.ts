import { Component, Input, OnInit } from '@angular/core';
import { Detalles } from '../../models/Detalles';


@Component({
  selector: 'app-detalles-productos',
  templateUrl: './detalles-productos.component.html',
  styleUrls: ['./detalles-productos.component.css']
})
export class DetallesProductosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() productos: Detalles[] = [];
}
