import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ListControlStockComponent } from './components/home/list-control-stock/list-control-stock.component';

@NgModule({
  declarations: [HomeComponent, ListControlStockComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
