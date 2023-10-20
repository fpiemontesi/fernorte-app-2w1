import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ListarExistenciasComponent } from './components/listar-existencias/listar-existencias.component';

@NgModule({
  declarations: [HomeComponent, ListarExistenciasComponent],
  providers: [],
  imports: [CommonModule],
  exports: [HomeComponent],
})
export class InventaryModule {}
