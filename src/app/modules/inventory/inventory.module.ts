import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ListStockExistenciasComponent } from './components/list-stock-existencias/list-stock-existencias.component';

@NgModule({
  declarations: [HomeComponent, ListStockExistenciasComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
