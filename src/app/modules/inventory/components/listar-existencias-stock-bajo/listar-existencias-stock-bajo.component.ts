import { Component } from '@angular/core';
import { ExistenciaStock } from '../../models/existencia-stock';
import { Subscription } from 'rxjs';
import { ExistenciaStockService } from '../../services/existencia-stock.service';

@Component({
  selector: 'fn-listar-existencias-stock-bajo',
  templateUrl: './listar-existencias-stock-bajo.component.html',
  styleUrls: ['./listar-existencias-stock-bajo.component.css']
})
export class ListarExistenciasStockBajoComponent {

  listaExistenciasStockBajo: ExistenciaStock[] = [];  
  private subscription = new Subscription();

  constructor(private existenciaStock: ExistenciaStockService) { }

  ngOnInit(): void {
    this.cargarExistencias();
  }

  private cargarExistencias() {
    this.subscription.add(
      this.existenciaStock.get().subscribe({
        next: (existenciaStock: ExistenciaStock[]) => {
          this.listaExistenciasStockBajo = existenciaStock;
        },
        error: () => {
          console.error();  
        }
      })
    )
  }
}
